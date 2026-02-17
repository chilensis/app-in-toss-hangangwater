import { TDSMobileProvider } from '@toss/tds-mobile';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import IndexPage from './pages/IndexPage';

function isAITEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return !!(window as unknown as { __appsInTossBridge?: unknown }).__appsInTossBridge;
  } catch {
    return false;
  }
}

const defaultUserAgent = {
  isAndroid: false,
  isIOS: false,
  fontScale: 100,
  fontA11y: undefined as undefined,
};

export default function App() {
  if (isAITEnvironment()) {
    return (
      <TDSMobileAITProvider>
        <IndexPage />
      </TDSMobileAITProvider>
    );
  }
  return (
    <TDSMobileProvider userAgent={defaultUserAgent}>
      <IndexPage />
    </TDSMobileProvider>
  );
}
