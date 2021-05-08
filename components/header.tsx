import Link from 'next/link'
import { siteName } from '../global.d'
import styles from './header.module.scss'

export default function Header(is_index: string) {
    return (
        <div className={styles.container}>
            <div className={styles.container__inner}>
                <header className={styles.header}>
                    <Link href="/">
                        <a>
                            {is_index
                                ? <h1 className={styles.header__title}>{siteName}</h1>
                                : <div className={styles.header__title}>{siteName}</div>
                            }
                        </a>
                    </Link>
                </header>
                <nav className={styles.nav}>
                    <ul className={styles.nav__list}>
                        <li className={styles.nav__item}>
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li className={is_index ? styles.nav__item_active : styles.nav__item}> 
                            <Link href="/">
                                <a>Blog</a>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link href="/">
                                <a>Contact</a>
                            </Link>
                        </li>
                        <li className={styles.nav__item}>
                            <Link href="/">
                                <a>Support</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}