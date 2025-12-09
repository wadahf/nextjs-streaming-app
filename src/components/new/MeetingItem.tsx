import { Calendar, Clock, Users, Video } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../";
import Link from "next/link";
import { Call } from "@stream-io/video-react-sdk";

interface MeetingItemProps {
  meeting: Call;
  state: string;
  href: string;
}

const MeetingItem = ({ meeting, state, href }: MeetingItemProps) => {
  return (
    <Card
      key={meeting.id}
      className="transition-shadow hover:shadow-[var(--shadow-elegant)]"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            {/* <CardTitle className="text-xl">ID: {meeting.state.custom.title}</CardTitle> */}
            <CardDescription className="mt-1">
              <div className="mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {meeting.state.startsAt?.toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {meeting.state.startsAt?.toLocaleTimeString()}
                </span>
              </div>
              {meeting.state.custom.description && (
                <p className="mt-2">{meeting.state.custom.description}</p>
              )}
            </CardDescription>
          </div>

          <Badge className="bg-accent text-secondary">{state}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {meeting.state.participantCount} participants
            </span>

            {/* <span>{meeting.duration}</span> */}
          </div>
          <Button size="sm" variant="default">
            <Video className="h-4 w-4" />
            <Link href={href}>{state === "Ended" ? "Recordings" : "Join"}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingItem;
