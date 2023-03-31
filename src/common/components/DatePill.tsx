import moment, { Moment } from "moment/moment";
import React from "react";

export function DatePill({ date }: { date: Moment }) {
  return (
    <div
      className={`h-8 w-8 flex flex-col rounded-full items-center justify-center leading-tight ${
        date.isSameOrBefore()
          ? "bg-primary text-white"
          : "bg-gray-light text-gray-light"
      }`}
    >
      <div className="text-sm font-bold">{date.format("D")}</div>
      <div className="text-xs uppercase">{date.format("MMM")}</div>
    </div>
  );
}
