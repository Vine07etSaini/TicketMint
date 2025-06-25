'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/event-card';
import { events as initialEvents, type Event } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This timeout is to simulate a network request.
    const timer = setTimeout(() => {
      try {
        const cachedEvents = localStorage.getItem('ticketmint-events');
        if (cachedEvents) {
          setEvents(JSON.parse(cachedEvents));
        } else {
          setEvents(initialEvents);
          localStorage.setItem('ticketmint-events', JSON.stringify(initialEvents));
        }
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents(initialEvents);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-center font-headline">Upcoming Events</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
