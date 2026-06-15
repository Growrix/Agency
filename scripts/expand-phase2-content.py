#!/usr/bin/env python3
"""Inject service process + CTA bands and calculator footnote."""
import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "sites" / "03. sunterra-solar-v2-website.html"
content = path.read_text(encoding="utf-8")

PROCESS = '''
    <section class="service-process" aria-labelledby="{sid}-process-title">
      <div class="container">
        <h2 class="section-head__title" id="{sid}-process-title">How Sunterra delivers {name}</h2>
        <p class="section-head__lede">Our CEC-accredited process from first call to switch-on — STC rebates included upfront.</p>
        <ol class="service-process__steps">
          <li class="service-process__step"><span class="service-process__num">1</span><p class="service-process__title">Free site assessment</p><p class="service-process__text">CEC designer inspects roof, switchboard and shading. We model STCs and annual savings in AUD.</p></li>
          <li class="service-process__step"><span class="service-process__num">2</span><p class="service-process__title">Custom engineering</p><p class="service-process__text">Right-sized system design with tier-one equipment, DNSP export limits and itemised quote.</p></li>
          <li class="service-process__step"><span class="service-process__num">3</span><p class="service-process__title">Approvals &amp; install</p><p class="service-process__text">We manage DNSP applications, meter upgrades and CEC-accredited installation.</p></li>
          <li class="service-process__step"><span class="service-process__num">4</span><p class="service-process__title">Commission &amp; support</p><p class="service-process__text">Monitoring setup, handover documentation and 10-year Sunterra workmanship warranty.</p></li>
        </ol>
      </div>
    </section>
    <section class="page-cta" aria-label="Get a quote">
      <div class="container page-cta__inner">
        <p class="page-cta__title">Ready for {name}? Get STCs applied upfront.</p>
        <div class="page-cta__actions">
          <a class="btn btn--accent" href="#/quote">Get free quote</a>
          <a class="btn btn--inverse" href="tel:1300786837">Call 1300 786 837</a>
        </div>
      </div>
    </section>'''

SERVICES = {
    'residential': 'Residential Solar',
    'commercial': 'Commercial Solar',
    'batteries': 'Home Battery Storage',
    'ev-chargers': 'EV Chargers',
    'off-grid': 'Off-Grid Solar',
    'maintenance': 'Solar Maintenance',
}

for sid, name in SERVICES.items():
    marker = f'data-route="{sid}"'
    if PROCESS.format(sid=sid, name=name).strip() in content:
        continue
    # Insert before closing </div> of view (last content__prose closing for service pages)
    pattern = rf'(<!-- ========== VIEW: {sid} ========== -->.*?<div class="content"><div class="container content__prose">.*?</div></div>)(\s*</div>\s*<!-- ========== VIEW:)'
    block = PROCESS.format(sid=sid, name=name)
    content, n = re.subn(pattern, r'\1' + block + r'\2', content, count=1, flags=re.S)
    if n == 0:
        print(f'Warning: could not inject process for {sid}')

CALC_FOOTNOTE = '''
        <div class="calc-footnote">
          <h3>Assumptions &amp; methodology</h3>
          <ul>
            <li>Annual generation = system kW × peak sun hours × 365 × 0.85 (standard system losses).</li>
            <li>STCs = floor(kW × deeming years × zone factor). Deeming period 8 years in 2026 at STC spot price $38.50/certificate.</li>
            <li>Annual savings = self-consumed kWh × electricity rate + exported kWh × feed-in tariff (both inc. GST as ¢/kWh).</li>
            <li>Simple payback = net system cost after STCs ÷ annual savings. Does not include finance charges or tariff changes.</li>
            <li>25-year savings assumes constant generation and rates — actual results vary by usage, equipment and retailer.</li>
          </ul>
          <p>For a formal itemised quote with DNSP-specific export limits, <a href="#/quote">request a free quote</a> or call <a href="tel:1300786837">1300 786 837</a>.</p>
        </div>'''

if 'calc-footnote' not in content.split('data-route="calculator"')[1].split('<!-- ========== VIEW:')[0]:
    content = content.replace(
        '<div class="info-box info-box--spaced"><strong>Methodology:</strong>',
        CALC_FOOTNOTE + '\n        <div class="info-box info-box--spaced"><strong>Methodology:</strong>',
        1
    )

path.write_text(content, encoding='utf-8')
print('Injected service sections. Lines:', content.count('\n') + 1)
