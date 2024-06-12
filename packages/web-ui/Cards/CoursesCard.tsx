import styles from "./CoursesCard.module.css";
import { Link } from "react-router-dom";

interface CoursesCardProps {
  id: string;
  img: string;
  courseName: string;
  academicDuration: string;
  index: number;
}

export function CoursesCard({
  id,
  img,
  courseName,
  academicDuration,
  index,
}: CoursesCardProps): JSX.Element {
  return (
    <Link
      className={styles.card}
      to={{
        pathname: `/courses/${id}`,
        state: {
          courseName,
        },
      }}
    >
      <div
        className={`w-full h-[105px] flex justify-center items-center rounded-[5px] G${
          index + 1
        }`}
      >
        <img alt={`Asset${index + 1}`} src={img} />
      </div>
      <div className="flex flex-col">
        <p className={styles.cardTypographyHeader}>{courseName}</p>
        <p className={styles.cardTypographySubHeader}>{academicDuration}</p>
      </div>
    </Link>
  );
}
