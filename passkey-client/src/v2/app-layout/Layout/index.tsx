import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Window from "../../components/Window";
import { pages } from "../../constants/pages";
import WindowsContainer from "../../components/WindowsContainer";
import routes from "../../../shared/constants/route";
import { useEffect } from "react";
import Menu from "../Menu";
import styles from "./style.module.css";
import useAuth from "../../hooks/useAuth";

export default function Layout() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const page = pages.find((page) => page.route === pathname) || pages[0];
  const isHome = pathname === routes.home;

  useEffect(() => {
    window.document.title = `${page.title} | @bagustambunan`;
  }, [page]);

  useEffect(() => {
    if (isLoggedIn && pathname === routes.login) {
      navigate(routes.home);
    }
    if (!isLoggedIn && pathname !== routes.login) {
      navigate(routes.login);
    }
  }, [isLoggedIn, pathname, navigate]);

  return (
    <main className={styles.layout}>
      <div className={styles.layoutMain}>
        <Window
          windowKey={page.windowKey}
          title={page.icon + " " + page.title}
          closable={!isHome}
          onClose={() => {
            if (!isHome) {
              navigate(routes.home);
            }
          }}
        >
          <Outlet />
        </Window>
        <WindowsContainer />
      </div>
      <div className={styles.layoutMenu}>
        <Menu />
      </div>
    </main>
  );
}
