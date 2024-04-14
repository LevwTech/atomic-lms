import { CarousalLogic } from "@atomic/frontend-logic";
import { motion } from "framer-motion";

interface Images {
  src: string;
  alt: string;
}

export function BannerCarousal({ images }: { images: Images[] }): JSX.Element {
  return (
    <CarousalLogic autoScrollDuration={5000} imagesLength={images.length}>
      {(current, setCurrent) => (
        <div className="flex gap-[15px] flex-col items-center">
          <motion.img
            alt={images[current].alt}
            key={current}
            animate={{ x: 0, opacity: 1 }}
            className="h-[250px] w-full rounded-[10px] object-cover"
            exit={{ x: -300, opacity: 0 }}
            initial={{ x: 300, opacity: 0 }}
            src={images[current].src}
            transition={{ duration: 0.3, type: "tween" }}
          />
          <div className="flex gap-2 items-center">
            {images.map((_, index: number) => (
              <button
                className={`${
                  index === current
                    ? "h-5 w-5 bg-[var(--Primary)] lg:h-2 lg:w-2"
                    : "h-5 w-5 bg-[var(--Gray)] lg:h-2 lg:w-2"
                } cursor-pointer rounded-full transition-all duration-500 ease-in-out`}
                key={index}
                onClick={() => {
                  setCurrent(index);
                }}
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </CarousalLogic>
  );
}
