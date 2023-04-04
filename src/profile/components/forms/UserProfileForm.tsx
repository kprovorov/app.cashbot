import { useFormik } from "formik";
import { UserProfileData } from "../../../types/UserProfileData";
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

export default function UserProfileForm({
  initialValues = {
    name: "",
    email: "",
  },
  isLoading = false,
  onSubmit,
}: {
  initialValues?: UserProfileData;
  isLoading?: boolean;
  onSubmit: (
    values: UserProfileData,
    options?: MutateOptions<
      void,
      AxiosError<BackendErrorResponse>,
      UserProfileData
    >
  ) => void;
}) {
  const handleValidationErrors = useHandleValidationErrors<UserProfileData>();

  const formik = useFormik<UserProfileData>({
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
          alert("Profile updated successfully!");
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-lg">
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
          <Label htmlFor="email">email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            $invalid={!!formik.errors.email}
          />
          <InputError>{formik.errors.email}</InputError>
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
