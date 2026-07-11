import { Star } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { reviews } from '@/lib/site-data';

export const metadata = {
  title: 'Reviews',
  description: 'Client review highlights for Rayiss electrical and solar projects.',
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Consistent trust"
        highlight="across job types"
        description="Feedback from residential and commercial clients is a core trust signal in the Rayiss conversion journey."
        ctaHref="/contact"
        ctaLabel="Request a callback"
      />

      <SectionWrap
        eyebrow="Client feedback"
        title="What customers say after delivery."
        description="These review highlights sit alongside projects and service pages to keep proof visible throughout the site journey."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review.name} style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 24 }}>
              <div className="flex mb-5" aria-label={`${review.rating} star rating`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={`${review.name}-${index}`} size={15} fill="#FF5B1F" stroke="#FF5B1F" />
                ))}
              </div>
              <p className="serif-i" style={{ fontSize: 22, lineHeight: 1.5, marginBottom: 18 }}>
                "{review.quote}"
              </p>
              <div className="pt-4 border-t hairline">
                <div className="font-medium text-sm">{review.name}</div>
                <div className="text-xs text-neutral-500 mt-1">{review.context}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrap>

      <CtaStrip
        title="Ready to plan your own project?"
        description="Use the contact form to share your requirements and get a practical next-step response."
      />
    </>
  );
}
