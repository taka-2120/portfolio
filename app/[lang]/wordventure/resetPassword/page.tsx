'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SupabaseParams } from '@/constants/supabaseParams';
import ResetPassword from './resetPassword';

const ResetPasswordWrapper = () => {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<SupabaseParams | undefined>(undefined);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const expiresIn = searchParams.get('expires_in') as number | null;
    const refreshToken = searchParams.get('refresh_token');
    const tokenType = searchParams.get('token_type');
    const type = searchParams.get('type');
    if (type !== 'recovery') {
      setIsValid(false);
      return;
    }
    if (accessToken && expiresIn && refreshToken && tokenType && type) {
      setParams({
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
        token_type: tokenType,
        type,
      });
      return;
    }
    setIsValid(false);
  }, [searchParams]);

  return isValid && params ? <ResetPassword params={params} /> : <p>Invalid Parameters</p>;
};

export default ResetPasswordWrapper;
