'use client';

import { Button, Flex, Stack } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Urls } from '@/constants/urls';
import classes from '../style.module.css';

const WordVenturePrivacyPolicy = () => {
  const [privacyPolicyEn, setPrivacyPolicyEn] = useState('');
  const [privacyPolicyJa, setPrivacyPolicyJa] = useState('');
  const [isEn, setIsEn] = useState(false);

  const fetchEn = async () => {
    const url = supabase.storage.from(Urls.sharedBucket).getPublicUrl(Urls.privacyPolicyEn).data.publicUrl;
    const response = await fetch(url);
    const text = await response.text();
    setPrivacyPolicyEn(text);
  };

  const fetchJa = async () => {
    const url = supabase.storage.from(Urls.sharedBucket).getPublicUrl(Urls.privacyPolicyJa).data.publicUrl;
    const response = await fetch(url);
    const text = await response.text();
    setPrivacyPolicyJa(text);
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
