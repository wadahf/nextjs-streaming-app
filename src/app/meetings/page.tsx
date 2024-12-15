import MyMeetingsPage from "@/components/MyMeetingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Meetings",
};

const MeetingPage = () => {
  return <MyMeetingsPage />;
};

export default MeetingPage;
