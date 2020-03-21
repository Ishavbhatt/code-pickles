import React from "react";

const Header = () => (
  <header>
    <div className="left-section"></div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Features
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
        <span class="navbar-text">Navbar text with an inline element</span>
      </div>
    </nav>
  </header>
);

export default Header;
