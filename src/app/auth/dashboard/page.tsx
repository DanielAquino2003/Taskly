// ----------------------------------------------------------
// File: page.tsx
// Author: Máximo Martín Moreno
// Description: This file contains the main page component (dashboard) for the task management web application.
// It handles rendering tasks, user interactions, and task-related functionalities.
// ----------------------------------------------------------

import { StatsWidget } from "@/components/stats-widget";
import { GoalsWidget } from "@/components/goals-widget";
import { RemindersWidget } from "@/components/reminders-widget";
import { QuickStatsWidget } from "@/components/quick-stats-widget";
import { QuickTasksWidget } from "@/components/quick-tasks-widget";
import { TaskCompletionChart } from "@/components/task-completion-chart";
import { UserActivityChart } from "@/components/user-activity-chart";
import { AddNote } from "@/components/AddNote";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      
      {/* StatsWidget: Displays overall task-related statistics */}
      <div className="lg:col-span-2">
        <StatsWidget />
      </div>
      
      {/* QuickStatsWidget: Provides a summary of quick stats */}
      <QuickStatsWidget />
      
      {/* GoalsWidget: Displays user-defined goals */}
      <GoalsWidget />
      
      {/* RemindersWidget: Shows upcoming reminders */}
      <RemindersWidget />
      
      {/* QuickTasksWidget: Enables quick task management */}
      <QuickTasksWidget />
      
      {/* TaskCompletionChart: Visualizes task completion trends */}
      <TaskCompletionChart />
      
      {/* UserActivityChart: Visualizes user activity patterns */}
      <UserActivityChart />
      
      {/* AddNote: Allows users to add quick notes */}
      <AddNote />
    </div>
  );
}
