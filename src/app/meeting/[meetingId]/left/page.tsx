import { buttonClassName } from "@/components/Button";
import { cn } from "@/utils/helpers";
import Link from "next/link";

interface LeaveCallPageProps {
  params: { meetingId: string };
}

const LeaveCallPage = ({ params: { meetingId } }: LeaveCallPageProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You have left this meetine.</p>
      <Link
        href={`/meeting/${meetingId}`}
        className={cn(buttonClassName, "bg-gray-500 hover:bg-gray-600")}
      >
        Rejoin Meeting
      </Link>
    </div>
  );
};

export default LeaveCallPage;
