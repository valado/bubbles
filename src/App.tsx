import { FC } from "react";
import { InteractiveGradient } from "../lib/InteractiveGradient";

const App: FC = () => {
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <InteractiveGradient size={"500px"} morph float>
        <span>test</span>
      </InteractiveGradient>
    </div>
  );
};

export default App;
