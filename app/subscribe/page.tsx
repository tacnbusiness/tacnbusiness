// pages/subscribe.tsx
import dynamic from 'next/dynamic';

const SubscribeClient = dynamic(() => import('../components/SubscribeClient'), {
  ssr: false,
});

export default function SubscribePage() {
  return <SubscribeClient />;
}
