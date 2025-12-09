"use client";
import useLocalCall from "@/hooks/useLocalCall";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import MeetingScreen from "./MeetingScreen";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const { call, isCallLoading } = useLocalCall(id);

  const { user, isLoaded: isUserLoaded } = useUser();

  if (!isUserLoaded || isCallLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">call not found</p>;
  }

  const notAllowedToJoinCall =
    call.type === "private-meeting" &&
    (!user || call.state.members.find((member) => member.user.id !== user.id));

  if (notAllowedToJoinCall) {
    return (
      <p className="text-center font-bold">
        You are not invited to this meeting
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-6">
      <StreamCall call={call}>
        <StreamTheme>
          <MeetingScreen />
        </StreamTheme>
      </StreamCall>
    </div>
  );
}
