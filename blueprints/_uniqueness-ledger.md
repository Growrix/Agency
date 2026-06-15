# Uniqueness Ledger

Shared memory for the Website Blueprint Factory. The `bp-11-uniqueness-enforcer` reads this before fingerprinting a new project and appends one row per project that PASSES the uniqueness gate.

## How it works
- Every project is fingerprinted on **7 dimensions**. A new project must match any prior project on **no more than 2** of them (≤ ~28%). Matching **3 or more** (≥ ~43%) = REJECT → regenerate from Stage 04.
- Pay special attention to projects in the same or adjacent industry — they must feel like different products.

## The 7 dimensions
1. Visual style (from `visual-style-library.md`)
2. Hero type (from `hero-database.md`)
3. Grid system (from `grid-database.md`)
4. Motion philosophy (from `motion-database.md`)
5. Homepage composition (from `composition-library.md`)
6. Component style family (card/nav/CTA/form gestalt)
7. Signature interactive tool

## Ledger

| NN | Project | Industry | Visual Style | Hero | Grid | Motion | Composition | Component Family | Interactive Tool |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| _ex_ | _example-co_ | _pest control_ | _Industrial Modern_ | _H20 Booking First_ | _G5 Dashboard_ | _M6 Architectural_ | _Authority_ | _Bordered-Accent / Sidebar / Solid / Stepped_ | _Infestation risk estimator_ |

<!-- Append new rows below this line. Remove the example row once the first real project is added. -->
