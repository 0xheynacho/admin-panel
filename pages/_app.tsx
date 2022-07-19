import { ReactElement, ReactNode, useEffect } from "react";
import { FirebaseAppProvider } from "reactfire";
import type { AppProps as BasicAppProps } from "next/app";
import Head from "next/head";
import { NextPage as BasicNextPage } from "next";

import ThemeConfig from "../common/theme";
import ContextProvider from "../components/Unknown/Context";

const firebaseConfig = {
  apiKey: "AIzaSyAbbl30V0tkG9FxqBSHl6KFUzCmvvQ6dWE",
  authDomain: "presupuesto-d02a9.firebaseapp.com",
  projectId: "presupuesto-d02a9",
  storageBucket: "presupuesto-d02a9.appspot.com",
  messagingSenderId: "749510472611",
  appId: "1:749510472611:web:db915fd345b036a3262016",
  measurementId: "G-3HTZ93VCW2"
};

type NextPage = BasicNextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppProps = BasicAppProps & {
  Component: NextPage;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeConfig>
        <ContextProvider>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </ContextProvider>
      </ThemeConfig>
    </FirebaseAppProvider>
  );
}
