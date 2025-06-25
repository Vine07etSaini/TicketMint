export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price: string;
  image: string;
}

export interface Ticket extends Event {
  ticketId: string;
}

export const events: Event[] = [
  {
    id: 1,
    name: 'Cosmic Gate: Interstellar Tour',
    date: 'Dec 15, 2024',
    location: 'The Warehouse, New York',
    price: '0.05 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 2,
    name: 'Techno Titans Festival',
    date: 'Jan 20, 2025',
    location: 'CyberPark, Berlin',
    price: '0.10 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 3,
    name: 'Solasta Music & Arts',
    date: 'Feb 5, 2025',
    location: 'The Oasis, Miami',
    price: '0.08 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 4,
    name: 'NFT Vision Hackathon',
    date: 'Mar 1, 2025',
    location: 'Metropolis Center, Online',
    price: 'Free',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 5,
    name: 'Aurora Borealis Light Show',
    date: 'Mar 18, 2025',
    location: 'Arctic Dome, Iceland',
    price: '0.15 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 6,
    name: 'Deep House Sunset Cruise',
    date: 'Apr 2, 2025',
    location: 'Ibiza Harbor',
    price: '0.07 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 7,
    name: 'Pixel Perfect: Digital Art Fair',
    date: 'Apr 22, 2025',
    location: 'The Canvas, London',
    price: '0.03 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 8,
    name: 'Jazz in the Park',
    date: 'May 10, 2025',
    location: 'Central Park, New York',
    price: '0.02 ETH',
    image: 'https://placehold.co/600x400.png',
  },
];

export const mostSoldOutEvents: Event[] = [
  {
    id: 2,
    name: 'Techno Titans Festival',
    date: 'Jan 20, 2025',
    location: 'CyberPark, Berlin',
    price: '0.10 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 5,
    name: 'Aurora Borealis Light Show',
    date: 'Mar 18, 2025',
    location: 'Arctic Dome, Iceland',
    price: '0.15 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 1,
    name: 'Cosmic Gate: Interstellar Tour',
    date: 'Dec 15, 2024',
    location: 'The Warehouse, New York',
    price: '0.05 ETH',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 6,
    name: 'Deep House Sunset Cruise',
    date: 'Apr 2, 2025',
    location: 'Ibiza Harbor',
    price: '0.07 ETH',
    image: 'https://placehold.co/600x400.png',
  },
   {
    id: 3,
    name: 'Solasta Music & Arts',
    date: 'Feb 5, 2025',
    location: 'The Oasis, Miami',
    price: '0.08 ETH',
    image: 'https://placehold.co/600x400.png',
  },
];

export const myTickets: Ticket[] = [
  {
    id: 101,
    name: 'Crypto Wave Summit',
    date: 'Nov 1, 2024',
    location: 'Virtual Conference Hall',
    price: '0.04 ETH',
    image: 'https://placehold.co/600x400.png',
    ticketId: 'CWS-2024-A1B2',
  },
  {
    id: 102,
    name: 'Indie Rock Revival',
    date: 'Oct 25, 2024',
    location: 'The Garage, London',
    price: '0.03 ETH',
    image: 'https://placehold.co/600x400.png',
    ticketId: 'IRR-2024-C3D4',
  },
];

export const pastEventPurchases: string[] = [
  'Crypto Wave Summit - A conference about the future of blockchain technology.',
  'Indie Rock Revival - A concert featuring up and coming indie rock bands.',
  'Techno Titans Festival - A weekend long electronic music festival with a focus on techno.',
];
