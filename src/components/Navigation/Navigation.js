import React from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";
import { logout } from "../Login/loginSlice";
import DropdownMenu from "../Xodimlar/dropdownMenuForLog/DropdownMenu";

export default function Navigation({ menus, role }) {
  const dispatch = useDispatch();

  if (role === "ROLE_ADMIN") {
    return (
      <div className="navigation_wrapper">
        <div className="navigation-logo">
          <img
            src={require("../images/icon_png.png")}
            alt={"logo"}
            width={"50px"}
            height={"50px"}
          />{" "}
          <br />
          <p className="navigation_logo_text">
            <strong>TEZKOR TELEGRAF</strong>
          </p>
        </div>

        <div className="main-navigation">
          {menus.map((menu) => (
            <NavLink
              className={(isActive) =>
                "nav_link" + (!isActive ? "" : " active")
              }
              to={menu.path}
              key={menu.path}
            >
              <span className="span_icon">
                <i className={menu.icon}></i>
              </span>
              {menu.name}
            </NavLink>
          ))}
          <DropdownMenu />
        </div>
        <div className="logout-btn-wrapper">
          <div class="log_center">
            <ChangePasswordModal />
            <form className="d-flex " role="search">
              <button
                className="logout-btn"
                onClick={() => dispatch(logout())}
                type="submit"
              >
                <span>
                  <i class="fa-solid fa-right-from-bracket fa-2x"></i>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navigation_wrapper">
        <div className="navigation-logo">
          <img
            src={require("../images/icon_png.png")}
            alt={"logo"}
            width={"50px"}
            height={"50px"}
          />{" "}
          <br />
          <p className="navigation_logo_text">
            <strong>TEZKOR TELEGRAF</strong>
          </p>
        </div>

        <div className="main-navigation">
          {menus.map((menu) => (
            <NavLink
              className={(isActive) =>
                "nav_link" + (!isActive ? "" : " active")
              }
              to={menu.path}
              key={menu.path}
            >
              <span className="span_icon">
                <i className={menu.icon}></i>
              </span>
              {menu.name}
            </NavLink>
          ))}
        </div>
        <div className="logout-btn-wrapper">
          <div class="log_center">
            <ChangePasswordModal />
            <form className="d-flex " role="search">
              <button
                className="logout-btn"
                onClick={() => dispatch(logout())}
                type="submit"
              >
                <span>
                  <i class="fa-solid fa-right-from-bracket fa-2x"></i>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
