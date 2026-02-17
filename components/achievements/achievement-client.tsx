"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { AchievementViewData } from "@/lib/achievements-shared";
import { buildLearningHeatmap } from "@/lib/achievements-shared";
import LeetCodeCard from "@/components/achievements/leetcode-card";
import GitHubCard from "@/components/achievements/github-card";
import CertificationsCard from "@/components/achievements/certificates-card";




export function AchievementClient({ data }: { data: AchievementViewData }) {
  const sectionAnimation = useScrollAnimation({ threshold: 0.2 });
  const learningHeatmap = buildLearningHeatmap(data.certifications.total);

  return (
    <section id="achievements" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto" ref={sectionAnimation.ref}>
          <h2
            className={`text-3xl sm:text-4xl font-semibold mb-4 transition-all duration-700 ${
              sectionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Achievements
          </h2>
          <p
            className={`text-muted-foreground mb-10 transition-all duration-700 ${
              sectionAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Click any card to explore detailed insights and achievements across different platforms.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LeetCodeCard leetcode={data.leetcode} />
            <GitHubCard github={data.github} />
            <CertificationsCard certifications={data.certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}
