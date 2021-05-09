import Link from 'next/link'
import Image from 'next/image'

import styles from './card.module.scss'
import {author} from '../../global.d'

export default function Card({slug, content} : {
    slug: string,
    content: any
}) {
    let sameAuthor = false;
    if ((content.Author == author) || !(content.Author)) {
        sameAuthor = true
    }

    return (
        <Link href={slug}>
            <a>
                <div className={styles.card}>
                    <div className={styles.card__thumbnail}>

                    </div>
                    <div>
                        <div className={styles.card__meta}>
                            <time dateTime={content.Date}>{content.Date}</time>
                            {
                                sameAuthor ?
                                <Link href="/about">
                                    <a>
                                        <span>{content.Author || author}</span>
                                    </a>
                                </Link>
                                :
                                <span>{content.Author || author}</span>
                            }
                        </div>
                        <h2>{content.Title}</h2>
                    </div>
                
                </div>
            </a>
        </Link>
    )
}