interface UploadGadgetProps {
  attachedFiles: string[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export function AttachedFiles({
  attachedFiles,
  setAttachedFiles,
}: UploadGadgetProps): JSX.Element {
  return (
    <div className="bg-[#F3F3F3] p-[10px] rounded-[20px] h-[60%] gap-[10px] flex flex-col">
      <div className="py-[5px] px-[10px] rounded-[10px] bg-[var(--Primary)] flex items-center text-[25px] font-bold text-white h-[55px]">
        Attached Files
      </div>
      <div className="gap-[10px] flex flex-col">
        {attachedFiles.map((file, index) => (
          <div className="flex p-[10px] gap-[10px] rounded-[5px] bg-[#F3F3F3] mix-blend-multiply">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
