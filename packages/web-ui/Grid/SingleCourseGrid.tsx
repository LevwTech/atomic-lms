import { Link, useParams } from "react-router-dom";
import styles from "./singleCourseGrid.module.css";

interface SingleCourseGridProps {
  courseContent: {
    title: string;
    img: string;
    icon: string;
  }[];
}

export function SingleCourseGrid({
  courseContent,
}: SingleCourseGridProps): JSX.Element {
  const { courseName } = useParams();
  return (
    <div
      className={`${styles.grayCardTypo} grid h-full w-full gap-[30px] grid-cols-3 grid-rows-3 pt-[30px] `}
    >
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full row-span-2 flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseName}/lectures`}
      >
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
        <p className="self-end">{courseContent[0].title}</p>
      </Link>
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
        <p className="self-end z-10">{courseContent[1].title}</p>
      </div>
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/sheetsIcon.png"
        />
        <p className="self-end z-10">{courseContent[2].title}</p>
      </div>
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/projectsIcon.png"
        />
        <p className="self-end z-10">{courseContent[3].title}</p>
      </div>
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/infoIcon.png"
        />
        <p className="self-end z-10">{courseContent[4].title}</p>
      </div>
      <div className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer">
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/attendIcon.png"
        />
        <p className="self-end z-10">{courseContent[5].title}</p>
      </div>

      <div className={`flex flex-col gap-[30px] ${styles.blueCardTypo}`}>
        <div className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer">
          <img
            alt="icon"
            className="absolute -right-3 -top-3 z-0 group-hover:scale-110 transition-all"
            src="/annoucment.svg"
          />
          <p className="self-end">{courseContent[6].title}</p>
        </div>
        <div className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer">
          <p className="self-end">{courseContent[7].title}</p>
        </div>
      </div>
    </div>
  );
}
