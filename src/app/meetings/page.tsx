"use client";
import { Calendar, Clock, Loader2, Users, Video } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";

const meetings = [
  {
    id: 1,
    title: "Team Standup",
    date: "2025-10-30",
    time: "10:00 AM",
    duration: "30 min",
    participants: 8,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Project Review",
    date: "2025-10-30",
    time: "2:00 PM",
    duration: "1 hour",
    participants: 12,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "2025-10-29",
    time: "3:00 PM",
    duration: "45 min",
    participants: 6,
    status: "completed",
  },
  {
    id: 4,
    title: "Design Sprint",
    date: "2025-10-28",
    time: "11:00 AM",
    duration: "2 hours",
    participants: 10,
    status: "completed",
  },
];

const MeetingsPage = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      const { calls } = await client.queryCalls({
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });
      setCalls(calls);
    };
    loadCalls();
  }, [client, user?.id]);

  // if (!calls) {
  //   return <Loader2 className="mx-auto animate-spin" />;
  // }

  // if (calls.length > 0) {
  //   <p>No Meetings found</p>;
  // }

  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent">
            My Meetings
          </h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past meetings
          </p>
        </div>

        {!calls && <Loader2 className="mx-auto animate-spin" />}
        {/* {calls?.length === 0 && <p>No Meetings found</p>} */}
        {calls && calls?.length === 0 && <p>No Meetings found</p>}

        <div className="space-y-6">
          <div>
            {/* <h2 className="mb-4 text-2xl font-semibold">Upcoming</h2> */}
            <div className="grid gap-4 md:grid-cols-2">
              {calls
                ?.filter((c) => !c.state.endedAt)
                .map((call) => {
                  const meetingLink = `/meeting/${call.id}`;
                  const isCallNotStartedYet =
                    call.state.startsAt &&
                    new Date(call.state.startsAt) > new Date();

                  const isCallHasEnded = !!call.state.endedAt;

                  const meetingState = isCallNotStartedYet
                    ? "Upcoming"
                    : isCallHasEnded
                      ? "Ended"
                      : call.state.callingState[0].toUpperCase() +
                        call.state.callingState.slice(1);

                  return (
                    <Card
                      key={call.id}
                      className="transition-shadow hover:shadow-[var(--shadow-elegant)]"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">
                              {/* Meeting ID: {call.id} */}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              <div className="mt-2 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {/* {meeting.date} */}
                                  {/* {call.state.startsAt?.toLocaleString()} */}
                                  {call.state.startsAt?.toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {/* {meeting.time} */}
                                  {call.state.startsAt?.toLocaleTimeString()}
                                </span>
                              </div>
                              {call.state.custom.description && (
                                <p className="mt-2">
                                  {call.state.custom.description}
                                </p>
                              )}
                            </CardDescription>
                          </div>
                          {/* <Badge className="bg-accent text-accent-foreground"> */}
                          <Badge className="bg-accent text-secondary">
                            {meetingState}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {/* {meeting.participants} participants */}
                              {
                                call.state.participantCount
                              } participants
                            </span>

                            {/* <span>{meeting.duration}</span> */}
                          </div>
                          <Button size="sm" variant="default">
                            <Video className="h-4 w-4" />
                            <Link href={meetingLink}>Join</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              {/* {meetings
                .filter((m) => m.status === "upcoming")
                .map((meeting) => (
                  <Card
                    key={meeting.id}
                    className="transition-shadow hover:shadow-[var(--shadow-elegant)]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {meeting.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            <div className="mt-2 flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {meeting.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {meeting.time}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">
                          {meeting.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.participants} participants
                          </span>
                          <span>{meeting.duration}</span>
                        </div>
                        <Button size="sm" variant="default">
                          <Video className="h-4 w-4" />
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))} */}
            </div>
          </div>
          <div>
            {calls?.filter((c) => !!c.state.endedAt) && (
              <h2 className="mb-4 text-2xl font-semibold">Past Meetings</h2>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {calls
                ?.filter((c) => !!c.state.endedAt)
                .map((call) => {
                  const meetingLink = `/meeting/${call.id}`;
                  const isCallNotStartedYet =
                    call.state.startsAt &&
                    new Date(call.state.startsAt) > new Date();

                  const isCallHasEnded = !!call.state.endedAt;

                  const meetingState = isCallNotStartedYet
                    ? "Upcoming"
                    : isCallHasEnded
                      ? "Ended"
                      : call.state.callingState[0].toUpperCase() +
                        call.state.callingState.slice(1);

                  return (
                    <Card
                      key={call.id}
                      className="transition-shadow hover:shadow-[var(--shadow-elegant)]"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">
                              {/* Meeting ID: {call.id} */}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              <div className="mt-2 flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {/* {meeting.date} */}
                                  {/* {call.state.startsAt?.toLocaleString()} */}
                                  {call.state.startsAt?.toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {/* {meeting.time} */}
                                  {call.state.startsAt?.toLocaleTimeString()}
                                </span>
                              </div>
                              {call.state.custom.description && (
                                <p className="mt-2">
                                  {call.state.custom.description}
                                </p>
                              )}
                            </CardDescription>
                          </div>
                          {/* <Badge className="bg-accent text-accent-foreground"> */}
                          <Badge className="bg-accent text-secondary">
                            {meetingState}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {/* {meeting.participants} participants */}
                              {
                                call.state.participantCount
                              } participants
                            </span>

                            {/* <span>{meeting.duration}</span> */}
                          </div>
                          <Button size="sm" variant="default">
                            <Video className="h-4 w-4" />
                            <Link href={meetingLink}>Join</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>

          {/* <div>
            <h2 className="mb-4 text-2xl font-semibold">Past Meetings</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {meetings
                .filter((m) => m.status === "completed")
                .map((meeting) => (
                  <Card
                    key={meeting.id}
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {meeting.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            <div className="mt-2 flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {meeting.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {meeting.time}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{meeting.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {meeting.participants} participants
                          </span>
                          <span>{meeting.duration}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;
