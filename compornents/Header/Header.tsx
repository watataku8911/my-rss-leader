import Link from "next/link";
import { useCallback, useState } from "react";
import styles from "./Header.module.css";
import classNames from "classnames";
import classes from "./Header.module.css";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);

  const toggleChanger = useCallback(() => {
    setOpen(!open);
    setActive(!is_active);
  }, [open]);

  const classes: string = classNames(styles.navToggle, {
    [styles.active]: is_active,
  });

  return (
    <header className={styles.header}>
      <div className={classes} onClick={toggleChanger}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {open && (
        <nav className={styles.navi}>
          <ul className={styles.navi__wrap}>
            <li>
              <Link href="/">Zenn</Link>
            </li>

            <li>
              <Link href="/ics-media">ics.media</Link>
            </li>

            <li>
              <Link href="/cookpad">Cookpad開発者ブログ</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
export default Header;
