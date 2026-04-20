"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Motion";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Testimonial, type TestimonialData } from "@/components/sections/Testimonial";
import { cn } from "@/lib/utils";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const googlePlaceId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
const googlePlaceSearchText = process.env.NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT;

type GoogleReviewResult = {
  author_name?: string;
  author_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
};

type GooglePlaceResult = {
  name?: string;
  place_id?: string;
  rating?: number;
  reviews?: GoogleReviewResult[];
  url?: string;
  user_ratings_total?: number;
};

type GooglePlacesService = {
  findPlaceFromQuery: (
    request: { fields: string[]; query: string },
    callback: (results: GooglePlaceResult[] | null, status: string) => void
  ) => void;
  getDetails: (
    request: { fields: string[]; placeId: string },
    callback: (result: GooglePlaceResult | null, status: string) => void
  ) => void;
};

type GoogleMapsWindow = Window &
  typeof globalThis & {
    __growrixGoogleMapsPromise?: Promise<void>;
    google?: {
      maps?: {
        places?: {
          PlacesService: new (element: Element) => GooglePlacesService;
        };
      };
    };
  };

type LiveReview = TestimonialData & {
  authorUrl?: string;
  id: string;
  publishedLabel?: string;
  rating?: number;
  source?: string;
};

type PlaceSummary = {
  name: string;
  profileUrl?: string;
  rating?: number;
  totalRatings?: number;
  writeReviewUrl?: string;
};

type GoogleReviewsProps = {
  align?: "left" | "center";
  className?: string;
  description?: string;
  displayMode?: "grid" | "single";
  eyebrow?: string;
  limit?: number;
  showSummary?: boolean;
  title: string;
};

function getGoogleMapsWindow(): GoogleMapsWindow {
  return window as GoogleMapsWindow;
}

function loadGoogleMaps(apiKey: string): Promise<void> {
  const mapsWindow = getGoogleMapsWindow();
  if (mapsWindow.google?.maps?.places) {
    return Promise.resolve();
  }
  if (mapsWindow.__growrixGoogleMapsPromise) {
    return mapsWindow.__growrixGoogleMapsPromise;
  }

  mapsWindow.__growrixGoogleMapsPromise = new Promise<void>((resolve, reject) => {
    const onLoad = () => {
      if (mapsWindow.google?.maps?.places) {
        resolve();
        return;
      }
      reject(new Error("Google Maps Places library was not available after script load."));
    };

    const onError = () => {
      reject(new Error("Google Maps script failed to load."));
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-maps-loader="growrix"]');
    if (existingScript) {
      if (mapsWindow.google?.maps?.places) {
        resolve();
        return;
      }
      existingScript.addEventListener("load", onLoad, { once: true });
      existingScript.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "growrix";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&loading=async&v=weekly`;
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.head.appendChild(script);
  });

  return mapsWindow.__growrixGoogleMapsPromise;
}

function createPlacesService(element: Element): GooglePlacesService {
  const PlacesService = getGoogleMapsWindow().google?.maps?.places?.PlacesService;
  if (!PlacesService) {
    throw new Error("Google Places service is unavailable.");
  }
  return new PlacesService(element);
}

function resolvePlaceId(service: GooglePlacesService, searchText: string): Promise<string> {
  return new Promise((resolve, reject) => {
    service.findPlaceFromQuery({ fields: ["place_id"], query: searchText }, (results, status) => {
      const placeId = results?.[0]?.place_id;
      if (status === "OK" && placeId) {
        resolve(placeId);
        return;
      }
      reject(new Error(`Could not resolve a Google Place ID for \"${searchText}\".`));
    });
  });
}

function fetchPlaceDetails(service: GooglePlacesService, placeId: string): Promise<GooglePlaceResult> {
  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        fields: ["name", "rating", "reviews", "url", "user_ratings_total"],
        placeId,
      },
      (result, status) => {
        if (status === "OK" && result) {
          resolve(result);
          return;
        }
        reject(new Error(`Google Place details request failed with status ${status}.`));
      }
    );
  });
}

function toWriteReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

function normalizeReview(review: GoogleReviewResult): LiveReview | null {
  const quote = review.text?.trim();
  if (!quote) {
    return null;
  }

  const author = review.author_name?.trim() || "Google reviewer";
  const reviewId = [author, review.time ?? "undated", quote.slice(0, 48)].join("-");

  return {
    author,
    authorUrl: review.author_url,
    id: reviewId,
    publishedLabel: review.relative_time_description,
    quote,
    rating: typeof review.rating === "number" ? review.rating : undefined,
    role: "Google review",
    source: "Google",
  };
}

function renderStars(rating: number, sizeClassName: string) {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.round(rating);
    return (
      <StarIcon
        key={`${rating}-${index}`}
        className={cn(sizeClassName, filled ? "text-secondary" : "text-border-strong/45")}
      />
    );
  });
}

