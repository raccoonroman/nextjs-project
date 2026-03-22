import Link from 'next/link';

import classes from './button.module.css';

export const Button = ({ className, link, children }) => {
  return (
    <Link className={`${classes.btn} ${className || ''}`} href={link}>
      {children}
    </Link>
  );
};
