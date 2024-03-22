import styles from "./SingleCourseGrid.module.css";

interface SingleCourseGridProps {
  courseContent: {
    header: string;
    img: string;
    icon: string;
  }[];
}

export function SingleCourseGrid({
  courseContent,
}: SingleCourseGridProps): JSX.Element {
  return (
    <div
      className={`${styles.grayCardTypo} grid h-full w-full gap-[30px] grid-cols-3 grid-rows-3 pt-[30px] `}
    >
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full row-span-2 flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute top-40 right-8 z-10 w-52 group-hover:scale-110 transition-all"
          src="/Asset 16.png"
        />
        <img
          alt="icon"
          className="absolute left-0 top-0 w-52 group-hover:scale-110 transition-all"
          src="/Exporting/Svg/Styling/Lectures.svg"
        />
        <p className="self-end">{courseContent[0].header}</p>
      </div>
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full col-span-2 flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute right-44 bottom-4 z-10 w-44 group-hover:scale-110 transition-all"
          src="/Asset 15.png"
        />
        <img
          alt="icon"
          className="absolute right-0 bottom-0 z-0 w-52 group-hover:scale-110 transition-all"
          src="/Exporting/Svg/Styling/Exams.svg"
        />
        <p className="self-end z-10">{courseContent[1].header}</p>
      </div>
      {courseContent
        .slice(2, courseContent.length - 2)
        .map((content, index) => (
          <div
            className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer"
            key={index}
          >
            <img
              alt="icon"
              className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
              src={content.img}
            />
            <p className="self-end z-10">{content.header}</p>
          </div>
        ))}
      <div className={`flex flex-col gap-[30px] ${styles.blueCardTypo}`}>
        <div className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer">
          <img
            alt="icon"
            className="absolute -right-3 -top-3 z-0 group-hover:scale-110 transition-all"
            src="/annoucment.svg"
          />
          <p className="self-end">
            {courseContent[courseContent.length - 2].header}
          </p>
        </div>
        <div className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer">
          <p className="self-end">
            {courseContent[courseContent.length - 1].header}
          </p>
        </div>
      </div>
    </div>
  );
}
