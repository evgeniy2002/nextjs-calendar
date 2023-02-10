import { ContextWrapper } from '@/context/ContextWrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
}
