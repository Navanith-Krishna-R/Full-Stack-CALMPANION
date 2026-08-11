import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'CALMPANION — A calmer space for your mental wellbeing',
    template: '%s · CALMPANION',
  },
  description:
    'CALMPANION is a mental wellness companion offering self-assessments, professional appointments, and resources in a calm, trustworthy space.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <UserProvider>{children}</UserProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
