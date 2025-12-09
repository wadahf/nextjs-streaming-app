"use client";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import { getUsersByIds } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DescriptionInput,
  StartTimeInput,
  MeetingLink,
  Participants,
} from "@/components";
// import { useToast } from "@/hooks/use-toast";

const page = () => {
  /* to be removed start */
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [call, setCall] = useState<Call>();

  if (!user || !client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  const handleCreateMeeting = async () => {
    try {
      const id = crypto.randomUUID();

      const callType = participants ? "private-meeting" : "default";
      const call = client.call(callType, id);

      const memberEmails = participants
        ?.split(",")
        .map((email) => email.trim());
      const memberIds = await getUsersByIds(memberEmails);

      const members: MemberRequest[] = memberIds
        .map((id) => ({
          user_id: id,
          role: "call_member",
        }))
        .concat({ user_id: user.id, role: "call_member" })
        .filter(
          (value, index, arr) =>
            arr.findIndex((value2) => value2.user_id === value.user_id) ===
            index,
        );

      const startAt = new Date(startTime || Date.now()).toISOString();

      await call.getOrCreate({
        data: {
          members,
          starts_at: startAt,
          custom: { description },
        },
      });

      setCall(call);
    } catch (error) {
      console.log("error: :", error);
      alert("Something went wrong");
    }
  };

  /* to be removed end */

  const router = useRouter();
  //   const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // toast({
    //   title: "Meeting Created!",
    //   description: "Your meeting has been scheduled successfully.",
    // });

    setTimeout(() => {
      router.push("/meetings");
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* <Navigation /> */}

      <main className="container px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* <div className="mx-auto"> */}
          <div className="mb-8">
            <h1 className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
              Create New Meeting
            </h1>
            <p className="text-muted-foreground">
              Schedule a video meeting with your team
            </p>
          </div>

          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>
                Fill in the information below to create your meeting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <DescriptionInput
                  value={description}
                  onChange={setDescription}
                />
                <StartTimeInput value={startTime} onChange={setStartTime} />
                <Participants value={participants} onChange={setParticipants} />
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleCreateMeeting}
                >
                  Create Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {call && (
          <Card className="mx-auto mt-6 max-w-fit border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <LinkIcon className="h-5 w-5 text-accent" />
                </div>

                <div>
                  <h3 className="mb-1 font-semibold">Invitation link</h3>
                  <MeetingLink call={call} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default page;
