import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import cn from "classnames";
import { useSelector } from "react-redux";

function Navigation() {
  const location = useLocation();
  const status = useSelector((store) => store.game.status);

  return (
    <>
      <nav className={styles.nav}>
        {!status ? (
          <NavLink
            to="/"
            className={cn(`${styles.navlink}`, {
              activeLink: location.pathname === "/",
            })}
          >
            Главное
          </NavLink>
        ) : (
          <NavLink
            to="/game"
            className={cn(`${styles.navlink}`, {
              activeLink: location.pathname === "/game",
            })}
          >
            Игра
          </NavLink>
        )}

        <NavLink
          to="/statistics"
          className={cn(`${styles.navlink}`, {
            activeLink: location.pathname === "/statistics",
          })}
        >
          Статистика
        </NavLink>
      </nav>
      <style jsx>{`
        .activeLink {
          background: #ffffff;
          padding: 4px 8px;
          border-radius: 10px;
          color: black;
        }
      `}</style>
    </>
  );
}

export default Navigation;
