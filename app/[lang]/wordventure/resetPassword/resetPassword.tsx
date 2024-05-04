import { useEffect, useState } from 'react';
import { Button, Center, PasswordInput, Stack } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { User } from '@supabase/supabase-js';
import { SupabaseParams } from '@/constants/supabaseParams';
import { supabase } from '@/lib/supabase';
import { Regex } from '@/constants/regex';

interface ResetPasswordProps {
  params: SupabaseParams;
}

const ResetPassword = ({ params }: ResetPasswordProps) => {
  const [password, setPassword] = useInputState('');
  const [rePassword, setRePassword] = useInputState('');
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [isCompleted, setIsCompleted] = useState(false);

  const setSession = async () => {
    const response = await supabase.auth.setSession({
      access_token: params.access_token,
      refresh_token: params.refresh_token,
    });
    console.log(response);

    return response;
  };

  const isValidated = () => {
    if (password !== rePassword) {
      alert('Passwords do not match!');
      return false;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return false;
    }

    if (RegExp(Regex.password).test(password) === false) {
      alert('Password must contain at least one alphanumeric character and special symbols: #?!@$%.^&*_-.');
      return false;
    }

    return true;
  };

  const resetPassword = async () => {
    if (isValidated()) {
      const response = await supabase.auth.updateUser({ password });
      if (response.error) {
        console.log(response.error);
      } else {
        setIsCompleted(true);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const response = await setSession();
      if (response.error || response.data.user === null) {
        console.log(response.error);
      } else {
        setUserData(response.data.user!);
      }
    })();
  }, []);

  return isCompleted ? (
    <Center w="100vw" h="100vh">
      <Stack align="center">
        <h2>Password reset complete!</h2>
        <p>You can close this page.</p>
      </Stack>
    </Center>
  ) : (
    <Stack p={20} maw={1000}>
      <h1>Reset Password</h1>
      <p>Reset password for {userData?.email ?? 'unknown email'}</p>

      <PasswordInput
        label="New Password"
        placeholder="New password"
        required
        mt="md"
        value={password}
        onChange={setPassword}
      />
      <PasswordInput
        label="One more time..."
        placeholder="Re-enter new password"
        required
        mt="md"
        value={rePassword}
        onChange={setRePassword}
      />

      <Button m="0 auto" mt="xl" px="30px" maw="250px" onClick={resetPassword}>
        Reset Password
      </Button>
    </Stack>
  );
};

export default ResetPassword;
