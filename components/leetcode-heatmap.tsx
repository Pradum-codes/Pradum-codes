'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LeetCodeHeatmapProps {
  submissionCalendar: string;
  className?: string;
  compact?: boolean;
  days?: number;
}

interface SubmissionData {
  [timestamp: string]: number;
}

export function LeetCodeHeatmap({
  submissionCalendar,
  className,
  compact = false,
  days = 365,
}: LeetCodeHeatmapProps) {
  // Parse the submission calendar data
  const parseSubmissionData = (calendar: string): SubmissionData => {
    try {
      const parsed = JSON.parse(calendar) as Record<string, number>;
      const normalized: SubmissionData = {};

      Object.entries(parsed).forEach(([key, count]) => {
        if (!Number.isFinite(count)) return;
        const unix = Number(key);
        const isoDate = Number.isNaN(unix)
          ? key
          : new Date(unix * 1000).toISOString().slice(0, 10);
        normalized[isoDate] = count;
      });

      return normalized;
    } catch (error) {
      console.error('Error parsing submission calendar:', error);
      return {};
    }
  };

  const submissionData = parseSubmissionData(submissionCalendar);

  // Check if we have any data at all
  const hasAnyData = Object.keys(submissionData).length > 0;

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

  // Get submission count for a specific date
  const getSubmissionCount = (date: Date): number => {
    const dateKey = date.toISOString().slice(0, 10);
    return submissionData[dateKey] || 0;
  };

  const getIntensity = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  const getCompactColor = (intensity: number): string => {
    const colors = [
      'bg-muted/30',
      'bg-green-200 dark:bg-green-900/40',
      'bg-green-300 dark:bg-green-700/60',
      'bg-green-400 dark:bg-green-600/70',
      'bg-green-500 dark:bg-green-500/80',
    ];
    return colors[intensity] || colors[0];
  };

  // Get color intensity based on submission count
  const getIntensityColor = (count: number): string => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count >= 1 && count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count >= 3 && count <= 5) return 'bg-green-300 dark:bg-green-700';
    if (count >= 6 && count <= 10) return 'bg-green-400 dark:bg-green-600';
    return 'bg-green-500 dark:bg-green-500';
  };

  // Group dates by weeks
  const getWeeks = () => {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    
    dates.forEach((date, index) => {
      if (date.getDay() === 1 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
      
      if (index === dates.length - 1) {
        weeks.push(currentWeek);
      }
    });
    
    return weeks;
  };

  const weeks = getWeeks();

  // Calculate total submissions and streak
  const totalSubmissions = Object.values(submissionData).reduce((sum, count) => sum + count, 0);
  const currentStreak = calculateCurrentStreak();
  const maxStreak = calculateMaxStreak();

  // If no data available, show a message
  if (!hasAnyData) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Contribution Activity</CardTitle>
          <CardDescription>LeetCode submission activity heatmap</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No submission data available
          </div>
        </CardContent>
      </Card>
    );
  }

  function calculateCurrentStreak(): number {
    let streak = 0;
    const today = new Date();
    const currentDate = new Date(today);
    
    while (currentDate >= dates[0]) {
      const count = getSubmissionCount(currentDate);
      if (count > 0) {
        streak++;
      } else {
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  }

  function calculateMaxStreak(): number {
    let maxStreak = 0;
    let currentStreak = 0;
    
    dates.forEach(date => {
      const count = getSubmissionCount(date);
      if (count > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    
    return maxStreak;
  }

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (compact) {
    const compactWeeks: Date[][] = [];
    let currentWeek: Date[] = [];
    const firstDate = dates[0];
    const startDay = firstDate.getDay();

    for (let i = 0; i < startDay; i++) {
      currentWeek.push(new Date(0));
    }

    dates.forEach((date) => {
      currentWeek.push(date);
      if (currentWeek.length === 7) {
        compactWeeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(new Date(0));
      }
      compactWeeks.push(currentWeek);
    }

    return (
      <div className={cn("w-full", className)}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="flex gap-1">
              {compactWeeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((date, dayIndex) => {
                    if (date.getTime() === 0) {
                      return <div key={dayIndex} className="h-2.5 w-2.5" />;
                    }

                    const count = getSubmissionCount(date);
                    const intensity = getIntensity(count);

                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "h-2.5 w-2.5 rounded-[2px] border border-border/20",
                          getCompactColor(intensity),
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
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Contribution Activity
          <div className="text-sm text-muted-foreground">
            {totalSubmissions} submissions in the past year
          </div>
        </CardTitle>
        <CardDescription>
          LeetCode submission activity heatmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Current streak: </span>
              <span className="font-medium">{currentStreak} days</span>
            </div>
            <div>
              <span className="text-muted-foreground">Longest streak: </span>
              <span className="font-medium">{maxStreak} days</span>
            </div>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Month labels */}
              <div className="flex mb-2">
                <div className="w-8"></div> {/* Space for day labels */}
                {months.map((month, index) => (
                  <div key={month} className="text-xs text-muted-foreground" style={{ width: '65px' }}>
                    {month}
                  </div>
                ))}
              </div>
              
              {/* Days grid */}
              <div className="flex">
                {/* Day of week labels */}
                <div className="flex flex-col pr-2">
                  {daysOfWeek.map((day, index) => (
                    <div key={day} className={cn(
                      "text-xs text-muted-foreground h-3 mb-1 flex items-center justify-end",
                      index % 2 === 0 ? "visible" : "invisible" // Only show alternate days to avoid crowding
                    )}>
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Heatmap grid */}
                <div className="flex gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const date = week.find(d => d.getDay() === (dayIndex + 1) % 7);
                        const count = date ? getSubmissionCount(date) : 0;
                        const hasData = date && date >= dates[0];
                        
                        return (
                          <div
                            key={dayIndex}
                            className={cn(
                              "w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-700",
                              hasData ? getIntensityColor(count) : "bg-transparent",
                              "hover:ring-2 hover:ring-primary hover:ring-opacity-50 transition-all cursor-pointer"
                            )}
                            title={
                              date && hasData
                                ? `${count} submissions on ${date.toDateString()}`
                                : ''
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  {[0, 1, 3, 6, 11].map((threshold) => (
                    <div
                      key={threshold}
                      className={cn(
                        "w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-700",
                        getIntensityColor(threshold)
                      )}
                      title={`${threshold === 0 ? 'No' : threshold === 11 ? '10+' : `${threshold}-${threshold === 1 ? '2' : threshold === 3 ? '5' : '10'}`} submissions`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
