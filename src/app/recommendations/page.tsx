
'use client';

import { useState } from 'react';
import { getEventRecommendations } from '@/ai/flows/event-recommendations';
import { pastEventPurchases } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lightbulb, CheckCircle2, LogIn } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);
    try {
      const result = await getEventRecommendations({ pastEventPurchases });
      setRecommendations(result.recommendedEvents);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
     <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
       <Loader2 className="h-8 w-8 animate-spin" />
     </div>
   );
  }

  if (isAuthenticated && isAdmin) {
    router.replace('/access-denied');
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
          You need to be logged in to get event recommendations.
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
      <div className="mx-auto max-w-3xl text-center">
        <Lightbulb className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight font-headline">Discover Events Just For You</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our AI analyzes your past events to suggest new experiences you'll love. Click the button below to get your personalized recommendations.
        </p>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button onClick={handleGetRecommendations} disabled={loading} size="lg">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Generate Recommendations
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8 max-w-3xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6 font-headline">Here are your recommendations:</h2>
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                    <span className="text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
