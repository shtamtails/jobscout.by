import { Button, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [opened, setOpened] = useState(true);

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Login or create account"
    >
      <form>
        <TextInput placeholder="Username" label="Username" required size="md" className="m-v-md" />
        <PasswordInput
          placeholder="Password"
          className="m-v-md"
          size="md"
          label="Password"
          required
        />

        <Link to="/retrieve">
          <Text variant="link">Forgot password?</Text>
        </Link>
        <div className="login-buttons">
          <Button variant="subtle" fullWidth size="md" className="m-r-sm">
            Create new account
          </Button>
          <Button
            variant="default"
            color="blue"
            size="md"
            fullWidth
            type="submit"
            className="m-l-sm"
          >
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
};
