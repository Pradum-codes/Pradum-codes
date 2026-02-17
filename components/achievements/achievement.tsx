import { AchievementClient } from "@/components/achievements/achievement-client";
import { getAchievementData } from "@/lib/achievements-data";

export async function Achievement() {
  const data = await getAchievementData();
  return <AchievementClient data={data} />;
}
