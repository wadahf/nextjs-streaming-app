"use client";
import { useState } from "react";
import { Input, Label, Textarea } from "./";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-2">
      <div className="font-medium">Meeting info:</div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>
      {/* {isChecked && (
        <label className="block space-y-1">
          <span className="font-medium">Description</span>

          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )} */}
      {/* new description */}

      {isChecked && (
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Add meeting agenda or notes..."
            className="min-h-[100px]"
            value={value}
            maxLength={500}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default DescriptionInput;
