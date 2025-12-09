"use client";
import { getUsersByIds } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import {
  DescriptionInput,
  StartTimeInput,
  Participants,
  MeetingLink,
  Button,
} from "./";

export default function CreateMeetingPage() {
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
    // if(!client || !user) return;

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

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user?.username}
      </h1>
      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-xl font-bold">Create new meeting</h2>
        <DescriptionInput value={description} onChange={setDescription} />
        <StartTimeInput value={startTime} onChange={setStartTime} />
        <Participants value={participants} onChange={setParticipants} />
        <Button type="button" className="w-full" onClick={handleCreateMeeting}>
          Create Meeting
        </Button>
      </div>
      {call && <MeetingLink call={call} />}
    </div>
  );
}
