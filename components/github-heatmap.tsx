'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GitHubHeatmapProps {
  submissionCalendar: string;
  className?: string;
  compact?: boolean;
  days?: number;
}

interface ContributionData {
  [timestamp: string]: number;
}

export function GitHubHeatmap({
  submissionCalendar,
  className,
  compact = false,
  days = 365,
}: GitHubHeatmapProps) {
  // Parse the contribution calendar data
  const parseContributionData = (calendar: string): ContributionData => {
    try {
      return JSON.parse(calendar);
    } catch (error) {
      console.error('Error parsing contribution calendar:', error);
      return {};
    }
  };

  const contributionData = parseContributionData(submissionCalendar);
  
  // Check if we have any data at all
  const hasAnyData = Object.keys(contributionData).length > 0;

  // Get the date range for the past year
  const getDateRange = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const dates = getDateRange();

  // Get contribution intensity (0-4) based on count
  const getIntensity = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 2;
    if (count <= 3) return 3;
    if (count <= 5) return 4;
    return 4;
  };

  // Get color based on intensity
  const getColor = (intensity: number): string => {
    const colors = [
      'bg-muted/30', // 0 contributions
      'bg-green-200 dark:bg-green-900/40', // 1-3 contributions
      'bg-green-300 dark:bg-green-700/60', // 4-6 contributions
      'bg-green-400 dark:bg-green-600/70', // 7-9 contributions
      'bg-green-500 dark:bg-green-500/80'  // 10+ contributions
    ];
    return colors[intensity] || colors[0];
  };

  // Group dates by weeks (starting from Sunday)
  const getWeeks = () => {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    // First, pad the beginning to start on Sunday
    const firstDate = dates[0];
    const startDay = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Add empty slots for days before the first date
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(new Date(0)); // Use epoch as placeholder
    }
    
    dates.forEach((date) => {
      currentWeek.push(date);
      
      // If it's Saturday (day 6) or we have 7 days, start a new week
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    // Handle remaining days in the last week
    if (currentWeek.length > 0) {
      // Pad the end to complete the week
      while (currentWeek.length < 7) {
        currentWeek.push(new Date(0)); // Use epoch as placeholder
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  const weeks = getWeeks();

  // Calculate statistics
  const totalContributions = Object.values(contributionData).reduce((sum, count) => sum + count, 0);
  const maxContributions = Math.max(...Object.values(contributionData));
  const activedays = Object.values(contributionData).filter(count => count > 0).length;

  if (!hasAnyData) {
    return (
      <div className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
          <CardDescription>GitHub contributions over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No contribution data available</p>
          </div>
        </CardContent>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("w-full", className)}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((date, dayIndex) => {
                    if (date.getTime() === 0) {
                      return <div key={dayIndex} className="h-2.5 w-2.5" />;
                    }

                    const dateKey = date.toISOString().split('T')[0];
                    const count = contributionData[dateKey] || 0;
                    const intensity = getIntensity(count);

                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "h-2.5 w-2.5 rounded-[2px] border border-border/20",
                          getColor(intensity),
                        )}
                        title={`${date.toDateString()}: ${count} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Contribution Activity</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span>{totalContributions} contributions in the last year</span>
            <span>{activedays} active days</span>
            <span>Max {maxContributions} contributions in a day</span>
          </div>
        </div>

        {/* Heatmap */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Month labels */}
            <div className="flex mb-2">
              <div className="w-8"></div> {/* Space for day labels */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => {
                  const firstValidDay = week.find(d => d.getTime() !== 0);
                  if (!firstValidDay) return <div key={weekIndex} className="w-3"></div>;
                  
                  const shouldShowMonth = firstValidDay.getDate() <= 7 || weekIndex === 0;
                  return (
                    <div key={weekIndex} className="w-3 text-xs text-muted-foreground text-center">
                      {shouldShowMonth ? firstValidDay.toLocaleDateString('en', { month: 'short' }) : ''}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Days of week and heatmap */}
            <div className="flex">
              {/* Day labels */}
              <div className="w-8 flex flex-col gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={day} className={cn(
                    "text-xs text-muted-foreground h-3 flex items-center",
                    index % 2 === 1 ? "opacity-100" : "opacity-0"
                  )}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((date, dayIndex) => {
                      // Handle placeholder dates (empty slots)
                      if (date.getTime() === 0) {
                        return <div key={dayIndex} className="w-3 h-3"></div>;
                      }

                      const dateKey = date.toISOString().split('T')[0];
                      const count = contributionData[dateKey] || 0;
                      const intensity = getIntensity(count);

                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            "w-3 h-3 rounded-sm border border-border/20",
                            getColor(intensity),
                            "transition-all duration-200 hover:ring-2 hover:ring-primary/50 cursor-pointer"
                          )}
                          title={`${date.toDateString()}: ${count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-muted-foreground">Less</span>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-3 h-3 rounded-sm border border-border/20",
                      getColor(i)
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
