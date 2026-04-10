import Link from 'next/link';

import classes from './button.module.css';

export const Button = ({ children, className, link, onClick }) => {
  if (link) {
    return (
      <Link className={`${classes.btn} ${className || ''}`} href={link}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={`${classes.btn} ${className || ''}`}>
      {children}
    </button>
  );
};
