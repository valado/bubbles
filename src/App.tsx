import { FC } from "react";
import { InteractiveGradient } from "../lib/InteractiveGradient";

const App: FC = () => {
  return (
    <>
      <div
        style={{
          top: "-150px",
          right: "-150px",
          position: "absolute",
        }}
      >
        <InteractiveGradient size={"800px"} morph />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
        }}
      >
        <InteractiveGradient size={"150px"} morph float>
          <span
            style={{ color: "white", fontWeight: "bold", userSelect: "none" }}
          >
            DYNAMIC GRADIENT
          </span>
        </InteractiveGradient>
      </div>
    </>
  );
};

export default App;
