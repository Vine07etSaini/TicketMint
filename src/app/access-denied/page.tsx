
'use client';

import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 text-center">
      <ShieldAlert className="h-16 w-16 text-destructive" />
      <h2 className="text-2xl font-semibold">Access Denied</h2>
      <p className="text-muted-foreground">
        You do not have permission to view this page.
      </p>
      <Button asChild>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  );
}
