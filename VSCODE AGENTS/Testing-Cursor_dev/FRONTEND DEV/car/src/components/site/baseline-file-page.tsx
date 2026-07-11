import { BaselineContent } from "@/components/site/baseline-content";
import { getBaselineContentHtml } from "@/lib/baseline-html";

type BaselineFilePageProps = {
  fileName: string;
};

export function BaselineFilePage({ fileName }: BaselineFilePageProps) {
  return <BaselineContent html={getBaselineContentHtml(fileName)} />;
}
