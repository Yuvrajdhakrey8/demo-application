import * as yup from 'yup';

export enum LoginInputs {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export const loginSchema = yup.object({
  [LoginInputs.USERNAME]: yup
    .string()
    .email('Please enter valid email')
    .required('Please enter your username'),
  [LoginInputs.PASSWORD]: yup.string().required('Please enter your password'),
});

export interface LoginFormValues {
  [LoginInputs.USERNAME]: string;
  [LoginInputs.PASSWORD]: string;
}
