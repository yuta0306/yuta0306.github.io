import Link from 'next/link'

import { author, authorLink, siteName } from '../global.d'
import styles from './footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__inner}>
                <div>
                    <Link href='/privacy-policy' className={styles.footer__link}>
                        プライバシーポリシー
                    </Link>
                </div>
                <div className={styles.footer__title}>
                    <Link href="/">
                        {siteName}
                    </Link>
                </div>
                <div className={styles.footer__small}>
                    <small>Powered by <Link href={authorLink} target="_blank" className={styles.footer__small__link}>{author}</Link></small>
                </div>
            </div>
        </footer>
    )
}