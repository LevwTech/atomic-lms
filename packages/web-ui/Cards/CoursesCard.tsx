import { Link } from "react-router-dom";

interface CoursesCardProps {
  img: string;
  courseName: string;
  semester: number;
  index: number;
  styles: string;
}

export function CoursesCard({
  img,
  courseName,
  semester,
  index,
  styles,
}: CoursesCardProps): JSX.Element {
  return (
    <Link className={styles.card} to={`/courses/${courseName}`}>
      <div
        className={`w-full h-[135px] flex justify-center items-center rounded-[5px] G${
          index + 1
        }`}
      >
        <img alt={`Asset${index + 1}`} src={img} />
      </div>
      <div className="flex flex-col">
        <p className={styles.cardTypographyHeader}>{courseName}</p>
        <p className={styles.cardTypographySubHeader}>Semester {semester}</p>
      </div>
    </Link>
  );
}
