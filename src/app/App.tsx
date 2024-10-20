import CardsList from "../components/cardsList/cardsList";
import Logo from "../components/ui/logo/logo";
import StarsBackground from "../components/ui/starsBackground/starsBackground";

function App() {
  return (
    <>
      <header>
        <Logo />
      </header>
      <section>
        <CardsList />
      </section>
      <StarsBackground />
    </>
  );
}

export default App;
