import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";

interface MeetingItemProps {
  call: Call;
}

const MeetingItem = ({ call }: MeetingItemProps) => {
  const meetingLink = `/meeting/${call.id}`;
  const isCallNotStartedYet =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const isCallHasEnded = !!call.state.endedAt;

  return (
    <li>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isCallNotStartedYet && " (Upcoming)"}
        {isCallHasEnded && " (Ended)"}
      </Link>
      <p className="ml-6 text-gray-500">{call.state.custom.description}</p>
    </li>
  );
};

export default MeetingItem;
