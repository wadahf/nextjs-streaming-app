import MeetingLoginPage from "@/components/MeetingLoginPage";
import MeetingPage from "@/components/MeetingPage";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
  params: { meetingId: string };
  searchParams: { guest: string };
}

export const generateMetadata = ({ params: { meetingId } }: PageProps) => {
  return {
    title: `Meeting ${meetingId}`,
  };
};

export default async function SingeMeetingPage({
  params: { meetingId },
  searchParams: { guest },
}: PageProps) {
  const user = await currentUser();
  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return <MeetingLoginPage />;
  }

  return <MeetingPage id={meetingId} />;
}
