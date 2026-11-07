import { useState } from 'react';

/** Image with a branded fallback so a failed photo never shows a broken icon. */
export default function SmartImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <span>R</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
