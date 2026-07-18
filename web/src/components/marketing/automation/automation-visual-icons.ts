import type { ComponentType, SVGProps } from "react";
import {
  UsersIcon,
  CloudIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ChartBarIcon,
  CogIcon,
  CursorArrowRaysIcon,
  ServerIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export type AutomationTypeIconTone =
  | "purple"
  | "blue"
  | "green"
  | "cyan"
  | "orange"
  | "gray";

export const AUTOMATION_TYPE_ICONS: ReadonlyArray<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: AutomationTypeIconTone;
}> = [
  { icon: UsersIcon, tone: "purple" },
  { icon: CloudIcon, tone: "blue" },
  { icon: RocketLaunchIcon, tone: "green" },
  { icon: SparklesIcon, tone: "cyan" },
  { icon: ChartBarIcon, tone: "orange" },
  { icon: CogIcon, tone: "gray" },
];

export const AUTOMATION_WORKFLOW_STEP_ICONS = [
  CursorArrowRaysIcon,
  ServerIcon,
  SparklesIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
] as const;
