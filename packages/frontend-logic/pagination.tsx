interface PaginationLogicProps {
  children: (nextPage: () => void, prevPage: () => void) => JSX.Element;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export const PaginationLogic: React.FC<PaginationLogicProps> = ({
  children,
  currentPage,
  setCurrentPage,
}) => {
  const nextPage = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  return children(nextPage, prevPage);
};
