interface PageProps {
  params: { meetingId: string };
}

export const generateMetadata = ({ params: { meetingId } }: PageProps) => {
  return {
    title: `Meeting ${meetingId}`,
  };
};

export default function SingeMeetingPage({ params: { meetingId } }: PageProps) {
  return <div>page</div>;
}
