import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";

export default function Info({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row items-stretch gap-2 text-gray">
      <div className="flex items-start">
        <InformationCircleIcon className="w-6 h-6" />
      </div>
      <div className="flex items-center text-base gap-1 flex-grow">
        {children}
      </div>
    </div>
  );
}
