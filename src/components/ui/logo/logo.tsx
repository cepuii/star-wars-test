import logo from "/logo.svg";

import "./logo.style.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} className="logo" alt="Vite logo" />
      <h1 className="title">Characters</h1>
    </div>
  );
};

export default Logo;
