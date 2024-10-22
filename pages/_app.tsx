import "nextra-theme-blog/style.css";
import Head from "next/head";

import "@/styles/main.css";
import "@/styles/gradient.css";

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
