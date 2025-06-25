import Image from 'next/image';
import React from 'react';

export default function CookiePolicyPage() {
  return (
    <main className='max-w-3xl lg:pt-48 mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-6'>
        Integritetspolicy & Cookies för Almagrupp
      </h1>
      <p className='mb-2 text-sm text-gray-500'>
        Senast uppdaterad: 2025-06-24
      </p>
      <div className='w-full flex justify-center mb-8'>
        <div
          className='relative'
          style={{ height: 560, width: '100%', maxWidth: '1200px' }}
        >
          <Image
            src='/images/cookies.jpg'
            alt='Cookies'
            style={{
              height: 560,
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div className='absolute inset-0 bg-black/30 rounded-[12px]'></div>
        </div>
      </div>

      <h2 className='text-xl font-semibold mt-8 mb-2'>1. Allmänt</h2>
      <p className='mb-4'>
        Vi på Almagrupp (organisationsnummer XXXXXX-XXXX) värnar om din
        personliga integritet. Denna policy beskriver hur vi samlar in, använder
        och skyddar dina personuppgifter samt hur vi använder cookies på vår
        webbplats.
      </p>

      <h2 className='text-xl font-semibold mt-8 mb-2'>
        2. Vilka uppgifter samlar vi in?
      </h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>
          <strong>Personuppgifter du själv lämnar:</strong> namn, telefonnummer,
          e-postadress, uppgifter som du fyller i formulär.
        </li>
        <li>
          <strong>Automatiskt insamlade data:</strong> IP-adress, typ av enhet,
          webbläsarinformation, besökta sidor, tid spenderad på sidan (via
          Google Analytics).
        </li>
      </ul>

      <h2 className='text-xl font-semibold mt-8 mb-2'>
        3. Syfte med insamlingen
      </h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>Svara på dina förfrågningar och offerter</li>
        <li>
          Tillhandahålla och förbättra våra tjänster inom städning och bygg
        </li>
        <li>
          Analysera webbtrafik och förbättra användarupplevelsen (via Google
          Analytics)
        </li>
        <li>Följa gällande lagstiftning</li>
      </ul>

      <h2 className='text-xl font-semibold mt-8 mb-2'>4. Cookies</h2>
      <p className='mb-4'>
        Vi använder cookies för att förbättra webbplatsens funktion och för att
        analysera trafik. En cookie är en liten textfil som lagras i din
        webbläsare.
      </p>
      <ul className='list-disc pl-6 mb-4'>
        <li>
          <strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska
          fungera korrekt och kan inte stängas av i våra system.
        </li>
        <li>
          <strong>Analyscookies:</strong> Via Google Analytics för att förstå
          hur besökare använder sidan och samla in anonym statistik. Detta
          hjälper oss att förbättra innehåll och funktionalitet.
        </li>
        <li>
          <strong>Marknadsföringscookies:</strong> Kan användas för att visa
          relevanta annonser via tredjepartstjänster (t.ex. Google Ads, Facebook
          Pixel) om sådana är aktiverade.
        </li>
        <li>
          <strong>Inställningscookies:</strong> Används för att komma ihåg dina
          val och inställningar på webbplatsen.
        </li>
      </ul>
      <p className='mb-4'>
        Om du inte vill att cookies lagras kan du justera detta i din
        webbläsares inställningar. Du kan även återkalla eller ändra ditt
        samtycke till cookies via vår cookie-banner. Tänk på att vissa
        funktioner på webbplatsen kan sluta fungera om du blockerar cookies.
      </p>

      <h2 className='text-xl font-semibold mt-8 mb-2'>
        5. Delning av personuppgifter
      </h2>
      <p className='mb-4'>
        Vi säljer aldrig dina personuppgifter. Vi kan dela uppgifter med:
      </p>
      <ul className='list-disc pl-6 mb-4'>
        <li>Tekniska leverantörer (t.ex. webbhotell)</li>
        <li>Analystjänster (Google Analytics)</li>
      </ul>
      <p className='mb-4'>Alla leverantörer vi använder följer GDPR.</p>

      <h2 className='text-xl font-semibold mt-8 mb-2'>6. Dina rättigheter</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>Tillgång till dina personuppgifter</li>
        <li>Rättelse av felaktiga uppgifter</li>
        <li>Radering av uppgifter (”rätten att bli glömd”)</li>
        <li>Begränsning av behandling</li>
        <li>Dataportabilitet</li>
        <li>
          Rätt att invända mot eller begränsa behandlingen av dina uppgifter
        </li>
        <li>Rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY)</li>
      </ul>
      <p className='mb-4'>
        Kontakta oss på{' '}
        <a href='mailto:info@almagrupp.se' className='underline text-blue-600'>
          info@almagrupp.se
        </a>{' '}
        för att utöva dina rättigheter eller om du har frågor om vår
        integritetspolicy.
      </p>
    </main>
  );
}
