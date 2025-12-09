import { Call } from "@stream-io/video-react-sdk";
import { MeetingItem } from "../";

interface MeetingsListProps {
  filterFn: (c: Call) => boolean;
  calls: Call[];
  title?: string;
}

const MeetingsList = ({ calls, filterFn, title }: MeetingsListProps) => {
  return (
    <div>
      {title && <h2 className="mb-4 text-2xl font-semibold">{title}</h2>}
      <div className="grid gap-4 md:grid-cols-2">
        {calls?.filter(filterFn).map((call) => {
          const meetingLink = `/meeting/${call.id}`;
          const isCallNotStartedYet =
            call.state.startsAt && new Date(call.state.startsAt) > new Date();

          const isCallHasEnded = !!call.state.endedAt;

          const meetingState = isCallNotStartedYet
            ? "Upcoming"
            : isCallHasEnded
              ? "Ended"
              : call.state.callingState[0].toUpperCase() +
                call.state.callingState.slice(1);

          return (
            <MeetingItem
              key={call.id}
              meeting={call}
              href={meetingLink}
              state={meetingState}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MeetingsList;
