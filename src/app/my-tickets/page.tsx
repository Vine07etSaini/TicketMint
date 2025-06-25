
'use client';

import { TicketCard } from '@/components/ticket-card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { myTickets } from '@/lib/data';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function MyTicketsPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
     <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
       <Loader2 className="h-8 w-8 animate-spin" />
     </div>
   );
 }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-semibold">Please Log In</h2>
        <p className="text-muted-foreground">
          You need to be logged in to view your NFT tickets.
        </p>
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center font-headline">My NFT Tickets</h1>
      {myTickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          You don't have any tickets yet.
        </div>
      )}
    </div>
  );
}
