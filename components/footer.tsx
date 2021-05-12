import Link from 'next/link'

import styles from './footer.module.scss'
import { siteName, author, authorLink } from '../global.d'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__inner}>
                <div>
                    <Link href='/privacy-policy'>
                        <a className={styles.footer__link}>
                            プライバシーポリシー
                        </a>
                    </Link>
                </div>
                <div className={styles.footer__title}>
                    <Link href="/">
                        <a>{siteName}</a>
                    </Link>
                </div>
                <div className={styles.footer__small}>
                    <small>Powered by <Link href={authorLink}><a target="_blank" className={styles.footer__small__link}>{author}</a></Link></small>
                </div>
            </div>
        </footer>
    )
}