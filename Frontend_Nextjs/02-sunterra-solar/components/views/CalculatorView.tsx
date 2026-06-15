'use client';

import type { FormsContent, StateData } from '@/lib/content/types';
import { useSolarCalculator } from '@/hooks/useSolarCalculator';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

export function CalculatorView({
  states,
  forms,
}: {
  states: Record<string, StateData>;
  forms: FormsContent;
}) {
  const { inputs, formatted, update, compute } = useSolarCalculator(states, forms.calculator.defaultCost);

  return (
    <>
      <PageHero
        title="Solar Savings Calculator"
        lede="Model STC rebates, annual generation and payback using Australian zone factors and 2026 deeming period."
        breadcrumb="Calculator"
      />
      <section className="content">
        <Container className="split">
          <form
            className="calc-box"
            data-calculator
            aria-label="Solar savings calculator"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form__field">
              <label className="form__label" htmlFor="calc-state">
                State / territory
              </label>
              <select
                className="form__select"
                id="calc-state"
                name="state"
                value={inputs.stateCode}
                onChange={(e) => {
                  update({ stateCode: e.target.value });
                  compute({ stateCode: e.target.value });
                }}
              >
                {Object.entries(states).map(([code, st]) => (
                  <option key={code} value={code}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="calc-size">
                System size (kW)
              </label>
              <input
                className="form__input"
                id="calc-size"
                name="size"
                type="number"
                min={1}
                max={100}
                step={0.1}
                value={inputs.sizeKw}
                onChange={(e) => {
                  const sizeKw = Number(e.target.value);
                  update({ sizeKw });
                  compute({ sizeKw });
                }}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="calc-rate">
                Electricity rate (¢/kWh inc. GST)
              </label>
              <input
                className="form__input"
                id="calc-rate"
                name="rate"
                type="number"
                min={10}
                max={50}
                step={0.1}
                value={inputs.rate}
                onChange={(e) => {
                  const rate = Number(e.target.value);
                  update({ rate });
                  compute({ rate });
                }}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="calc-self">
                Self-consumption (%)
              </label>
              <input
                className="form__input"
                id="calc-self"
                name="self"
                type="number"
                min={20}
                max={90}
                value={inputs.selfPct}
                onChange={(e) => {
                  const selfPct = Number(e.target.value);
                  update({ selfPct });
                  compute({ selfPct });
                }}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="calc-fit">
                Feed-in tariff (¢/kWh)
              </label>
              <input
                className="form__input"
                id="calc-fit"
                name="fit"
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={inputs.fit}
                onChange={(e) => {
                  const fit = Number(e.target.value);
                  update({ fit });
                  compute({ fit });
                }}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="calc-cost">
                System cost before STCs (AUD)
              </label>
              <input
                className="form__input"
                id="calc-cost"
                name="cost"
                type="number"
                min={3000}
                max={100000}
                value={inputs.cost}
                onChange={(e) => {
                  const cost = Number(e.target.value);
                  update({ cost });
                  compute({ cost });
                }}
              />
            </div>
            <button className="btn btn--primary btn--block" type="button" data-action="calc-run" onClick={() => compute()}>
              Calculate
            </button>
          </form>
          <div>
            <div className="calc-box__result" data-calc-result>
              <h2 className="mb-4 text-lg font-black">Your estimated results</h2>
              {formatted && (
                <>
                  <div className="calc-box__result-row">
                    <span>STC zone</span>
                    <span>{formatted.zone}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>STCs</span>
                    <span>{formatted.stcCount}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>STC rebate</span>
                    <span>{formatted.stcRebate}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Annual generation</span>
                    <span>{formatted.generation}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Annual savings</span>
                    <span>{formatted.savings}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Net system cost</span>
                    <span>{formatted.netCost}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>Simple payback</span>
                    <span>{formatted.payback}</span>
                  </div>
                  <div className="calc-box__result-row">
                    <span>25-year savings</span>
                    <span>{formatted.lifetime}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
