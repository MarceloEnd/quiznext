'use client';
import { useEffect } from 'react';

export default function AdSenseFeed ({ slot, style = { display: 'block', minHeight: '250px' } }) {
  useEffect(() => {
    // Check if adsbygoogle is ready, then push
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      // ONLY the publisher ID goes here, not the script URL
      data-ad-client="ca-pub-6486557001399248"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
