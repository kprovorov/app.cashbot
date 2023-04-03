import { ArrowRightIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "./PrimaryButton";
import { PropsWithChildren } from "react";
import { ButtonProps } from "./Button";

export type SubmitButtonProps = {
  $loading?: boolean;
} & ButtonProps &
  React.ComponentProps<"button">;

export default function SubmitButton({
  $loading = false,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <PrimaryButton disabled={$loading} {...props}>
      {children}
      {$loading ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 animate-spin fill-white"
        >
          <path
            opacity="0.4"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12Z"
          />
          <path d="M21.25 12C21.6642 12 22.0029 11.6637 21.9719 11.2507C21.853 9.66868 21.3591 8.1338 20.5264 6.77501C19.5628 5.20256 18.1831 3.92719 16.5399 3.08993C14.8967 2.25267 13.0539 1.88613 11.2154 2.03083C9.6267 2.15586 8.09461 2.65842 6.74489 3.49213C6.39248 3.70981 6.31952 4.18149 6.56299 4.51659V4.51659C6.80646 4.8517 7.27399 4.92282 7.62925 4.70983C8.75291 4.03614 10.0203 3.62953 11.3331 3.5262C12.8959 3.40321 14.4622 3.71477 15.8589 4.42644C17.2557 5.13812 18.4284 6.22217 19.2474 7.55876C19.9355 8.6816 20.3515 9.94592 20.4669 11.251C20.5034 11.6636 20.8358 12 21.25 12V12Z" />
        </svg>
      ) : (
        <ArrowRightIcon className="w-6 h-6" />
      )}
    </PrimaryButton>
  );
}
