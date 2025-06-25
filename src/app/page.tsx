'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { EventCard } from '@/components/event-card';
import { events as initialEvents, mostSoldOutEvents, type Event } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

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
    <div>
      <div className="w-full mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 font-headline pt-8">Most Popular Events</h2>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {mostSoldOutEvents.map((event) => (
              <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                      <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          className="object-cover"
                          data-ai-hint="popular event"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-lg leading-tight">{event.name}</h3>
                          <p className="text-white/80 text-sm mt-1">{event.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex left-4" />
          <CarouselNext className="hidden sm:inline-flex right-4" />
        </Carousel>
      </div>

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
    </div>
  );
}
