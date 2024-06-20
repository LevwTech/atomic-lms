function instagramStories(): any {
  interface Question {
    // // id: number;
    title: string;
    description: string;
  }
  const questions: Question[] = [
    {
      //   // id: 1,
      title: "What is your favorite color?",
      description: "Please select your favorite color from the options below.",
    },
    {
      // id: 2,
      title: "How many pets do you have?",
      description: "Enter the number of pets you currently own.",
    },
    {
      // id: 3,
      title: "Do you prefer cats or dogs?",
      description: "Choose between cats or dogs.",
    },
  ];
  const widthPercentage = `${(100 / questions.length).toFixed(2)}%`;
  const currentQuestionNumber = 0;

  return (
    <>
      <div className="flex h-[10%]  p-[30px]">
        {questions.map((question, index) => {
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

export default instagramStories;
