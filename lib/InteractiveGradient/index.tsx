import {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

type GradientCoordinates = {
  curX: number;
  curY: number;
  tgX: number;
  tgY: number;
};

export type InteractiveGradientProps = {
  size: string;
  float?: boolean;
  morph?: boolean;
};

export const InteractiveGradient: FC<
  PropsWithChildren<InteractiveGradientProps>
> = ({ float, morph, size, children }) => {
  const rootEl = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState<GradientCoordinates>({
    curX: 0,
    curY: 0,
    tgX: 0,
    tgY: 0,
  });

  const updateMouseCoordinates = useCallback((event: MouseEvent) => {
    setCoordinates((prevCoordinates) => ({
      ...prevCoordinates,
      tgX: event.offsetX,
      tgY: event.offsetY,
    }));
  }, []);

  useEffect(() => {
    const move = () => {
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        curX:
          prevCoordinates.curX +
          (prevCoordinates.tgX - prevCoordinates.curX) / 20,
        curY:
          prevCoordinates.curY +
          (prevCoordinates.tgY - prevCoordinates.curY) / 20,
      }));
      requestAnimationFrame(() => {
        move();
      });
    };
    move();

    const currentEl = rootEl.current;
    if (currentEl) {
      currentEl.addEventListener("mousemove", updateMouseCoordinates);
    }
    return () => {
      if (currentEl) {
        currentEl?.removeEventListener("mousemove", updateMouseCoordinates);
      }
    };
  }, [updateMouseCoordinates, rootEl]);

  return (
    <div
      style={
        {
          "--color-bg1": "rgb(108, 0, 162)",
          "--color-bg2": "rgb(0, 17, 82)",
          "--color1": "18, 113, 255",
          "--color2": "221, 74, 255",
          "--color3": "100, 220, 255",
          "--color4": "200, 50, 50",
          "--color5": "180, 180, 50",
          "--color-interactive": "140, 100, 255",
          "--circle-size": "80%",
        } as CSSProperties
      }
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
        }}
      >
        {children}
      </div>
      <div
        ref={rootEl}
        className={`${styles.gradientBg} ${float ? styles.float : ""} ${
          morph ? styles.morph : ""
        }`}
        style={{
          width: size,
          height: size,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className={styles.gradientsContainer}>
          <div className={styles.g1} />
          <div className={styles.g2} />
          <div className={styles.g3} />
          <div className={styles.g4} />
          <div className={styles.g5} />
          <div
            className={styles.interactive}
            style={{
              transform: `translate(${Math.round(
                coordinates.curX
              )}px, ${Math.round(coordinates.curY)}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
