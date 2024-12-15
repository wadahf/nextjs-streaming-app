"use client";
import useStreamCall from "@/hooks/useStreamCall";
import Link from "next/link";
import React from "react";
import { buttonClassName } from "./Button";

const UpcomingMeetingScreen = () => {
  const call = useStreamCall();
  const meetingDescription = call.state.custom.description;

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This meeting has not started yet. It will start at:{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {meetingDescription && (
        <p>
          description: <span className="font-bold">{meetingDescription}</span>
        </p>
      )}
      <Link href="/" className={buttonClassName}>
        Go To Home Page
      </Link>
    </div>
  );
};

export default UpcomingMeetingScreen;
