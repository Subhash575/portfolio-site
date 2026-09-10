"use client";

import React, { useRef, useEffect } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  weekday?: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GithubHeatmapProps {
  weeks?: ContributionWeek[];
  isLoading?: boolean;
}

export default function GithubHeatmap({
  weeks = [],
  isLoading = false,
}: GithubHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the end of heatmap on load
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [weeks, isLoading]);

  if (isLoading || weeks.length === 0) {
    return <GithubHeatmapSkeleton />;
  }

  // Calculate month labels and their week index
  const getMonthLabels = () => {
    const labels: { text: string; index: number }[] = [];
    let prevMonth = "";

    weeks.forEach((week, index) => {
      const firstDay = week.contributionDays.find((day) => day && day.date);

      if (firstDay) {
        const date = new Date(firstDay.date);

        const monthText = date.toLocaleString("en-US", {
          month: "short",
        });

        if (monthText !== prevMonth) {
          labels.push({
            text: monthText,
            index,
          });

          prevMonth = monthText;
        }
      }
    });

    // Remove labels that are too close together
    return labels.filter((label, i) => {
      if (i === 0) return true;

      return label.index - labels[i - 1].index > 2;
    });
  };

  const monthLabels = getMonthLabels();

  // Map contribution intensity to Tailwind classes
  const getCellClass = (level: number) => {
    switch (level) {
      // No contributions / empty day
      case 0:
        return `
          bg-surface-elevated/70
          border border-subtle/50
          dark:bg-surface-elevated/50
          dark:border-subtle/40
        `;

      // Low
      case 1:
        return `
          bg-accent/35
          border border-accent/10
          hover:bg-accent/45
          shadow-sm
        `;

      // Medium
      case 2:
        return `
          bg-accent/55
          border border-accent/10
          hover:bg-accent/65
          shadow-sm
        `;

      // High
      case 3:
        return `
          bg-accent/75
          border border-accent/10
          hover:bg-accent/85
          shadow-md
          shadow-accent/5
        `;

      // Very high
      case 4:
        return `
          bg-accent
          border border-accent/20
          hover:brightness-110
          shadow-lg
          shadow-accent/15
        `;

      default:
        return `
          bg-surface-elevated/70
          border border-subtle/50
          dark:bg-surface-elevated/50
          dark:border-subtle/40
        `;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Scrollable Wrapper */}
      <div
        ref={containerRef}
        className="
          overflow-x-auto
          pb-2
          scrollbar-thin
          scrollbar-thumb-subtle
          scrollbar-track-transparent
          select-none
        "
      >
        <div
          className="
            min-w-[720px]
            lg:min-w-0
            flex
            flex-col
            relative
            pt-6
            pl-8
          "
        >
          {/* ================================
              MONTH LABELS
          ================================= */}
          <div
            className="
              absolute
              top-0
              left-8
              right-0
              h-5
              flex
              text-[10px]
              font-semibold
              text-secondary
              tracking-wider
            "
          >
            {monthLabels.map((label) => (
              <span
                key={`${label.text}-${label.index}`}
                className="absolute"
                style={{
                  left: `${label.index * 14}px`,
                }}
              >
                {label.text}
              </span>
            ))}
          </div>

          {/* ================================
              WEEKDAY LABELS
          ================================= */}
          <div
            className="
              absolute
              left-0
              top-6
              w-7
              h-[96px]
              flex
              flex-col
              justify-between
              text-[9px]
              font-bold
              text-secondary/70
              uppercase
              select-none
            "
          >
            <span className="h-3 flex items-center">Mon</span>

            <span className="h-3 flex items-center">Wed</span>

            <span className="h-3 flex items-center">Fri</span>
          </div>

          {/* ================================
              HEATMAP GRID
          ================================= */}
          <div className="flex gap-[2px]">
            {weeks.map((week, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-[2px]">
                {/*
                  Always render exactly 7 rows.

                  This is important because if the API does not
                  return a particular day, the cell still exists
                  and remains visible.
                */}
                {Array.from({ length: 7 }).map((_, rowIndex) => {
                  const day = week.contributionDays[rowIndex];

                  const level = day?.level ?? 0;
                  const count = day?.count ?? 0;

                  const formattedDate = day?.date
                    ? new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "";

                  return (
                    <div
                      key={day?.date || `${colIndex}-${rowIndex}`}
                      role="gridcell"
                      aria-label={
                        day?.date
                          ? `${count} contributions on ${formattedDate}`
                          : "No contributions"
                      }
                      title={
                        day?.date
                          ? `${count} contributions on ${formattedDate}`
                          : "No contributions"
                      }
                      className={`
                          w-3
                          h-3
                          shrink-0
                          rounded-[2px]
                          transition-all
                          duration-200
                          cursor-pointer
                          ${getCellClass(level)}
                        `}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================
          LEGEND
      ================================= */}
      <div
        className="
          flex
          items-center
          justify-end
          gap-1.5
          mt-3
          text-[11px]
          text-muted
          font-medium
          pr-1
          select-none
        "
      >
        <span>Less</span>

        <div
          className="
            w-2.5
            h-2.5
            rounded-[2px]
            bg-surface-elevated/70
            border
            border-subtle/50
            dark:bg-surface-elevated/50
            dark:border-subtle/40
          "
        />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/35" />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/55" />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/75" />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent" />

        <span>More</span>
      </div>
    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function GithubHeatmapSkeleton() {
  return (
    <div className="w-full flex flex-col animate-pulse">
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div
          className="
            min-w-[720px]
            lg:min-w-0
            flex
            flex-col
            relative
            pt-6
            pl-8
          "
        >
          {/* ================================
              SKELETON MONTHS
          ================================= */}
          <div
            className="
              absolute
              top-0
              left-8
              right-0
              h-5
              flex
              text-[10px]
              font-semibold
              text-secondary/30
              tracking-wider
            "
          >
            {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((month, i) => (
              <span
                key={month}
                className="absolute"
                style={{
                  left: `${i * 110}px`,
                }}
              >
                {month}
              </span>
            ))}
          </div>

          {/* ================================
              SKELETON WEEKDAY LABELS
          ================================= */}
          <div
            className="
              absolute
              left-0
              top-6
              w-7
              h-[96px]
              flex
              flex-col
              justify-between
              text-[9px]
              font-bold
              text-secondary/30
              uppercase
            "
          >
            <span className="h-3 flex items-center">Mon</span>

            <span className="h-3 flex items-center">Wed</span>

            <span className="h-3 flex items-center">Fri</span>
          </div>

          {/* ================================
              SKELETON CELLS
          ================================= */}
          <div className="flex gap-[2px]">
            {Array.from({ length: 53 }).map((_, col) => (
              <div key={col} className="flex flex-col gap-[2px]">
                {Array.from({ length: 7 }).map((_, row) => {
                  const intensity = (col * 3 + row * 7) % 5;

                  let bgClass = `
                        bg-surface-elevated/60
                        border
                        border-subtle/30
                        dark:bg-surface-elevated/40
                        dark:border-subtle/30
                      `;

                  if (intensity === 2) {
                    bgClass = `
                          bg-accent/10
                          border
                          border-accent/10
                        `;
                  }

                  if (intensity === 3) {
                    bgClass = `
                          bg-accent/20
                          border
                          border-accent/10
                        `;
                  }

                  if (intensity === 4) {
                    bgClass = `
                          bg-accent/30
                          border
                          border-accent/10
                        `;
                  }

                  return (
                    <div
                      key={row}
                      className={`
                            w-3
                            h-3
                            shrink-0
                            rounded-[2px]
                            ${bgClass}
                          `}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================
          LEGEND SKELETON
      ================================= */}
      <div
        className="
          flex
          items-center
          justify-end
          gap-1.5
          mt-3
          text-[11px]
          text-muted/30
          font-medium
          pr-1
        "
      >
        <div
          className="
            h-3
            w-8
            bg-surface-elevated/50
            dark:bg-surface-elevated/20
            rounded
          "
        />

        <div
          className="
            w-2.5
            h-2.5
            rounded-[2px]
            bg-surface-elevated/60
            border
            border-subtle/30
            dark:bg-surface-elevated/40
          "
        />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/10" />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/20" />

        <div className="w-2.5 h-2.5 rounded-[2px] bg-accent/30" />

        <div
          className="
            h-3
            w-8
            bg-surface-elevated/50
            dark:bg-surface-elevated/20
            rounded
          "
        />
      </div>
    </div>
  );
}
