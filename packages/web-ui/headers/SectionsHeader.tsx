import styles from "./SectionsHeader.module.css";

interface SectionsHeaderProps {
  sectionName: string | undefined;
  button?: boolean | undefined;
  icon?: string | undefined;
}

export function SectionsHeader({
  sectionName,
  button,
  icon,
}: SectionsHeaderProps): JSX.Element {
  return (
    <div className="flex h-[75px] text-white items-center px-[15px] py-[15px] w-full rounded-[5px] justify-between bg-[var(--Primary)]">
      {icon ? (
        <div className="flex gap-4">
          <img alt="icon" src={icon} />
          <p className={`${styles.sectionName}`}> {sectionName}</p>
        </div>
      ) : (
        <p className={`${styles.sectionName}`}> {sectionName}</p>
      )}
      {button ? button : null}
    </div>
  );
}
