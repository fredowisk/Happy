import React from 'react';

import logoSignIn from "../images/LogoSignin.svg";
import '../styles/components/aside.css';

export default function Aside() {
  return (
    <aside className="aside-left">
      <header>
        <img src={logoSignIn} alt="Happy" />
      </header>
      <footer>
        <strong>Jacutinga</strong>
        <span>Minas Gerais</span>
      </footer>
    </aside>
  )
}