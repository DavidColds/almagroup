'use client'; // Error components must be Client Components

import * as React from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-gray-900'>
          <h1 className='mt-8 text-4xl md:text-6xl'>
            Oops, something went wrong!
          </h1>
          Try again
        </div>
      </section>
    </main>
  );
}
