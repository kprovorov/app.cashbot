import { useFormik } from "formik";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { PasswordRestoreData } from "../../../types/AuthData";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import { AxiosError } from "axios";
import { MutateOptions } from "react-query";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";

export default function PasswordRestoreForm({
  initialValues = {
    email: "",
  },
  isLoading = false,
  onSubmit,
  onSuccess = () => {},
}: {
  initialValues?: PasswordRestoreData;
  isLoading?: boolean;
  onSubmit: (
    values: PasswordRestoreData,
    options?: MutateOptions<
      void,
      AxiosError<BackendErrorResponse>,
      PasswordRestoreData
    >
  ) => void;
  onSuccess?: () => void;
}) {
  const handleValidationErrors =
    useHandleValidationErrors<PasswordRestoreData>();

  const formik = useFormik<PasswordRestoreData>({
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
          <SubmitButton className="w-full" type="submit" $loading={isLoading}>
            Restore
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
