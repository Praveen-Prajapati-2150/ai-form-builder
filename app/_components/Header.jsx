'use client';
// import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import { Button } from '../@/components/ui/button';
// import { Button } from '../../components/ui/button';
import { Button } from '../components/ui/button';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  return !path.includes('aiform') && (
    <div className="h-[10vh] p-5 border-b shadow-sm flex items-center justify-between">
      <div>
        <Image src={'/logo.svg'} alt="logo" width={100} height={45} />
      </div>

      {isSignedIn ? (
        <div className="flex align-center gap-5">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <SignInButton>
          <Button>Get Stared</Button>
        </SignInButton>
      )}
      {/* Header */}
    </div>
  );
};

export default Header;
