import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";

import { ActiveLink } from "../ActiveLink";

import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";
import { useRouter } from "next/router";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
