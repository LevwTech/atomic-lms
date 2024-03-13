import AnnouncementsCard from "../Cards/AnnouncementsCard";

export function AnnouncementsGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-2 w-full gap-[25px]">
      {[...Array(10)].map((_, i) => (
        <AnnouncementsCard
          key={i}
          header={"Deadline Assignment"}
          time={"11:59PM"}
          date={"10 Mar 2024"}
          disc={
            "Lorem ipsum dolor sit amet consectetur. Porttitor consequat cursus platea ut turpis rhoncus fringilla risus sed."
          }
          imgSrc={"/Frame 465.png"}
          imgAlt={"assignment"}
        />
      ))}{" "}
    </div>
  );
}
