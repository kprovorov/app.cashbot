import { useFormik } from "formik";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { PasswordResetData } from "../../../types/AuthData";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import { AxiosError } from "axios";
import { MutateOptions } from "@tanstack/react-query";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";

export default function PasswordResetForm({
  initialValues = {
    password: "",
    password_confirmation: "",
  },
  loading = false,
  onSubmit,
  onSuccess = () => {},
}: {
  initialValues?: Omit<PasswordResetData, "token" | "email">;
  loading?: boolean;
  onSubmit: (
    values: Omit<PasswordResetData, "token" | "email">,
    options?: MutateOptions<
      void,
      AxiosError<BackendErrorResponse>,
      Omit<PasswordResetData, "token" | "email">
    >
  ) => void;
  onSuccess?: () => void;
}) {
  const handleValidationErrors =
    useHandleValidationErrors<Omit<PasswordResetData, "token" | "email">>();

  const formik = useFormik<Omit<PasswordResetData, "token" | "email">>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values, {
        onSuccess,
        onError: (error) => {
          if (error.response?.status === 422) {
            handleValidationErrors(error, formik);
          }
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.password}
          />
          <InputError>{formik.errors.password}</InputError>
        </div>
        <div>
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.password_confirmation}
          />
          <InputError>{formik.errors.password_confirmation}</InputError>
        </div>
        <div>
          <SubmitButton className="w-full" type="submit" $loading={loading}>
            Restore
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
