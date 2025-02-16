import React, { useState } from "react";
import styles from "./Login.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginInputs, loginSchema } from "./const";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async () => {
    // setLoading(true);
    // const { username, password } = values;
    // login({
    //   username,
    //   password,
    // })
    //   .then((res) => {
    //     const { success, accessToken, data, refreshToken, msg } = res as LoginData;
    //     setLoading(false);
    //     if (!success) {
    //       throw new Error(msg);
    //     }
    //     if (data) {
    //         localStorage.setItem(key, value);
    //       setLocalStorageItem('accessToken', accessToken);
    //       setLocalStorageItem('refreshToken', refreshToken);
    //       setLocalStorageItem('agent', JSON.stringify(data));
    //       navigate(Routes.DASHBOARD);
    //     }
    //   })
    //   .catch((err: Error) => {
    //     toast.error(err?.message);
    //   });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Login</p>
        <TextField
          {...register(LoginInputs.USERNAME)}
          placeholder="Enter username or email"
          label="Username"
          fullWidth
          error={!!errors[LoginInputs.USERNAME]}
          helperText={errors[LoginInputs.USERNAME]?.message}
        />
        <TextField
          {...register(LoginInputs.PASSWORD)}
          placeholder="Password"
          label="Password"
          type="password"
          fullWidth
          error={!!errors[LoginInputs.PASSWORD]}
          helperText={errors[LoginInputs.PASSWORD]?.message}
        />
        <Button type="submit" variant="contained" loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
