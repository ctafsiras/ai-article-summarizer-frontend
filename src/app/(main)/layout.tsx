import type React from 'react';
import { Header } from '@/components/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4">{children}</main>
    </div>
  );
}
