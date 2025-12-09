"use client";
import { getMailToLink } from "@/utils/helpers";
import { Call } from "@stream-io/video-react-sdk";
import { Copy, CopyCheck, LinkIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "@/components";

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
    <Card className="mx-auto mt-6 max-w-fit border-accent/20 bg-accent/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-accent/10 p-2">
            <LinkIcon className="h-5 w-5 text-accent" />
          </div>

          <div>
            <h3 className="mb-1 font-semibold">Invitation link</h3>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3">
                <span>
                  <Link href={meetingLink} className="font-medium">
                    {meetingLink}
                  </Link>
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy invitaion link"
                >
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingLink;
