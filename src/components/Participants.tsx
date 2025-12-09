"use client";
import { useState } from "react";
import { Label, Textarea } from "./";

interface ParticipantsProps {
  value: string;
  onChange: (value: string) => void;
}

const Participants = ({ value, onChange }: ParticipantsProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Participants:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!isActive}
          onChange={() => {
            setIsActive(false);
            onChange("");
          }}
        />
        Everyone With Link Can Join
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={isActive}
          onChange={() => setIsActive(true)}
        />
        Private Meeting
      </label>

      {isActive && (
        <div className="space-y-2">
          <Label htmlFor="description">Participant Emails</Label>
          <Textarea
            id="description"
            name="description"
            className="min-h-[100px]"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter participant emails seperated by commas"
          />
        </div>
      )}
    </div>
  );
};

export default Participants;
