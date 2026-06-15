'use client';

import { useState } from 'react';
import type { FormsContent, PageContent, StateData } from '@/lib/content/types';
import { useRebateChecker } from '@/hooks/useRebateChecker';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

interface RebateCheckerViewProps {
  page: PageContent;
  forms: FormsContent;
  states: Record<string, StateData>;
}

export function RebateCheckerView({ page, forms, states }: RebateCheckerViewProps) {
  const { result, check } = useRebateChecker(states, forms.rebates);
  const [stateCode, setStateCode] = useState('NSW');
  const [size, setSize] = useState(6.6);
  const [battery, setBattery] = useState('no');
  const hero = page.hero ?? { title: page.title, lede: page.description };

  const handleCheck = () => {
    check(stateCode, size, battery === 'yes');
  };

  return (
    <>
      <PageHero title={hero.title} lede={hero.lede} breadcrumb={hero.breadcrumb ?? 'Rebates'} />
      <section className="content">
        <Container className="max-w-xl">
          <form data-rebate-checker aria-label="Rebate checker" onSubmit={(e) => e.preventDefault()}>
            <div className="form__field">
              <label className="form__label" htmlFor="r-state">
                State
              </label>
              <select
                className="form__select"
                id="r-state"
                name="state"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
              >
                {Object.entries(states).map(([code, st]) => (
                  <option key={code} value={code}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="r-size">
                System size (kW)
              </label>
              <input
                className="form__input"
                id="r-size"
                name="size"
                type="number"
                min={1}
                max={100}
                step={0.1}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="r-battery">
                Adding a battery?
              </label>
              <select
                className="form__select"
                id="r-battery"
                name="battery"
                value={battery}
                onChange={(e) => setBattery(e.target.value)}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <button className="btn btn--primary btn--block" type="button" data-action="rebate-check" onClick={handleCheck}>
              Check rebates
            </button>
          </form>
          <div className="rebate-result" data-rebate-result hidden={!result}>
            {result && (
              <>
                <p className="text-sm text-text-muted">Estimated federal STC rebate</p>
                <p className="rebate-result__amount">{result.stcAmount}</p>
                <p className="mt-4 text-sm">{result.stateMessage}</p>
              </>
            )}
          </div>
          <div className="info-box">
            <strong>{forms.rebates.infoBox.split(':')[0]}:</strong>
            {forms.rebates.infoBox.split(':').slice(1).join(':')}
          </div>
        </Container>
      </section>
    </>
  );
}
