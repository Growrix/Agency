import type { ReactNode } from 'react';
import { getSiteNavigation } from '@/lib/content/repositories/site-content';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Fab } from '@/components/layout/Fab';
import { TickerBar } from '@/components/layout/TickerBar';
import { RouteFocusManager } from '@/components/layout/RouteFocusManager';

interface SiteShellProps {
  children: ReactNode;
}

export async function SiteShell({ children }: SiteShellProps) {
  const navigation = await getSiteNavigation();

  return (
    <>
      <a href="#main" className="skip">
        {navigation.accessibility.skipToContentLabel}
      </a>

      <TickerBar
        items={navigation.ticker}
        ariaLabel={navigation.accessibility.tickerAriaLabel}
        pauseLabel={navigation.accessibility.tickerPauseLabel}
        resumeLabel={navigation.accessibility.tickerPlayLabel}
      />

      <Header navigation={navigation} />
      <RouteFocusManager />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer navigation={navigation} />
      <BottomNav navigation={navigation} />
      <Fab />
    </>
  );
}
