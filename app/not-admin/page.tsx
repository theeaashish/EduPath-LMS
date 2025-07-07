import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
            <ShieldX className="size-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Restricted</CardTitle>
          <CardDescription className="max-w-sm text-balance mx-auto">
            Hey! User You are not admin, which means you can not create any
            courses or stuff like that...
          </CardDescription>
          <CardContent>
            <Link
              href="/"
              className={buttonVariants({ className: "w-full mt-4" })}
            >
              <ArrowLeft className="size-4 mr-1" />
              Back to home
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
