import { useFormik } from "formik";
import { usePasswordRestoreMutation } from "../../../api/auth";
import PrimaryButton from "../../../common/components/ui/buttons/PrimaryButton";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { PasswordRestoreData } from "../../../types/AuthData";

export default function PasswordRestoreForm({
  onSubmit,
}: {
  onSubmit: (values: PasswordRestoreData) => void;
}) {
  const formik = useFormik<PasswordRestoreData>({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
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
          <PrimaryButton className="w-full" type="submit">
            Restore
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}
