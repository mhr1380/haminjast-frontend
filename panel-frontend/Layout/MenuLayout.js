import bottom_arrow from "../assets/icons/bottom-arrow.png";
import triangle from "../assets/icons/triangle.png";
import { useEffect, useState } from "react";
import MenuItems from "./menuItems";
import menu from "../assets/icons/menu.png";
import bottom_arrow_white from "../assets/icons/bottom-arrow-white.png";
import power from "../assets/icons/power.png";
import arrow_left from "../assets/icons/arrow-left.png";
import arrow_right from "../assets/icons/arrow-right.png";
import arrow_left_menu from "../assets/icons/arrow-left-menu.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavLink } from "@/components/NavLink";
const MenuLayout = ({ children }) => {
  const [menuItems, setMenuItems] = useState(MenuItems);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarClose, setSidebarClose] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [lastMenuItemHolder, setLastMenuItemHolder] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (sidebarClose) {
      const lastMenuItem = menuItems.find((item) => item.open === true);
      setLastMenuItemHolder(lastMenuItem);
      const newMenuItems = menuItems.map((menu_item) => {
        if (menu_item.id === lastMenuItem?.id) {
          return { ...menu_item, open: false, active: true };
        }
        return { ...menu_item, open: false };
      });
      setMenuItems(newMenuItems);
    } else {
      const newMenuItems = menuItems.map((menu_item) => {
        if (menu_item.id === lastMenuItemHolder?.id) {
          menu_item.open = true;
        }
        return menu_item;
      });
      setMenuItems(newMenuItems);
    }
  }, [sidebarClose]);
  return (
    <>
      <div
        className={`sidebar-container ${sidebarClose ? "close" : ""} ${
          mobileSidebarOpen ? "show-mobile-sidebar" : ""
        }`}
      >
        <div className={`sidebar-header ${sidebarClose ? "mini" : ""}`}>
          <img
            src={arrow_right.src}
            alt="menu"
            className={`right-arrow`}
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
          <Link href="/" className={`logo ${sidebarClose ? "hide" : ""}`}>
            <h1>همینجاست</h1>
          </Link>
        </div>
        <div className="sidebar-body">
          <div className="sidebar-menu">
            {menuItems.map((item) => {
              if (item.children.length > 0) {
                return (
                  <NavLink href={item.link}>
                    {" "}
                    <img
                      className="sidebar-icon"
                      src={
                        item.open || item.active
                          ? item.select_icon.src
                          : item.icon.src
                      }
                      alt="music-library"
                    />
                    <span>{item.title}</span>
                  </NavLink>
                );
              } else {
                return (
                  <NavLink href={item.link} className="sidebar-menu-item">
                    {" "}
                    <img
                      className="sidebar-icon"
                      src={
                        item.open || item.active
                          ? item.select_icon.src
                          : item.icon.src
                      }
                      alt="icon"
                    />
                    <span>{item.title}</span>
                  </NavLink>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div
        className={`topmenu-container ${sidebarClose ? "open" : ""} ${
          mobileSidebarOpen ? "overlay" : ""
        }`}
      >
        <div className="topmenu-right">
          <img
            onClick={() => {
              setSidebarClose(!sidebarClose);
            }}
            className="sidebar-icon"
            src={sidebarClose ? arrow_left.src : menu.src}
            alt="hamburger-menu"
          />
        </div>
        <div
          className={`topmenu-handle-height ${profileMenuOpen ? "open" : ""}`}
          onClick={() => {
            setProfileMenuOpen(!profileMenuOpen);
          }}
        >
          {" "}
          <div className="topmenu-left-container">
            <div className="topmenu-left">
              <span>{"خوش آمدید!"}</span>
              <img src={bottom_arrow_white.src} alt="پروفایل" />
            </div>

            <div className="topmenu-left">
              <span>خروج</span>
              <img
                className="topmenu-left-inner-icon"
                src={power.src}
                alt="خروج"
              />
            </div>
          </div>
        </div>
        <img
          src={menu.src}
          alt="menu"
          className="mobile-hamburger"
          onClick={() => {
            setMobileSidebarOpen(!mobileSidebarOpen);
          }}
        />
        <h1 className="logo mobile">همینجاست</h1>
      </div>
      <div
        className={`content-container ${
          sidebarClose ? "padding-right-48" : ""
        }`}
      >
        {children}
      </div>
      <div
        className={`layout-overlay ${mobileSidebarOpen ? "open" : ""}`}
      ></div>
    </>
  );
};

export default MenuLayout;
