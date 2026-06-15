import { buildMetadata } from '@/components/seo/metadata';
import { QuoteView } from '@/components/views/QuoteView';
import { getForms, getStates } from '@/lib/content/repositories/site-content';

export const metadata = buildMetadata({
  title: 'Free Solar Quote',
  description: 'Multi-step solar quote with STC estimate and draft auto-save.',
  path: '/quote',
});

export default async function QuotePage() {
  const [forms, states] = await Promise.all([getForms(), getStates()]);
  return (
    <main id="main">
      <QuoteView forms={forms} states={states} />
    </main>
  );
}
