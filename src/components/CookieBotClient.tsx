'use client';
import Script from 'next/script';
import React from 'react';

// Make sure NEXT_PUBLIC_COOKIEBOT_DOMAIN_GROUP_ID is set in your .env file
const domainGroupId = process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_GROUP_ID;

export default function CookieBotClient() {
  if (!domainGroupId) return null;

  return (
    <Script
      id='cookiebot-script'
      src={`https://consent.cookiebot.com/uc.js?cbid=${domainGroupId}&culture=sv`}
      strategy='afterInteractive'
    />
  );
}
