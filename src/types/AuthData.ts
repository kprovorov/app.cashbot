export type PasswordRestoreData = {
  email: string;
};

export type PasswordResetData = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};
