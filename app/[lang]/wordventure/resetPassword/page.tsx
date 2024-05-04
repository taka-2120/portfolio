'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SupabaseParams } from '@/constants/supabaseParams';
import ResetPassword from './resetPassword';
import classes from './style.module.css';

export const SupabaseOuter = () => {
  const router = useRouter();
  const [params, setParams] = useState<SupabaseParams | undefined>(undefined);

  useEffect(() => {
    if (router.asPath !== '') {
      const paramsString = router.asPath.replace(/^#/, '');
      const paramArray = paramsString.split('&');
      setParams({
        access_token: paramArray[0].replace(/^access_token=/, ''),
        expires_in: paramArray[1].replace(/^expires_in=/, '') as unknown as number,
        refresh_token: paramArray[2].replace(/^refresh_token=/, ''),
        token_type: paramArray[3].replace(/^token_type=/, ''),
        type: paramArray[4].replace(/^type=/, ''),
      });
    }
  }, [router]);

  return (
    <div className={classes.stack}>
      {params?.type === 'recovery' ? <ResetPassword params={params} /> : <h2>Unknown Error Occurred</h2>}
    </div>
  );
};
