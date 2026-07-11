export type BaselineContentProps = {
  html: string;
};

/**
 * Marker component read by PageShell.
 * It intentionally renders null because PageShell injects the HTML directly
 * into #content without an extra wrapper element.
 */
export function BaselineContent(_props: BaselineContentProps) {
  void _props;
  return null;
}
