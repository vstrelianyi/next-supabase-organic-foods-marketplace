import type { Metadata, } from 'next';
import './globals.css';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { Roboto, } from 'next/font/google';
const roboto = Roboto ( {
  weight: [ '300', '400', '600', '700', ],
  style: [ 'normal', 'italic', ],
  subsets: [ 'latin', ],
  display: 'swap',
} );

export const metadata: Metadata = {
  title: 'Organic Foods Marketplace',
  description: 'Simple online marketplace for organic foods',
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={ roboto.className }
      >
        <body className="bg-background layout-main">
          { children }
        </body>
      </html>
    </ClerkProvider>
  );
}
