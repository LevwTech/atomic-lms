interface UploadGadgetProps {
  attachedFiles: string[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UploadGadget({
  attachedFiles,
  setAttachedFiles,
}: UploadGadgetProps): JSX.Element {
  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setAttachedFiles([...attachedFiles, ...newFiles]);
  };

  return (
    <label
      className="p-[70px] relative rounded-3xl hover:bg-[#F9F9F9] transition-all border-2 border-[var(--Primary)] border-dashed h-[40%] w-full cursor-pointer"
      htmlFor="upload"
    >
      <input
        className="h-full w-full hidden"
        id="upload"
        multiple
        onChange={(e) => {
          handleFileChange(e);
        }}
        type="file"
      />
      <img
        alt="upload"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[275px]"
        src="/upload.png"
      />
    </label>
  );
}
