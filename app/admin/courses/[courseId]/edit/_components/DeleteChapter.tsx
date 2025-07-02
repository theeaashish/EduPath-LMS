import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { tryCatch } from "@/hooks/try-catch";
  import { Trash2 } from "lucide-react";
  import { useState, useTransition } from "react";
  import { deleteChapter } from "../actions";
  import { toast } from "sonner";
  
  export default function DeleteChapter({
    chapterId,
    courseId,
  }: {
    chapterId: string;
    courseId: string;
  }) {
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
  
    async function onSubmit() {
      startTransition(async () => {
        const { data: result, error } = await tryCatch(
          deleteChapter({ chapterId, courseId })
        );
  
        if (error) {
          toast.error("An unexpected error occurred please try again later");
          return;
        }
  
        if (result.status === "success") {
          toast.success(result.message);
          setOpen(false);
        } else if (result.status === "error") {
          toast.error(result.message);
        }
      });
    }
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              chapter and remove it from the course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={pending} onClick={onSubmit}>
              {pending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  