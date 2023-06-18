import Link from 'next/link';
import { author } from '../../global.d';
import styles from './card.module.scss';


export default function Card({ slug, content }: {
    slug: string,
    content: any
}) {
    let sameAuthor = false;
    if ((content.Author == author) || !(content.Author)) {
        sameAuthor = true
    }

    return (
        <div className={styles.card__container} key={slug.toString()}>
            <Link href={`/${slug}`}>
                <div className={styles.card}>
                    <div className={styles.card__thumbnail}>
                        {content.Thumbnail ?
                            <img src={content.Thumbnail} alt={content.Title}
                                className={styles.card__thumbnail__img} loading='lazy' />
                            :
                            <img src='/images/default.png' alt={content.Title}
                                className={styles.card__thumbnail__img} loading='lazy' />
                        }
                    </div>
                    <div>
                        <div className={styles.card__meta}>
                            <time dateTime={content.Date} itemProp='published'>{content.Date}</time>
                            {
                                sameAuthor ?
                                    <Link href="/about" itemScope={true} role='author' itemType='http://schema.org/Person'>
                                        <span itemProp='name'>{content.Author || author}</span>
                                    </Link>
                                    :
                                    <span itemScope={true} role='author'
                                        itemType='http://schema.org/Person'
                                        itemProp='name'>{content.Author || author}</span>
                            }
                        </div>
                        <h2 className={styles.card__title}>{content.Title}</h2>
                    </div>

                </div>
            </Link>
        </div>
    )
}