"use client";
import { getMailToLink } from "@/utils/helpers";
import { Call } from "@stream-io/video-react-sdk";
import { Copy, CopyCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MeetingLinkProps {
  call: Call;
}

const MeetingLink = ({ call }: MeetingLinkProps) => {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  const [buttonIcon, setButtonIcon] = useState<JSX.Element>(<Copy />);

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setButtonIcon(<CopyCheck className="text-green-700 transition-colors" />);
    setTimeout(() => {
      setButtonIcon(<Copy />);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
        </span>

        <button type="button" onClick={handleCopy} title="Copy invitaion link">
          {buttonIcon}
        </button>
      </div>
      <a
        href={getMailToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description,
        )}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send email invitaion
      </a>
    </div>
  );
};

export default MeetingLink;
