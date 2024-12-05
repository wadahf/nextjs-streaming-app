"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";

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

  const createMeeting = async () => {
    // if(!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          custom: { description },
        },
      });

      setCall(call);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="itemscen flex flex-col space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user?.username}
      </h1>
      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-xl font-bold">Create new meeting</h2>
        <DescriptionInput value={description} onChange={setDescription} />
        <StartTimeInput value={startTime} onChange={setStartTime} />
        <Participants value={participants} onChange={setParticipants} />
        <button type="button" className="w-full" onClick={createMeeting}>
          Create Meeting
        </button>
        {call && <MeetingLink call={call} />}
      </div>
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

  return <div className="text-center">{meetingLink}</div>;
};
