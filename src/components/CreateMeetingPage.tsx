"use client";
import { getUsersByIds } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Copy, CopyCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { getMailToLink } from "@/utils/helpers";

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

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting info:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>
      {isChecked && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
};

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StartTimeInput = ({ value, onChange }: StartTimeInputProps) => {
  const [isActive, setIsActive] = useState(false);
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Start:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!isActive}
          onChange={() => {
            setIsActive(false);
            onChange("");
          }}
        />
        Start Meeting Now
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={isActive}
          onChange={() => {
            setIsActive(true);
            onChange(dateTimeLocalNow);
          }}
        />
        Start Meeting At Specific Time:
      </label>
      {isActive && (
        <label className="block space-y-1">
          <span className="font-medium">Start Time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={dateTimeLocalNow}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
};

interface ParticipantsProps {
  value: string;
  onChange: (value: string) => void;
}

const Participants = ({ value, onChange }: ParticipantsProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!isActive}
          onChange={() => {
            setIsActive(false);
            onChange("");
          }}
        />
        Everyone With Link Can Join
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={isActive}
          onChange={() => setIsActive(true)}
        />
        Private Meeting
      </label>
      {isActive && (
        <label className="block space-y-1">
          <span className="font-medium">Participant Emails</span>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter participant emails seperated by commas"
          />
        </label>
      )}
    </div>
  );
};

interface MeetingLinkProps {
  call: Call;
}

const MeetingLink = ({ call }: MeetingLinkProps) => {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  const [buttonIcon, setButtonIcon] = useState<JSX.Element>(<Copy />);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setButtonIcon(<CopyCheck className="text-green-700 transition-colors" />);
    setTimeout(() => {
      setButtonIcon(<Copy />);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          Invitation link:{" "}
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
        </span>

        <button type="button" onClick={handleCopy} title="Copy invitaion link">
          {buttonIcon}
        </button>
      </div>
      <a
        href={getMailToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description,
        )}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send email invitaion
      </a>
    </div>
  );
};
