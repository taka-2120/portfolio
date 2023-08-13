import { useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { SupabaseParams } from '../lib/supabase_params';
import { ResetPassword } from './ResetPassword';

const styles = createStyles(() => ({
  stack: {
    fontFamily: 'Helvetica',
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    padding: 20
  }
}));

export const SupabaseOuter = () => {
  const { classes } = styles();
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
        type: paramArray[4].replace(/^type=/, '')
      });
    }
  }, [router]);

  return (
    <div className={classes.stack}>
      {params?.type === 'recovery' ? <ResetPassword params={params} /> : <h2>Unknown Error Occured</h2>}
    </div>
  );
};
