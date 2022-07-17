import { TextInput, PasswordInput, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useAppDispatch } from "hooks/redux";
import { ILoginForm } from "interface/IForms";
import { useState } from "react";
import { setUser } from "store/reducers/userReducer";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";
import { firebaseLogin } from "utils/firebase/firebaseLogin";

export const LoginForm: React.FC<ILoginForm> = ({
  setOpened,
  setRegisterModal,
  setRetrieveModal,
  setLoginModal,
  setLoadingOverlay,
}) => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (value) => (value.length < 6 ? "Password length should be longer than 6 symbols" : null),
    },
  });

  const handleLogin = () => {
    setError(null);
    setLoadingOverlay(true);

    firebaseLogin({
      email: loginForm.values.username,
      password: loginForm.values.password,
      onSuccess: (response: UserCredential) => {
        const user = response.user;
        dispatch(
          setUser({
            authorized: true,
            email: user.email,
            id: user.uid,
            verified: user.emailVerified,
            image: user.photoURL,
            username: user.displayName,
          })
        );
        setLoadingOverlay(false);
        setOpened(false);
      },
      onFail: (error: FirebaseError) => {
        setLoadingOverlay(false);
        setError(firebaseErrorHandler({ code: error.code, notificate: true }));
      },
    });
  };

  return (
    <form onSubmit={loginForm.onSubmit((values) => handleLogin())}>
      <TextInput
        placeholder="Username"
        label="Username"
        required
        size="md"
        className="m-v-md"
        {...loginForm.getInputProps("username")}
      />
      <PasswordInput
        placeholder="Password"
        className="m-v-md"
        size="md"
        label="Password"
        error={error}
        required
        {...loginForm.getInputProps("password")}
      />

      <Text
        variant="link"
        onClick={() => {
          setLoginModal(false);
          setRetrieveModal(true);
        }}
      >
        Forgot password?
      </Text>
      <div className="login-buttons">
        <Button
          variant="subtle"
          fullWidth
          size="md"
          className="m-r-sm"
          onClick={() => {
            setLoginModal(false);
            setRegisterModal(true);
          }}
        >
          Create new account
        </Button>
        <Button variant="default" color="blue" size="md" fullWidth type="submit" className="m-l-sm">
          Login
        </Button>
      </div>
    </form>
  );
};
