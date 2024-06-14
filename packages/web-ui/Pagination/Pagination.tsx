import { PaginationLogic } from "@atomic/frontend-logic";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  numOfPages: number;
  endIndex: number;
  totalCourses: number;
}

export function Pagination({
  currentPage,
  setCurrentPage,
  numOfPages,
  endIndex,
  totalCourses,
}: PaginationProps): JSX.Element {
  return (
    <PaginationLogic currentPage={currentPage} setCurrentPage={setCurrentPage}>
{(nextPage, prevPage) => (
  <div className="bg-[var(--White)] p-[10px] flex gap-[10px] w-[155px] rounded-[10px] justify-between">
    <button disabled={currentPage === 1} onClick={prevPage} type="button">
      <img
        alt="arrow-left"
        className="hover:opacity-80 transition-all cursor-pointer"
        src="/ArrowLeft.svg"
      />
    </button>
    <div className="flex items-center gap-[6px]">
      {[...Array(Math.ceil(numOfPages))].map((_, index) => (
        <button
          className={`${
            index + 1 === currentPage
              ? "h-5 w-5 bg-[var(--Primary)] lg:h-2 lg:w-2"
              : "h-5 w-5 bg-[var(--Gray)] lg:h-2 lg:w-2"
          } cursor-pointer rounded-full transition-all duration-500 ease-in-out`}
          key={index}
          onClick={() => {
            setCurrentPage(index + 1);
          }}
          type="button"
        />
      ))}
    </div>
    <button
      disabled={endIndex >= totalCourses}
      onClick={nextPage}
      type="button"
    >
      <img
        alt="arrow-right"
        className="hover:opacity-80 transition-all cursor-pointer fill-current text-blue-500"
        src="/ArrowRight.svg"
      />
    </button>
  </div>
)}

    </PaginationLogic>
  );
}
