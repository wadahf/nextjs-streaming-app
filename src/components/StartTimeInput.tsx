"use client";
import { useState } from "react";
import { Input, Label } from "./";
import { Calendar } from "lucide-react";

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StartTimeInput = ({ value, onChange }: StartTimeInputProps) => {
  const [isActive, setIsActive] = useState(false);
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting Start:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!isActive}
          onChange={() => {
            setIsActive(false);
            onChange("");
          }}
        />
        Start Meeting Now
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={isActive}
          onChange={() => {
            setIsActive(true);
            onChange(dateTimeLocalNow);
          }}
        />
        Start Meeting At Specific Time
      </label>
      {isActive && (
        <label className="block space-y-1">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Start Time</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  className="pl-10"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  min={dateTimeLocalNow}
                />
              </div>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default StartTimeInput;
