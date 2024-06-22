export function InstagramStories({
  questions,
  currentQuestionNumber,
}: {
  questions: any[];
  currentQuestionNumber: number;
}): any {
  const widthPercentage = `${(100 / questions.length).toFixed(2)}%`;

  return (
    <>
      <div className="flex h-[10%]  p-[30px]">
        {questions.map((_, index) => {
          const isHighlighted = index === currentQuestionNumber;

          return (
            <div
              key={index}
              className={`mx-[5px] border-none  rounded-[10px] h-[10px] ${isHighlighted ? "bg-[var(--Primary)]" : "bg-[var(--WDarker)]"}`}
              style={{
                width: widthPercentage,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
}
