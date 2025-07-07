"use client";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import RenderDescription from "@/components/rich-text-editior/RenderDescription";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BookIcon, CheckCircleIcon } from "lucide-react";
import { useTransition } from "react";
import { markLessonAsCompleted } from "../action";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}
export function CourseContent({ data }: iAppProps) {
  const [isPending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();
  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <BookIcon className="size-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            No video available for this lesson.
          </p>
        </div>
      );
    }

    return (
      <div className="aspect-video rounded-lg bg-black relative overflow-hidden">
        <video
          poster={thumbnailUrl}
          controls
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
          <source src={videoUrl} type="video/avi" />
          <source src={videoUrl} type="video/mpeg" />
          Your browser does not support the video tag.{" "}
        </video>
      </div>
    );
  }

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonAsCompleted(data.id, data.Chapter.Course.slug)
      );

      if (error) {
        toast.error("An unexpected error occurred please try again later");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />
      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-emerald-500/10 text-emerald-400 hover:text-emerald-500 hover:bg-emerald-500/20"
          >
            <CheckCircleIcon className="size-4  text-emerald-400" />
            Completed
          </Button>
        ) : (
          <Button variant="outline" onClick={onSubmit} disabled={isPending}>
            <CheckCircleIcon className="size-4  text-emerald-500" />
            Mark as Completed
          </Button>
        )}
      </div>
      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
