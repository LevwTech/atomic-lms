import { Link } from "react-router-dom";
import styles from "./singleCourseGrid.module.css";

interface SingleCourseGridProps {
  courseContent: {
    _id: string;
    title: string;
    description?: string;
  }[];
  courseId: string;
}

export function SingleCourseGrid({
  courseContent,
  courseId,
}: SingleCourseGridProps): JSX.Element {
  return (
    <div
      className={`${styles.grayCardTypo} grid h-full w-full gap-[30px] grid-cols-3 grid-rows-3 pt-[30px] `}
    >
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full row-span-2 flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[0]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute top-36 right-0 z-10 w-52 group-hover:scale-105 transition-all"
          src="/Asset 16.png"
        />
        <img
          alt="icon"
          className="absolute left-0 top-0 w-52 group-hover:scale-110 transition-all"
          src="/Exporting/Svg/Styling/Lectures.svg"
        />
        <p className="self-end">{courseContent[0].title}</p>
      </Link>
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full col-span-2 flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[1]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute right-16 bottom-0 z-10 w-44 group-hover:scale-105 transition-all"
          src="/Asset 15.png"
        />
        <img
          alt="icon"
          className="absolute right-0 bottom-0 z-0 w-52 group-hover:scale-110 transition-all"
          src="/Exporting/Svg/Styling/Exams.svg"
        />
        <p className="self-end z-10">{courseContent[1].title}</p>
      </Link>
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[2]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/sheetsIcon.png"
        />
        <p className="self-end z-10">{courseContent[2].title}</p>
      </Link>
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[3]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/projectsIcon.png"
        />
        <p className="self-end z-10">{courseContent[3].title}</p>
      </Link>
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[4]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/infoIcon.png"
        />
        <p className="self-end z-10">{courseContent[4].title}</p>
      </Link>
      <Link
        className="p-[20px] bg-[var(--WDarker)] h-full w-full flex rounded-[10px] relative overflow-hidden group cursor-pointer"
        to={`/courses/${courseId}/${courseContent[5]._id.toLowerCase()}`}
      >
        <img
          alt="icon"
          className="absolute right-0 top-0 z-0 group-hover:scale-110 transition-all"
          src="/attendIcon.png"
        />
        <p className="self-end z-10">{courseContent[5].title}</p>
      </Link>

      <div className={`flex flex-col gap-[30px] ${styles.blueCardTypo}`}>
        <Link
          className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer"
          to={`/courses/${courseId}/${courseContent[6]._id.toLowerCase()}`}
        >
          <img
            alt="icon"
            className="absolute -right-3 -top-3 z-0 group-hover:scale-125 transition-all bg-[var(--Secondary)] p-2 rounded-full"
            src="/annoucment.svg"
          />
          <p className="self-end">{courseContent[6].title}</p>
        </Link>
        <Link
          className="p-[20px] bg-[var(--Primary)] h-full w-full flex rounded-[10px] relative cursor-pointer"
          to={`/courses/${courseId}/${courseContent[7]._id.toLowerCase()}`}
        >
          <p className="self-end">{courseContent[7].title}</p>
        </Link>
      </div>
    </div>
  );
}
