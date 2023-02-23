import Link from 'next/link';
import styles from './header.module.scss';
import commonStyles from '../../styles/common.module.scss';

export default function Header() {
  return (
    <div className={`${commonStyles.container} ${styles.nav}`}>
      <Link href="/">
        <img src="/Logo.svg" alt="logo" />
      </Link>
    </div>
  );
}
