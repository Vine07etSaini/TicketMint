
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { events as initialEvents, type Event } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

// Form schema for event creation/editing
const eventFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  date: z.string().min(1, { message: 'Date is required.' }),
  location: z.string().min(3, { message: 'Location is required.' }),
  price: z.string().min(1, { message: 'Price is required.' }),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

// Dialog component for creating a new event
function CreateEventDialog({ onEventCreated, children }: { onEventCreated: (data: EventFormValues) => void; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: '',
      date: '',
      location: '',
      price: '',
      image: '',
    },
  });

  const onSubmit = (data: EventFormValues) => {
    onEventCreated(data);
    form.reset();
    setIsOpen(false);
    toast({
      title: 'Event Created',
      description: 'The new event has been successfully created.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details for your new event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Cosmic Gate Tour" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dec 15, 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. The Warehouse, New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0.05 ETH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Dialog component for editing an existing event
function EditEventDialog({
  event,
  onOpenChange,
  onEventUpdated,
}: {
  event: Event | null;
  onOpenChange: (open: boolean) => void;
  onEventUpdated: (id: number, data: EventFormValues) => void;
}) {
  const { toast } = useToast();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
  });

  useEffect(() => {
    if (event) {
      form.reset(event);
    }
  }, [event, form]);

  if (!event) return null;

  const onSubmit = (data: EventFormValues) => {
    onEventUpdated(event.id, data);
    toast({
      title: 'Event Updated',
      description: 'The event has been successfully updated.',
    });
  };

  return (
    <Dialog open={!!event} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Make changes to your event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();
  const { isLoading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

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
  
  const persistEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents);
    try {
      localStorage.setItem('ticketmint-events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error("Failed to save events to local storage:", error);
      toast({
        title: "Save Error",
        description: "Could not save event changes.",
        variant: "destructive"
      });
    }
  };

  const handleCreate = (data: EventFormValues) => {
    const newEvent: Event = {
      id: Date.now(),
      ...data,
      image: data.image || 'https://placehold.co/600x400.png',
    };
    persistEvents([...events, newEvent]);
  };

  const handleUpdate = (eventId: number, data: EventFormValues) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, ...data, image: data.image || 'https://placehold.co/600x400.png' }
        : event
    );
    persistEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleDelete = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    persistEvents(updatedEvents);
    toast({
      title: 'Event Deleted',
      description: `Event with ID ${eventId} has been removed.`,
    });
  };

  const handleEdit = (event: Event) => {
     setEditingEvent(event);
  }

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.replace('/login');
    return (
      <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    router.replace('/access-denied');
    return (
      <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Manage Events</h1>
        <CreateEventDialog onEventCreated={handleCreate}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </CreateEventDialog>
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
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
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
       <EditEventDialog
        event={editingEvent}
        onEventUpdated={handleUpdate}
        onOpenChange={(open) => {
          if (!open) {
            setEditingEvent(null);
          }
        }}
      />
    </div>
  );
}

    