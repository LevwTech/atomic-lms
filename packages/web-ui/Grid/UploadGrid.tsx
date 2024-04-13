import React from "react";
import { UploadGadget } from "@atomic/web-ui";
import { AttachedFiles } from "../Upload/AttachedFiles";
import { useState } from "react";

export function UploadGrid(): JSX.Element {
  const [attachedFiles, setAttachedFiles] = useState([]);

  console.log(attachedFiles);
  return (
    <div className="grid grid-cols-2 h-full pt-[50px] gap-[50px] w-full">
      <div className="flex flex-col gap-[30px]">
        <UploadGadget
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
        />
        <AttachedFiles attachedFiles={attachedFiles} />
      </div>
    </div>
  );
}
