'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, QrCode } from 'lucide-react';
import type { Ticket } from '@/lib/data';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 w-full">
        <Image
          src={ticket.image}
          alt={ticket.name}
          fill
          className="object-cover"
          data-ai-hint="event ticket"
        />
        <div className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-1 text-xs font-mono text-white backdrop-blur-sm">
          ID: {ticket.ticketId}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{ticket.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{ticket.date}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{ticket.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <QrCode className="mr-2 h-4 w-4" />
          View Ticket
        </Button>
      </CardFooter>
    </Card>
  );
}
