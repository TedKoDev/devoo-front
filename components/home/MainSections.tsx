import HotIssuesSection from "@/components/sections/HotIssuesSection";
import RecommendedToolsSection from "@/components/sections/RecommendedToolsSection";
import PopularSideHustlesSection from "@/components/sections/PopularSideHustlesSection";
import DevLogsSection from "@/components/sections/DevLogsSection";
import type { HotIssue, Tool, SideHustle } from "@/types/content";

interface MainSectionsProps {
  hotIssues?: HotIssue[];
  recommendedTools?: Tool[];
  popularSideHustles?: SideHustle[];
}

export default function MainSections({ hotIssues = [], recommendedTools = [], popularSideHustles = [] }: MainSectionsProps) {
  return (
    <div className="space-y-12">
      <DevLogsSection />
      {/* <HotIssuesSection issues={hotIssues} />
      <RecommendedToolsSection tools={recommendedTools} />
      <PopularSideHustlesSection sideHustles={popularSideHustles} /> */}
    </div>
  );
}
