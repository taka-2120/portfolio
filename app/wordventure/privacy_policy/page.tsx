'use client';

import { Button, Flex, Stack, createStyles } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { sharedBucket, privacyPolicyEnUrl, privacyPolicyJaUrl } from '../../constants/urls';

const styles = createStyles(() => ({
  stack: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    padding: 20
  }
}));

const WordVenturePrivacyPolicy = () => {
  const { classes } = styles();
  const [privacyPolicyEn, setprivacyPolicyEn] = useState('');
  const [privacyPolicyJa, setprivacyPolicyJa] = useState('');
  const [isEn, setIsEn] = useState(false);

  const fetchEn = async () => {
    const url = supabase.storage.from(sharedBucket).getPublicUrl(privacyPolicyEnUrl).data.publicUrl;
    const response = await fetch(url);
    const text = await response.text();
    setprivacyPolicyEn(text);
  };

  const fetchJa = async () => {
    const url = supabase.storage.from(sharedBucket).getPublicUrl(privacyPolicyJaUrl).data.publicUrl;
    const response = await fetch(url);
    const text = await response.text();
    setprivacyPolicyJa(text);
  };

  useEffect(() => {
    (async () => {
      try {
        fetchEn();
        fetchJa();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  return (
    <Stack className={classes.stack} w="100%" justify="flex-start">
      <Flex w="100%" justify="flex-end">
        <Button variant="filled" onClick={() => setIsEn(!isEn)}>
          {isEn ? '日本語' : 'English'}
        </Button>
      </Flex>
      {isEn ? <ReactMarkdown>{privacyPolicyEn}</ReactMarkdown> : <ReactMarkdown>{privacyPolicyJa}</ReactMarkdown>}
    </Stack>
  );
};

export default WordVenturePrivacyPolicy;
