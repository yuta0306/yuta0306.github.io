import Link from 'next/link'
import Image from 'next/image'

import styles from './card.module.scss'

export default function Card({slug, content} : {
    slug: string,
    content: any
}) {
    return (
        <Link href={slug}>
            <a>
                <div className={styles.card}>
                    <div className={styles.card__thumbnail}>

                    </div>
                    <div>
                        <h2>{content.Title}</h2>
                        <time dateTime={content.Date}>{content.Date}</time>
                    </div>
                
                </div>
            </a>
        </Link>
    )
}