import React from 'react';

interface AssetProps {
  url: string;
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
  | 'mov';

const Asset: React.FC<AssetProps> = ({ url, alt = '', ...props }) => {
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
        <source src={url} type={`video/${fileExtension}`} />
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
