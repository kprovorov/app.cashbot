import { AxiosError } from "axios";
import { FormikProps } from "formik";

type ErrorBag = {
  [key: string]: string[];
};

export function useHandleValidationErrors<Values>() {
  return (errors: ErrorBag, formik: FormikProps<Values>) => {
    Object.keys(errors).forEach((e: string) => {
      formik.setFieldError(e, errors[e][0]);
    });
  };
}
