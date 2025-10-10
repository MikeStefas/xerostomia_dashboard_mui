'use client';
//check if the user is logged in by checking his role (set in signin/ page.tsx)
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (role === '' && pathname !== '/') {
      router.replace('/');
    }
  }, [role, pathname, router]);

  if (role === '' && pathname !== '/') return null; 
  return (<>{children}</>);
}
