"use client";
import useStreamCall from "@/hooks/useStreamCall";
import {
  DeviceSettings,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import PermissionPrompt from "./PermissionPrompt";
import { useEffect, useState } from "react";
import Button from "./Button";
import AudioVolumeIndicator from "./AudioVolumeIndicator";

interface SetupUIProps {
  onSetupComplete: () => void;
}

const SetupUI = ({ onSetupComplete }: SetupUIProps) => {
  const call = useStreamCall();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [isMicAndCamDisabled, setIsMicAndCamDisabled] = useState(false);

  useEffect(() => {
    if (isMicAndCamDisabled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicAndCamDisabled, call.camera, call.microphone]);

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center text-2xl font-bold">Setup</div>
      <VideoPreview />
      <div className="flex h-1/6 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={isMicAndCamDisabled}
          onChange={(e) => setIsMicAndCamDisabled(e.target.checked)}
        />
        Join with mic and camera off
      </label>
      <Button onClick={onSetupComplete}>Join Meeting</Button>
    </div>
  );
};

export default SetupUI;
