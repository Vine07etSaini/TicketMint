
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight font-headline">Log In</CardTitle>
          <CardDescription>
            Choose your role to access the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button size="lg" onClick={() => login('user')}>
            <User className="mr-2 h-5 w-5" />
            Log In as User
          </Button>
          <Button size="lg" variant="secondary" onClick={() => login('admin')}>
            <Shield className="mr-2 h-5 w-5" />
            Log In as Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
