
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import type { Event } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast();
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  const handleBuyTicket = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to purchase tickets.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }
    toast({
      title: 'Purchase Successful!',
      description: `You've purchased a ticket for ${event.name}.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 w-full">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
          data-ai-hint="music concert"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center font-semibold text-foreground">
          <Ticket className="mr-2 h-4 w-4 text-primary" />
          <span>{event.price}</span>
        </div>
      </CardContent>
      <CardFooter>
        {!isAdmin && (
            <Button className="w-full" onClick={handleBuyTicket}>
            Buy Ticket
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
