import styles from "./AnnouncementsCard.module.css";

interface AnnouncementsCardProps {
  header: string;
  time: string;
  date: string;
  disc: string;
  imgSrc: string;
  imgAlt: string;
}

export function AnnouncementsCard({
  header,
  time,
  date,
  disc,
  imgSrc,
  imgAlt,
}: AnnouncementsCardProps): JSX.Element {
  return (
    <div className="p-[15px] flex gap-[25px] h-[200px] w-full bg-[var(--White)] rounded-[10px]">
      <span className="bg-red-500 w-[20px] h-full" />
      <img alt={imgAlt} className="w-[250px]" src={imgSrc} />
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-center">
          <p className={`${styles.cardTypographyHeader}`}>{header}</p>
          <p className={`${styles.cardTypographyTime}`}>{time}</p>
        </div>
        <p className={`${styles.cardTypographyDate}`}>{date}</p>
        <p className={`${styles.cardTypographyDisc}`}>{disc}</p>
      </div>
    </div>
  );
}
