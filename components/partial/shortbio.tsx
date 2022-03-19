import styles from './shortbio.module.scss'

export default function ShortBio({ bio, author }: {
    bio: string,
    author: string
}) {
    let paragraphs: Array<JSX.Element> = bio.split('\n').map(paragraph => {
        return <p className={styles.container__paragraph}>{paragraph}</p>
    })
    return (
        <div className={styles.container} itemScope={true} itemProp='author'
            itemType='http://schema.org/Person' key='short-bio'>
            <div className={styles.container__image}>
                <img src='/images/profile.jpeg' alt={author} loading='lazy' />
            </div>
            <h3 className={styles.author} itemScope={true} itemProp='name'>{author}</h3>
            {paragraphs}
        </div>
    )
}