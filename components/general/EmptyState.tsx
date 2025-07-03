import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ buttonText, description, title, href }: iAppProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full rounded-xl border-dashed border p-8 text-center animate-in fade-in-50">
      <div className="flex items-center  size-20 justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center leading-tight text-sm text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
      <PlusCircle  className="size-4"/>
      {buttonText}
      </Link>
    </div>
  );
}
