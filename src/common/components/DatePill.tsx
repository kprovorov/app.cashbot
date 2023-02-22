import moment, { Moment } from "moment/moment";
import React from "react";

export function DatePill({ date }: { date: Moment }) {
  return (
    <div
      className={`tw-h-8 tw-w-8 tw-flex tw-flex-col tw-rounded-full tw-items-center tw-justify-center tw-leading-tight ${
        date.isSameOrBefore()
          ? "tw-bg-primary tw-text-white"
          : "tw-bg-slate-100 tw-text-slate-500"
      }`}
    >
      <div className="tw-text-sm tw-font-bold">{date.format("D")}</div>
      <div className="tw-text-xs tw-uppercase">{date.format("MMM")}</div>
    </div>
  );
}
