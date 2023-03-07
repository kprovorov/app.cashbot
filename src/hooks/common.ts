import { AxiosError } from "axios";
import { FormikProps } from "formik";

export type ErrorBag = {
  [key: string]: string[];
};

export type BackendErrorResponse = {
  message: string;
  errors: ErrorBag;
};

export function useHandleValidationErrors<Values>() {
  return (
    error: AxiosError<BackendErrorResponse>,
    formik: FormikProps<Values>
  ) => {
    if (error.response) {
      Object.keys(error.response.data.errors).forEach((field: string) => {
        formik.setFieldError(field, error.response?.data.errors[field][0]);
      });
    }
  };
}
