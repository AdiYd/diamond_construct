import React, { useEffect, useState } from 'react';
import heic2any from 'heic2any';

interface AssetProps {
  src: string;
  alt?: string;
  [key: string]: unknown; // Allow other props to be passed
}

type FileExtension =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'bmp'
  | 'svg'
  | 'webp'
  | 'mp4'
  | 'webm'
  | 'ogg'
  | 'heic'
  | 'HEIC'
  | 'mov';

const Asset: React.FC<AssetProps> = ({ src, alt = '', ...props }) => {
  const [, setImageSource] = useState<string | null>(null);
  const [urls, setUrl] = useState<string | null>(src);
  useEffect(() => {
    setUrl(src);
  }, [src, urls]);
  let url = urls;
  useEffect(() => {
    const loadImage = async () => {
      if (url && url.toLowerCase().endsWith('.heic')) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          const convertedBlob = await heic2any({
            blob: blob,
            toType: 'image/jpeg', // Convert to JPEG
          });
          console.log('HEIC converted to JPEG', convertedBlob);
          if (convertedBlob instanceof Blob) {
            setImageSource(URL.createObjectURL(convertedBlob));
          } else {
            console.error('Failed to convert HEIC to JPEG');
            setImageSource(url); // Fallback to original URL
          }
        } catch (error) {
          console.error('Error converting HEIC:', error);
          setImageSource(url); // Fallback to original URL
        }
      } else {
        setImageSource(url);
      }
    };

    loadImage();
  }, [url]);

  if (!url) {
    return null;
  }

  // Check if url starts with 'http' or 'https'
  if (!url.startsWith('http') && !url.startsWith('https')) {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
  }

  const fileExtension = url.split('.').pop()?.toLowerCase() as FileExtension | undefined;
  const getMimeType = (ext: string): string => {
    switch (ext.toLowerCase()) {
      case 'mov':
        return 'video/quicktime';
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return `video/${ext}`;
    }
  };
  if (!fileExtension) {
    return null;
  }

  //   const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
  if (videoExtensions.includes(fileExtension) || props.video) {
    if (props.imageOnly) {
      return null;
    }
    return (
      <video autoPlay loop muted playsInline controls width="100%" {...props}>
        <source src={url} type={getMimeType(fileExtension)} />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return (
      <img
        src={url}
        alt={alt}
        style={{
          width: 'inherit',
          height: 'inherit',
          objectFit: 'cover',
        }}
        {...props}
      />
    );
  }
};

export default Asset;
