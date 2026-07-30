import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Provider Imports
import { QueryProvider } from '@/shared/providers/QueryProvider';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { ToastProvider } from '@/shared/providers/ToastProvider';
import { ModalProvider } from '@/shared/providers/ModalProvider';

// Shell Layout
import { AppShell } from '@/shared/components/layout/AppShell';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CareerOS AI - Premium Career Operating System',
  description: 'Increase your hiring probability with AI-powered Resume Intelligence, ATS matching, roadmap planning, and mock interviews.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>
                <ModalProvider>
                  <AppShell>{children}</AppShell>
                </ModalProvider>
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
