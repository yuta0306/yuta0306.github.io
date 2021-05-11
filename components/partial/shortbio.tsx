import styles from './shortbio.module.scss'

import Image from 'next/image'

export default function ShortBio({bio, author} : {
    bio: string,
    author: string
}) {
    let paragraphs: Array<JSX.Element> = bio.split('\n').map(paragraph => {
        return <p className={styles.container__paragraph}>{paragraph}</p>
    })
    return (
        <div className={styles.container}  itemScope={true} itemProp='author'
            itemType='http://schema.org/Person'>
            <div className={styles.container__image}>
                <Image src='/images/profile.jpeg' alt={author} layout='fill' 
                    objectFit='cover' objectPosition='50% 50%' quality={100} loading='lazy' />
            </div>
            <h3 className={styles.author} itemScope={true} itemProp='name'>{author}</h3>
            {paragraphs}
        </div>
    )
}