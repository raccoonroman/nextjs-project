import Link from 'next/link';
import Image from 'next/image';

import LogoImg from '@/assets/logo.png';
import classes from './header.module.css';
import { HeaderBg } from './header-bg';
import NavLink from '../nav-link/nav-link';

export const Header = () => {
  return (
    <>
      <HeaderBg />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={LogoImg} priority alt="Food Sharing App Logo" />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
