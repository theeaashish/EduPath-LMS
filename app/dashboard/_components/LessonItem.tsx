import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  lesson: {
    id: string;
    title: string;
    position: number;
    description: string | null;
  };

  slug: string;
  isActive?: boolean;
  completed: boolean;
}

export function LessonItem({ lesson, slug, isActive, completed }: iAppProps) {
  return (
    <Link
      className={buttonVariants({
        variant: completed ? "secondary" : "outline",
        className: cn(
          "w-full p-2.5 h-auto justify-start transition-all",
          completed &&
            "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200",
          isActive &&
            !completed &&
            "bg-primary/10 dark:bg-primary/20 border-primary/40 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary"
        ),
      })}
      href={`/dashboard/${slug}/${lesson.id}`}
    >
      <div className="flex items-center gap-2.5 w-full min-w-0">
        <div className="shrink-0">
          {completed ? (
            <div className="size-6 rounded-full border-2 bg-background flex justify-center items-center">
              <CheckIcon />
            </div>
          ) : (
            <div
              className={cn(
                "size-6 rounded-full border-2 bg-background flex justify-center items-center",
                isActive
                  ? "bg-primary/10 dark:bg-primary/20 border-primary/40"
                  : "border-muted-foreground/60"
              )}
            >
              <PlayIcon
                className={cn(
                  "size-2.5 fill-current",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
          )}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p
            className={cn(
              "text-xs font-medium truncate",
              completed
                ? "text-emerald-800 dark:text-emerald-200"
                : isActive
                  ? "text-primary font-semibold"
                  : "text-foreground"
            )}
          >
            {lesson.position}. {lesson.title}
          </p>
          {completed && (
            <p className="text-[10px] text-muted-foreground">Completed</p>
          )}

          {isActive && !completed && (
            <p className="text-[10px] text-muted-foreground font-medium">
              Currently Watching
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
