import Link from 'next/link'
import { siteName, contactForm } from '../global.d'
import styles from './header.module.scss'

export default function Header({index='blog', categories=[]}:
    {
        index?: string,
        categories?: Array<string>,
    }
    ) {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.container__inner}>
                <header className={styles.header}>
                    <Link href="/">
                        <a>
                            {index == 'index'
                                ? <h1 className={styles.header__title}>{siteName}</h1>
                                : <div className={styles.header__title}>{siteName}</div>
                            }
                        </a>
                    </Link>
                </header>
                <nav className={styles.nav}>
                    <ul className={styles.nav__list}>
                        <li className={index == 'about' ? styles.nav__item_active : styles.nav__item} key='about'>
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li className={index == 'blog' || index == 'index' ? styles.nav__item_active : styles.nav__item} key='blog'> 
                            <Link href="/">
                                <a>Blog</a>
                            </Link>
                        </li>
                        <li className={index == 'contact' ? styles.nav__item_active : styles.nav__item} key='contact'>
                            <Link href={contactForm ? contactForm : "/"}>
                                <a>Contact</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <ul className={styles.category}>
            {
                categories.map(category => {
                    return (
                        <Link href={`/category/${category}`}>
                            <a className={styles.category__item}>
                                <li key={category}>{category}</li>
                            </a>
                        </Link>
                    )
                })
            }
        </ul>
        </>
    )
}