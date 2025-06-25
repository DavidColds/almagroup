'use client';
import Script from 'next/script';
import React from 'react';

const domainGroupId = '390e454c-d075-4ad2-84cd-04b1509fb29c';

export default function CookieBotClient() {
  return (
    <Script
      id='cookiebot-script'
      src={`https://consent.cookiebot.com/uc.js?cbid=${domainGroupId}&culture=sv`}
      strategy='afterInteractive'
    />
  );
}
