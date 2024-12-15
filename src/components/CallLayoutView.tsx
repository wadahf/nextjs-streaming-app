import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";

interface CallLayoutViewProps {
  layout: CallLayout;
}

const CallLayoutView = ({ layout }: CallLayoutViewProps) => {
  if (layout === "grid") {
    return <PaginatedGridLayout />;
  }

  if (layout === "speaker-horizontal") {
    return <SpeakerLayout />;
  }

  return <SpeakerLayout participantsBarPosition="right" />;
};

export default CallLayoutView;
