import { buildMetadata } from '@/components/seo/metadata';
import { CalculatorView } from '@/components/views/CalculatorView';
import { getForms, getStates } from '@/lib/content/repositories/site-content';

export const metadata = buildMetadata({
  title: 'Solar Savings Calculator',
  description: 'Model STC rebates, annual generation and payback for Australian solar systems.',
  path: '/calculator',
});

export default async function CalculatorPage() {
  const [states, forms] = await Promise.all([getStates(), getForms()]);
  return (
    <main id="main">
      <CalculatorView states={states} forms={forms} />
    </main>
  );
}
