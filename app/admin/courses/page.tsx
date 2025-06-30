import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      <div className="flex items-center justify-between pt-4 text-muted-foreground dark:text-muted-foreground/80 text-sm"> 
        <h2 className="text-lg font-semibold">All Courses</h2>
      </div>
    </>
  );
}
