'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, QrCode } from 'lucide-react';
import type { Ticket } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TicketCardProps {
  ticket: Ticket;
}

function TicketViewDialog({ ticket }: { ticket: Ticket }) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Your NFT Ticket</DialogTitle>
        <p className="text-sm text-muted-foreground">
          This is your ticket for <strong>{ticket.name}</strong>.
        </p>
      </DialogHeader>
      <div className="py-4">
        <div className="bg-card border-2 border-dashed border-primary/50 rounded-xl p-6 flex flex-col gap-6 text-card-foreground shadow-lg">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Event</p>
              <h3 className="font-bold text-xl font-headline leading-tight">{ticket.name}</h3>
            </div>
            <QrCode className="w-20 h-20 text-foreground flex-shrink-0"/>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
              <p className="font-medium">{ticket.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
              <p className="font-medium">{ticket.location}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-primary/50 -mx-6 my-0"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Ticket ID</p>
              <p className="font-mono text-sm">{ticket.ticketId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Price</p>
              <p className="font-semibold text-lg text-primary">{ticket.price}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            View Ticket
          </Button>
        </CardFooter>
      </Card>
      <TicketViewDialog ticket={ticket} />
    </Dialog>
  );
}
