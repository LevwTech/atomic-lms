import { CarousalLogic } from "@atomic/frontend-logic";

export function Carousal({ images }): JSX.Element {
  return (
    <CarousalLogic imagesLength={images.length}>
      {(current) => (
        <div className="w-[50%] h-full flex py-[70px] pr-[70px]">
          <img
            src={images[current].src}
            className="w-full h-full flex object-cover relative rounded-2xl"
          />
          <div className="py-10 px-24 flex absolute bottom-0 flex-col gap-2 text-white">
            <p className="font-bold text-[35px]">Lorem ipsum</p>
            <p className="w-[50%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              fermentum vitae mi id sagittis. Quisque pulvinar blandit dolor,
              nec luctus nunc ornare faucibus. Proin pretium, elit nec auctor
              hendrerit, eros quam aliquet leo, ut tempus nunc tortor in nulla.
              Aenean mollis ante ut commodo tincidunt. Aenean vehicula sagittis
              tortor, vitae sodales erat euismod vel. Aenean vel finibus neque,
              sed varius lectus. Suspendisse potenti. Nam nec convallis lectus.
              Suspendisse potenti.
            </p>
            <div className="flex gap-3 self-center mt-10">
              {images.map((_, index) => (
                <span
                  className={`${
                    index === current
                      ? "h-5 w-10 bg-white lg:h-4 lg:w-8"
                      : "h-5 w-5 bg-white lg:h-4 lg:w-4 "
                  } cursor-pointer rounded-full transition-all`}
                  key={index}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </CarousalLogic>
  );
}
