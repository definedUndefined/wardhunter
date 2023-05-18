import { useRef, useState, useEffect } from "react";
import { useMouse } from "ahooks";
import { cn } from "@/utils/cn";

type ComponentProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardGroup({ children, className }: ComponentProps) {
  const [cards, setCards] = useState<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(containerRef.current);

  useEffect(() => {
    if (containerRef.current) {
      const cards = Array.from(containerRef.current.children).map(
        (child) => child as HTMLElement
      );

      setCards(cards);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      onMouseMove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse]);

  const isMouseInsideContainer = () => {
    if (!containerRef.current) return false;

    const { elementX, elementY, elementW, elementH } = mouse;

    const notOnTheLeft = elementX > 0;
    const notOnTheRight = elementX < elementW;
    const notOnTheTop = elementY > 0;
    const notOnTheBottom = elementY < elementH;

    return notOnTheLeft && notOnTheRight && notOnTheTop && notOnTheBottom;
  };

  const onMouseMove = () => {
    const mouseInsideContainer = isMouseInsideContainer();

    if (containerRef.current && mouseInsideContainer) {
      const { top: containerTop, left: containerLeft } =
        containerRef.current.getBoundingClientRect();

      cards.forEach((card) => {
        const { top: cardTop, left: cardLeft } = card.getBoundingClientRect();

        // The card offset relative to the container
        const differenceX = cardLeft - containerLeft;
        const differenceY = cardTop - containerTop;

        // The mouse relative position to the container minus the offset
        const cardX = mouse.elementX - differenceX;
        const cardY = mouse.elementY - differenceY;

        card.style.setProperty("--mouse-x", `${cardX}px`);
        card.style.setProperty("--mouse-y", `${cardY}px`);
      });
    }
  };

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}

export function Card({ children, className }: ComponentProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-px overflow-hidden bg-zinc-800",
        "before:bg-primary-500 before:pointer-events-none before:absolute before:-left-48 before:-top-48 before:z-30 before:h-96 before:w-96 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 before:hover:opacity-20",
        "after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.primary.400),transparent)] after:group-hover:opacity-100 after:z-10",
        className
      )}
    >
      {children}
    </div>
  );
}
