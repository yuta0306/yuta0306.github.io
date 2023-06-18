import Link from 'next/link'
import { useState } from 'react'
import { contactForm, siteName } from '../global.d'
import styles from './header.module.scss'


export default function Header({ index = 'blog', categories = [] }:
    {
        index?: string,
        categories?: Array<string>,
    }
) {
    const [openMenu, setOpenMenu] = useState(false)
    const menuToggle = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.container__inner}>
                    <header className={styles.header}>
                        <Link href="/">
                            {index == 'index'
                                ? <h1 className={styles.header__title}>{siteName}</h1>
                                : <div className={styles.header__title}>{siteName}</div>
                            }
                        </Link>
                    </header>
                    <div className={styles.hamburger} onClick={() => menuToggle()}>
                        <div>
                            <img src='/icons/hamburger.png' />
                        </div>
                    </div>
                    <nav className={openMenu ? styles.nav : styles.nav__closed}>
                        <ul className={styles.nav__list}>
                            <li className={index == 'about' ? styles.nav__item_active : styles.nav__item} key='about'>
                                <Link href="/about">
                                    About
                                </Link>
                            </li>
                            <li className={index == 'blog' || index == 'index' ? styles.nav__item_active : styles.nav__item} key='blog'>
                                <Link href="/">
                                    Blog
                                </Link>
                            </li>
                            <li className={index == 'contact' ? styles.nav__item_active : styles.nav__item} key='contact'>
                                <Link href={contactForm ? contactForm : "/"}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={styles.category}>
                <ul className={styles.category__items}>
                    {
                        categories.map(category => {
                            return (
                                <Link href={`/category/${category}/1`} className={styles.category__item}>
                                    <li key={category}>{category}</li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}
