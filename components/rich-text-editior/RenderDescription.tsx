"use client";

import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import parse from "html-react-parser";

const RenderDescription = ({ json }: { json: JSONContent }) => {
  const ouput = useMemo(() => {
    // if (typeof window === "undefined") {
    //     return "";
    // }
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [json]);

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(ouput)}
    </div>
  );
};

export default RenderDescription;
