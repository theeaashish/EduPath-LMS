import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function CoursesPage() {
  const data = await adminGetCourses();
  // console.log(data)
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      {/* <div className="flex items-center justify-between pt-4 text-muted-foreground dark:text-muted-foreground/80 text-sm"> 
        <h2 className="text-lg font-semibold">All Courses</h2>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-7">
        {data.map((course) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
}
