import Link from "next/link";
import { buttonClassName } from "./Button";
import RecordingsList from "./RecordingsList";

const EndedMeetingScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended.</p>
      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <RecordingsList />
      </div>
      <Link href="/" className={buttonClassName}>
        Go To Home Page
      </Link>
    </div>
  );
};

export default EndedMeetingScreen;
