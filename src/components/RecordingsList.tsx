import useLoadRecordings from "@/hooks/useLoadRecordings";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const RecordingsList = () => {
  const call = useStreamCall();
  const { reocrdings, isLoading: isRecordingsLoading } =
    useLoadRecordings(call);
  const { user, isLoaded: isUserLoaded } = useUser();

  if (isUserLoaded && !user) {
    return (
      <p className="text-center">You must be logged in to show recordings.</p>
    );
  }

  if (isRecordingsLoading) return <Loader2 className="mx-auto animate-spin" />;

  return (
    <div className="space-y-3 text-center">
      {reocrdings.length < 1 && <p>No recordings for this meeting.</p>}
      <ul className="list-inside list-disc">
        {reocrdings
          .sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((recording) => (
            <li key={recording.url}>
              <Link
                href={recording.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(recording.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-sm text-gray-500">
        Note: it can take up to one minute before new recordings show up.
      </p>
    </div>
  );
};

export default RecordingsList;
