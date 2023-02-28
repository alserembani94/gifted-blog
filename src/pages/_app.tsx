import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { poppins } from "@component/utils/fonts";
import { theme } from "@component/utils/themes";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <main className={poppins.className}>
      <Head>
        <title>GIFT.ed</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}
