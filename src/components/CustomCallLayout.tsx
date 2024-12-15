import useStreamCall from "@/hooks/useStreamCall";
import { useState } from "react";
import CallLayoutView from "./CallLayoutView";
import CallLayoutButtons from "./CallLayoutButtons";
import { CallControls } from "@stream-io/video-react-sdk";
import EndCallButton from "./EndCallButton";
import { useRouter } from "next/navigation";

const CustomCallLayout = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-vertcal");
  const call = useStreamCall();
  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </div>
  );
};

export default CustomCallLayout;
