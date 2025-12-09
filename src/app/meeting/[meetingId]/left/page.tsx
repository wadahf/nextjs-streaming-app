import { Button } from "@/components";
import Link from "next/link";

interface LeaveCallPageProps {
  params: { meetingId: string };
}

const LeaveCallPage = ({ params: { meetingId } }: LeaveCallPageProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You have left this meetine.</p>
      <Button className="bg-gray-500 hover:bg-gray-600">
        <Link href={`/meeting/${meetingId}`}>Rejoin Meeting</Link>
      </Button>
    </div>
  );
};

export default LeaveCallPage;
