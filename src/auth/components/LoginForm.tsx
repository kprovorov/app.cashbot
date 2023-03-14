import { useFormik } from "formik";
import { useLoginMutation } from "../../api/auth";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import Input from "../../common/components/ui/forms/Input";
import InputError from "../../common/components/ui/forms/InputError";
import Label from "../../common/components/ui/forms/Label";
import LoginFormData from "../../interfaces/LoginFormData";

export default function LoginForm() {
  const { mutate } = useLoginMutation();

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <h1 className="uppercase font-bold">Login</h1>
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
            <PrimaryButton type="submit">Login</PrimaryButton>
          </div>
        </div>
      </div>
    </form>
  );
}
