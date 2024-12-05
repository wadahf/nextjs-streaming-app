"use client";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  if (!client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  const handleJoinMeeting = async () => {
    const call = client.call("default", id);
    await call.join();
    setCall(call);
  };

  if (!call) {
    return <button onClick={handleJoinMeeting}>Join Meeting</button>;
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <SpeakerLayout />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  );
}
