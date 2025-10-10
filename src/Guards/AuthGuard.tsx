'use client';
import { RoleContext } from '@/app/layout';
import { getRoleFromCookie } from '@/tokenSessionFuncs/getRoleFromCookie';
//check if the user is logged in by checking his role (set in signin/ page.tsx)
import { useRouter, usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function AuthGuard({ children, role }: { children: React.ReactNode; role: string }) {
  const router = useRouter();
  const pathname = usePathname();

  //bring global role
  const context = useContext(RoleContext);
    if (!context) {
      throw new Error("Error role context not found");
    }
    const { setRole } = context;


  //on RELOAD check role and redirect if missing
  useEffect(() => {
    const manageRole = async () => {
            const role = await getRoleFromCookie();
            setRole(role);
            if (role === '' && pathname !== '/') {
              router.replace('/');
          }
          }
          manageRole();
  }, []);

  if (role === '' && pathname !== '/') return null; 
  return (<>{children}</>);
}
