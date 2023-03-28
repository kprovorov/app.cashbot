import { forwardRef, PropsWithChildren } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Button from "../buttons/Button";
import moment from "moment";
import SecondaryButton from "../buttons/SecondaryButton";

export default function Datepicker({
  children,
  $invalid,
  buttonClassName = "",
  ...props
}: PropsWithChildren<
  ReactDatePickerProps & { $invalid: boolean; buttonClassName?: string }
>) {
  const DatepickerInput = forwardRef<
    HTMLButtonElement,
    { value: Date | null | undefined; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <SecondaryButton
      type="button"
      className={`w-full flex flex-row justify-between text-slate-900  font-sans leading-tight py-2 px-3 border-slate-300 ${
        $invalid ? "text-error" : ""
      } ${buttonClassName}`}
      onClick={onClick}
      ref={ref}
    >
      <span>
        {value
          ? moment(value).format("D MMM YYYY")
          : props.placeholderText || "select date"}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </SecondaryButton>
  ));

  return (
    <DatePicker
      todayButton="Today"
      customInput={
        <DatepickerInput value={props.selected} onClick={props.onInputClick} />
      }
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex flex-row justify-between items-center">
          <button
            type="button"
            className="hover:bg-slate-100 rounded w-8 h-8 flex items-center justify-center"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="text-xl">
            <span className="font-semibold">
              {date ? moment(date).format("MMMM") : moment().format("MMMM")}
            </span>{" "}
            <span className="font-light">
              {date ? moment(date).format("YYYY") : moment().format("YYYY")}
            </span>
          </div>

          <button
            type="button"
            className="hover:bg-slate-100 rounded w-8 h-8 flex items-center justify-center"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      {...props}
    >
      {children}
    </DatePicker>
  );
}
