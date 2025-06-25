import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

type NextImageProps = {
  useSkeleton?: boolean;
  classNames?: {
    image?: string;
    blur?: string;
  };
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout?: never; width: string | number; height: string | number } // Ensure we avoid 'fill'
) &
  ImageProps;

export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  classNames,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete',
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={cn(
          'w-full h-full object-cover', // Ensures full coverage without stretching
          classNames?.image,
          status === 'loading' && cn('animate-pulse', classNames?.blur),
        )}
        src={src}
        priority={true}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
}