function ReviewsSkeleton({ displayMode, limit }: { displayMode: "grid" | "single"; limit: number }) {
  const skeletonCount = displayMode === "single" ? 1 : Math.max(1, Math.min(limit, 3));

  return (
    <div className={cn("mt-8", displayMode === "single" ? "space-y-4" : "grid gap-5 lg:grid-cols-3")}>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <Card key={index} className="min-h-64 animate-pulse">
          <div className="h-4 w-28 rounded-full bg-inset" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded-full bg-inset" />
            <div className="h-4 w-[92%] rounded-full bg-inset" />
            <div className="h-4 w-[80%] rounded-full bg-inset" />
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="size-10 rounded-full bg-inset" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 rounded-full bg-inset" />
              <div className="h-3 w-24 rounded-full bg-inset" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function GoogleReviews({
  align = "left",
  className,
  description,
  displayMode = "grid",
  eyebrow = "Google reviews",
  limit = 3,
  showSummary = true,
  title,
}: GoogleReviewsProps) {
  const serviceHostRef = useRef<HTMLDivElement>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [reviews, setReviews] = useState<LiveReview[]>([]);
  const [status, setStatus] = useState<"empty" | "error" | "loading" | "ready">("loading");
  const [summary, setSummary] = useState<PlaceSummary | null>(null);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      if (!googleMapsApiKey) {
        throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing.");
      }
      if (!googlePlaceId && !googlePlaceSearchText) {
        throw new Error("Set NEXT_PUBLIC_GOOGLE_PLACE_ID or NEXT_PUBLIC_GOOGLE_PLACE_SEARCH_TEXT.");
      }
      if (!serviceHostRef.current) {
        throw new Error("Google Places host element is unavailable.");
      }

      await loadGoogleMaps(googleMapsApiKey);
      const placesService = createPlacesService(serviceHostRef.current);
      const resolvedPlaceId = googlePlaceId ?? (await resolvePlaceId(placesService, googlePlaceSearchText!));
      const place = await fetchPlaceDetails(placesService, resolvedPlaceId);
      const nextReviews = (place.reviews ?? [])
        .map(normalizeReview)
        .filter((review): review is LiveReview => review !== null)
        .slice(0, displayMode === "single" ? 1 : limit);

      if (!active) {
        return;
      }

      setSummary({
        name: place.name || "Growrix OS",
        profileUrl: place.url,
        rating: typeof place.rating === "number" ? place.rating : undefined,
        totalRatings: typeof place.user_ratings_total === "number" ? place.user_ratings_total : undefined,
        writeReviewUrl: toWriteReviewUrl(resolvedPlaceId),
      });

      if (nextReviews.length === 0) {
        setReviews([]);
        setStatus("empty");
        return;
      }

      setReviews(nextReviews);
      setStatus("ready");
    }

    loadReviews().catch((error: unknown) => {
      if (!active) {
        return;
      }
      const message = error instanceof Error ? error.message : "Could not load live Google reviews.";
      setErrorText(message);
      setStatus("error");
    });

    return () => {
      active = false;
    };
  }, [displayMode, limit]);

  const totalRatingsLabel =
    typeof summary?.totalRatings === "number"
      ? new Intl.NumberFormat().format(summary.totalRatings)
      : null;

  return (
    <div className={className}>
      <div ref={serviceHostRef} className="h-0 w-0 overflow-hidden" aria-hidden />

      <SectionHeading eyebrow={eyebrow} title={title} description={description} align={align} />

      {showSummary && (status === "ready" || status === "empty") && summary && (
        <Reveal className="mt-8">
          <Card variant="inset" className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
                {summary.name}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {typeof summary.rating === "number" && (
                  <>
                    <span className="font-display text-4xl tracking-tight">{summary.rating.toFixed(1)}</span>
                    <span className="inline-flex items-center gap-1">{renderStars(summary.rating, "size-4")}</span>
                  </>
                )}
                {totalRatingsLabel && (
                  <span className="text-sm text-text-muted">
                    Based on {totalRatingsLabel} Google reviews
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {summary.profileUrl && (
                <LinkButton href={summary.profileUrl} variant="outline" target="_blank" rel="noreferrer">
                  View profile <ArrowUpRightIcon className="size-4" />
                </LinkButton>
              )}
              {summary.writeReviewUrl && (
                <LinkButton href={summary.writeReviewUrl} target="_blank" rel="noreferrer">
                  Leave a review <ArrowUpRightIcon className="size-4" />
                </LinkButton>
              )}
            </div>
          </Card>
        </Reveal>
      )}

      {status === "loading" && <ReviewsSkeleton displayMode={displayMode} limit={limit} />}

      {status === "error" && (
        <Reveal className="mt-8">
          <Card variant="outline">
            <p className="font-display text-xl tracking-tight">Live Google reviews could not be loaded.</p>
            <p className="mt-3 leading-7 text-text-muted">
              {errorText ?? "Check your Google Maps API setup."}
            </p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              Make sure the Google Maps JavaScript API and Places API are enabled, and keep the public key referrer-restricted to your website domain.
            </p>
          </Card>
        </Reveal>
      )}

      {status === "empty" && (
        <Reveal className="mt-8">
          <Card variant="inset">
            <p className="font-display text-xl tracking-tight">The Google profile is connected, but there are no public reviews to show yet.</p>
            <p className="mt-3 leading-7 text-text-muted">
              Once reviews appear on the business profile, this section will update automatically.
            </p>
          </Card>
        </Reveal>
      )}

      {status === "ready" && displayMode === "single" && reviews[0] && (
        <Reveal className="mt-8">
          <Testimonial data={reviews[0]} />
        </Reveal>
      )}

      {status === "ready" && displayMode === "grid" && (
        <RevealGroup className="mt-8 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {reviews.map((review) => (
            <RevealItem key={review.id} className="h-full">
              <Testimonial data={review} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}