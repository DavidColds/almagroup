'use client';
import ReactCookieBot from 'react-cookiebot';

export default function CookieBotClient({
  domainGroupId,
}: {
  domainGroupId: string;
}) {
  return <ReactCookieBot domainGroupId={domainGroupId} language='sv' />;
}
