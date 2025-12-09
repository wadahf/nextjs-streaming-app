import Link from "next/link";
import RecordingsList from "./RecordingsList";
import { Button } from "@/components";

const EndedMeetingScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended.</p>
      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <RecordingsList />
      </div>
      <Button>
        <Link href="/">Go To Home Page</Link>
      </Button>
    </div>
  );
};

export default EndedMeetingScreen;
