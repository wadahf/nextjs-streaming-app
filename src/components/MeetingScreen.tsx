"use client";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import EndedMeetingScreen from "./EndedMeetingScreen";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";
import { useState } from "react";
import useStreamCall from "@/hooks/useStreamCall";
import SetupUI from "./SetupUI";
import CallUI from "./CallUI";

const MeetingScreen = () => {
  const call = useStreamCall();
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const isCallNotStartedYet =
    callStartsAt && new Date(callStartsAt) > new Date();
  const isCallHasEnded = !!callEndedAt;

  const meetingDescription = call.state.custom.description;

  const handleSetupComplete = () => {
    call.join();
    setIsSetupComplete(true);
  };

  if (isCallHasEnded) {
    return <EndedMeetingScreen />;
  }

  if (isCallNotStartedYet) {
    return <UpcomingMeetingScreen />;
  }

  return (
    <div className="space-y-6">
      {meetingDescription && (
        <p className="text-center">
          Meeting description:{" "}
          <span className="font-bold">{meetingDescription}</span>
        </p>
      )}
      {isSetupComplete ? (
        <CallUI />
      ) : (
        <SetupUI onSetupComplete={handleSetupComplete} />
      )}
    </div>
  );
};

export default MeetingScreen;
