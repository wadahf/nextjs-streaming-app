"use client";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { MeetingsList } from "@/components";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

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
        {calls?.length === 0 && <p>No Meetings found</p>}
        {/* {calls && calls?.length === 0 && <p>No Meetings found</p>} */}

        <div className="space-y-6">
          {calls && (
            <>
              <MeetingsList calls={calls} filterFn={(c) => !c.state.endedAt} />
              <MeetingsList
                calls={calls}
                filterFn={(c) => !!c.state.endedAt}
                title="Past Meetings"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;
