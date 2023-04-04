import { useFormik } from "formik";
import { UserPasswordData } from "../../../types/UserPasswordData";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import { MutateOptions } from "react-query";
import { AxiosError } from "axios";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";

export default function UserPasswordForm({
  initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  },
  isLoading = false,
  onSubmit,
}: {
  initialValues?: UserPasswordData;
  isLoading?: boolean;
  onSubmit: (
    values: UserPasswordData,
    options?: MutateOptions<
      void,
      AxiosError<BackendErrorResponse>,
      UserPasswordData
    >
  ) => void;
}) {
  const handleValidationErrors = useHandleValidationErrors<UserPasswordData>();

  const formik = useFormik<UserPasswordData>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values, {
        onError: (error) => {
          if (error.response?.status === 422) {
            handleValidationErrors(error, formik);
          }
        },
        onSuccess: () => {
          formik.resetForm();
          alert("Password updated successfully!");
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-lg">
        <div>
          <Label htmlFor="current_password">current password</Label>
          <Input
            type="password"
            id="current_password"
            name="current_password"
            value={formik.values.current_password}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.current_password}
          />
          <InputError>{formik.errors.current_password}</InputError>
        </div>
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
          <Label htmlFor="password_confirmation">confirm password</Label>
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
          <SubmitButton $loading={isLoading} className="w-full">
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
