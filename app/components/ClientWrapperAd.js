"use client";
import { usePathname } from 'next/navigation';
import { AdComponent } from './AdComponent';

export default function ClientWrapper() {
  const pathname = usePathname();
  return <AdComponent adSlot="f08c47fec0942fa0" key={pathname} />;
}
