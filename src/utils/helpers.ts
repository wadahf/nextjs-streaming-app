import { clsx } from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getMailToLink = (
  meetingLink: string,
  startAt?: Date,
  description?: string,
): string => {
  const startTimeFormatted = startAt
    ? startAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;

  const subject =
    "Join my meeting" + (startTimeFormatted ? ` at ${startTimeFormatted}` : "");

  const body =
    `Join my meeting at ${meetingLink}.` +
    (startTimeFormatted
      ? `\n\nThe meeting starts on ${startTimeFormatted}.`
      : "") +
    (description ? `\n\nDescription: ${description}` : "");

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
