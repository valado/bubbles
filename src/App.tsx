import { FC } from "react";
import { InteractiveGradient } from "../lib/InteractiveGradient";

const App: FC = () => {
  return (
    <>
      <div
        style={{
          top: "-50vh",
          right: "-30vw",
          position: "absolute",
        }}
      >
        <InteractiveGradient size={"80vw"} morph />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
        }}
      >
        <InteractiveGradient size={"15vw"} morph float>
          <span
            style={{ color: "white", fontWeight: "bold", userSelect: "none" }}
          >
            Dynamic Gradient
          </span>
        </InteractiveGradient>
      </div>
    </>
  );
};

export default App;
