import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallButton = () => {
  const call = useStreamCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isParticipantCallOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isParticipantCallOwner) {
    return null;
  }

  return (
    <button
      onClick={call.endCall}
      className="mx-auto block font-medium text-red-500 hover:underline"
    >
      End call for everyone
    </button>
  );
};

export default EndCallButton;
