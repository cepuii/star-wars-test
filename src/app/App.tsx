import { useState } from "react";
import Logo from "../components/ui/logo/logo";
import StarsBackground from "../components/ui/starsBackground/starsBackground";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StarsBackground />
      <header>
        <Logo />
      </header>
      <section>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </section>
    </>
  );
}

export default App;
