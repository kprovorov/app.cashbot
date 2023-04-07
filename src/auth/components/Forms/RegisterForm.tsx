import { useFormik } from "formik";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import SubmitButton from "../../../common/components/ui/buttons/SubmitButton";
import { RegisterData } from "../../../types/RegisterData";
import { MutateOptions } from "react-query";
import { AxiosError } from "axios";
import {
  BackendErrorResponse,
  useHandleValidationErrors,
} from "../../../hooks/common";

export default function RegisterForm({
  initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  },
  isLoading = false,
  onSubmit,
  onSuccess,
}: {
  initialValues?: RegisterData;
  isLoading?: boolean;
  onSubmit: (
    values: RegisterData,
    options?: MutateOptions<
      void,
      AxiosError<BackendErrorResponse>,
      RegisterData
    >
  ) => void;
  onSuccess?: () => void;
}) {
  const handleValidationErrors = useHandleValidationErrors<RegisterData>();

  const formik = useFormik<RegisterData>({
    initialValues,
    onSubmit: (values) => {
      onSubmit(
        {
          ...values,
          password_confirmation: values.password,
        },
        {
          onSuccess,
          onError: (error) => {
            if (error.response?.status === 422) {
              handleValidationErrors(error, formik);
            }
          },
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="name">name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.name}
          />
          <InputError>{formik.errors.name}</InputError>
        </div>
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
            Register
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
