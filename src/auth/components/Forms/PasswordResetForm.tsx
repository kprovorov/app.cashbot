import { useFormik } from "formik";
import PrimaryButton from "../../../common/components/ui/buttons/PrimaryButton";
import Input from "../../../common/components/ui/forms/Input";
import InputError from "../../../common/components/ui/forms/InputError";
import Label from "../../../common/components/ui/forms/Label";
import { PasswordResetData } from "../../../types/AuthData";

export default function PasswordResetForm({
  onSubmit,
}: {
  onSubmit: (values: Omit<PasswordResetData, "token" | "email">) => void;
}) {
  const formik = useFormik<Omit<PasswordResetData, "token" | "email">>({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values) => {
      onSubmit(values);
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
          <PrimaryButton className="w-full" type="submit">
            Restore
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}
