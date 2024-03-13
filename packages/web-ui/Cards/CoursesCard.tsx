import styles from "./CoursesCard.module.css";

interface CoursesCardProps {
  img: string;
  courseName: string;
  semester: number;
  index: number;
}

export function CoursesCard({
  img,
  courseName,
  semester,
  index,
}: CoursesCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div
        className={`w-full h-[135px] flex justify-center items-center rounded-[5px] G${
          index + 1
        }`}
      >
        <img alt={`Asset${index + 1}`} src={img} />
      </div>
      <div className="">
        <p className={styles.cardTypographyHeader}>{courseName}</p>
        <p className={styles.cardTypographySubHeader}>Semester {semester}</p>
      </div>
    </div>
  );
}
