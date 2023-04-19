import { useFormik } from "formik";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import { LoginData } from "../../../types/LoginData";
import { AxiosError } from "axios";
import { MutateOptions } from "@tanstack/react-query";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";

export default function LoginForm({
  initialValues = {
    email: "",
    password: "",
  },
  isLoading = false,
  onSubmit,
  onSuccess = () => {},
}: {
  initialValues?: LoginData;
  isLoading?: boolean;
  onSubmit: (
    values: LoginData,
    options?: MutateOptions<void, AxiosError<BackendErrorResponse>, LoginData>
  ) => void;
  onSuccess?: () => void;
}) {
  const handleValidationErrors = useHandleValidationErrors<LoginData>();

  const formik = useFormik<LoginData>({
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
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.email}
          />
          <InputError>{formik.errors.email}</InputError>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
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
          <SubmitButton className="w-full" type="submit" $loading={isLoading}>
            Login
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
