import { CarousalLogic } from "@atomic/frontend-logic";

export function Carousal({ images }: { images: HTMLImageElement[] }) {
  return (
    <CarousalLogic imagesLength={images.length}>
      {(current, setCurrent) => (
        <div className="h-full w-full flex relative">
          <div className="h-full w-full flex absolute z-10 bg-gradient-to-tr from-black/90 to-red-500/20  rounded-2xl "></div>
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="w-full h-full flex object-cover relative rounded-2xl"
          />
          <div className="py-10 px-20 flex absolute bottom-0 flex-col gap-2 text-white z-20">
            <p className="font-bold text-[35px]">Lorem ipsum</p>
            <p className="w-[60%] tracking-wider font-thin">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              fermentum vitae mi id sagittis. Quisque pulvinar blandit dolor,
              nec luctus nunc ornare faucibus. Proin pretium, elit nec auctor
              hendrerit, eros quam aliquet leo, ut tempus nunc tortor in nulla.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              impedit.
            </p>
            <div className="flex gap-3 self-center mt-10">
              {images.map((_: HTMLImageElement, index: number) => (
                <span
                  onClick={() => setCurrent(index)}
                  className={`${
                    index === current
                      ? "h-5 w-10 bg-white lg:h-3 lg:w-8"
                      : "h-5 w-5 bg-white lg:h-3 lg:w-3 "
                  } cursor-pointer rounded-full transition-all duration-500 ease-in-out`}
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
