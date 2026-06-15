'use client';

import type { HomePageContent, StateData } from '@/lib/content/types';
import { useSolarCalculatorPreview } from '@/hooks/useSolarCalculator';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

export function CalcPreview({
  content,
  states,
}: {
  content: HomePageContent['calcPreview'];
  states: Record<string, StateData>;
}) {
  const { inputs, formatted, update, compute } = useSolarCalculatorPreview(states);

  return (
    <section className="calc-preview">
      <Container>
        <div className="calc-preview__inner">
          <Reveal>
            <SectionHead eyebrow={content.eyebrow} title={content.title} lede={content.lede} />
            <a href={content.cta.href} className="btn btn--sky">
              {content.cta.label}
            </a>
          </Reveal>
          <Reveal delay={1}>
            <div className="calc-box" data-calc-preview>
              <div className="form__field">
                <label className="form__label" htmlFor="prev-state">
                  State
                </label>
                <select
                  id="prev-state"
                  className="form__select"
                  data-calc-state
                  value={inputs.stateCode}
                  onChange={(e) => update({ stateCode: e.target.value })}
                >
                  {Object.entries(states).map(([code, st]) => (
                    <option key={code} value={code}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="prev-size">
                  System size (kW)
                </label>
                <input
                  id="prev-size"
                  type="number"
                  min={3}
                  max={30}
                  step={0.1}
                  className="form__input"
                  value={inputs.sizeKw}
                  onChange={(e) => update({ sizeKw: Number(e.target.value) })}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="prev-rate">
                  Electricity rate (¢/kWh)
                </label>
                <input
                  id="prev-rate"
                  type="number"
                  min={15}
                  max={45}
                  step={0.1}
                  className="form__input"
                  value={inputs.rate}
                  onChange={(e) => update({ rate: Number(e.target.value) })}
                />
              </div>
              <button className="btn btn--primary btn--block" type="button" data-action="calc-preview" onClick={() => compute()}>
                Estimate savings
              </button>
              {formatted && (
                <div className="calc-box__result" data-calc-preview-result>
                  <div className="calc-box__result-row">
                    <span>Annual generation</span>
                    <span data-out-gen>{formatted.generation}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Annual savings</span>
                    <span data-out-save>{formatted.savings}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>STC rebate (est.)</span>
                    <span data-out-stc>{formatted.stcRebate}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Simple payback</span>
                    <span data-out-pay>{formatted.payback}</span>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
