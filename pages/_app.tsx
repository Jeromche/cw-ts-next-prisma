import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ShiftProvider } from "../store";

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ShiftProvider>
        <Component {...pageProps} />
      </ShiftProvider>
    </SessionProvider>
  )
}

export default MyApp
