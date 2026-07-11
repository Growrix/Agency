export interface AnalyticsSnapshot {
  clicks: number;
  impressions: number;
  averagePosition: number;
}

export interface RefreshSignalInput {
  clicks: number;
  impressions: number;
  averagePosition: number;
  trafficDeltaPercent: number;
  ageInDays: number;
}

export function summarizeWeeklyAnalytics(snapshots: AnalyticsSnapshot[]) {
  const totalClicks = snapshots.reduce((sum, item) => sum + item.clicks, 0);
  const totalImpressions = snapshots.reduce((sum, item) => sum + item.impressions, 0);
  const averagePosition = snapshots.reduce((sum, item) => sum + item.averagePosition, 0) / snapshots.length;

  return {
    totalClicks,
    totalImpressions,
    averageCtr: totalImpressions === 0 ? 0 : Number(((totalClicks / totalImpressions) * 100).toFixed(2)),
    averagePosition: Number(averagePosition.toFixed(2))
  };
}

export function shouldRefreshPost(input: RefreshSignalInput) {
  return {
    refreshRecommended:
      input.averagePosition >= 5 || input.trafficDeltaPercent <= -20 || input.ageInDays >= 365,
    reasons: [
      input.averagePosition >= 5 ? "position_window" : null,
      input.trafficDeltaPercent <= -20 ? "traffic_drop" : null,
      input.ageInDays >= 365 ? "stale_content" : null
    ].filter(Boolean)
  };
}