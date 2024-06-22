export function AnswerLabel({ isCorrect }: { isCorrect: string }) {
  let iconSrc = "";
  let bgColor = "";
  let textColor = "";
  let text = "";
  switch (isCorrect) {
    case "correct":
      iconSrc = "correct.svg";
      bgColor = "#D3FC9A";
      textColor = "#5AA907";
      text = "Correct";
      break;
    case "incorrect":
      iconSrc = "wrong.svg";
      bgColor = "#FDA4AB";
      textColor = "#E01E3F";
      text = "Incorrect";
      break;
    case "partially_correct":
      iconSrc = "partial.svg";
      bgColor = "#FFF9C5";
      textColor = "#FFB70A";
      text = "Partially Correct";
      break;
      iconSrc = "";
      bgColor = "#808080";
      textColor = "#FFFFFF";
      text = "Partially Correct";
  }
  return (
    <div
      className={`w-[180px] h-[35px] bg-${bgColor} flex items-center justify-center rounded border border-[${textColor}]  mb-6`}
      style={{ backgroundColor: bgColor }}
    >
      <img src={iconSrc} className="mr-2 " alt="" />
      <p className="text-[16px]" style={{ color: textColor }}>
        {text}
      </p>
    </div>
  );
}
