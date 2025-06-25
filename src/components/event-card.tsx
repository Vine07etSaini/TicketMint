
'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, QrCode } from 'lucide-react';
import type { Event } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EventCardProps {
  event: Event;
}

function TicketPurchaseDialog({ event, open }: { event: Event; open: boolean }) {
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (open) {
      // Generate ID only when the dialog is opened to ensure client-side execution
      setTicketId(`TIX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    }
  }, [open]);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Purchase Successful!</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Your NFT ticket for <strong>{event.name}</strong> has been minted.
        </p>
      </DialogHeader>
      <div className="py-4">
        <div className="bg-card border-2 border-dashed border-primary/50 rounded-xl p-6 flex flex-col gap-6 text-card-foreground shadow-lg">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Event</p>
              <h3 className="font-bold text-xl font-headline leading-tight">{event.name}</h3>
            </div>
            <QrCode className="w-20 h-20 text-foreground flex-shrink-0"/>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
              <p className="font-medium">{event.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-primary/50 -mx-6 my-0"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Ticket ID</p>
              <p className="font-mono text-sm">{ticketId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Price</p>
              <p className="font-semibold text-lg text-primary">{event.price}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}


export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast();
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      description: `Your ticket for ${event.name} is ready.`,
    });
    setIsDialogOpen(true);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
      
      <TicketPurchaseDialog event={event} open={isDialogOpen} />
    </Dialog>
  );
}
