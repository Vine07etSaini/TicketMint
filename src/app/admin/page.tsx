
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { events as initialEvents, type Event } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch this from your backend.
    // We'll use the local data and make it stateful to simulate updates.
    try {
      const cachedEvents = localStorage.getItem('ticketmint-events');
      if (cachedEvents) {
        setEvents(JSON.parse(cachedEvents));
      } else {
        setEvents(initialEvents);
      }
    } catch (error) {
        console.error("Failed to load events for admin page:", error);
        setEvents(initialEvents);
    }
  }, []);

  const handleDelete = (eventId: number) => {
    // This is a placeholder. In a real app, this would be an API call.
    setEvents(events.filter((event) => event.id !== eventId));
    toast({
      title: 'Event Deleted',
      description: `Event with ID ${eventId} has been removed.`,
    });
  };

  const handleEdit = (eventId: number) => {
     toast({
      title: 'Action Required',
      description: `Editing for event ID ${eventId} is not implemented yet.`,
    });
  }
  
  const handleCreate = () => {
    toast({
      title: 'Action Required',
      description: 'Creating a new event is not implemented yet.',
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Manage Events</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(event.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
