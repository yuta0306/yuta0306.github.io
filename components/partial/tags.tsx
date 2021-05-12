import Link from 'next/link'

import styles from './tags.module.scss'

export default function Tags({tags} : {
    tags: Array<string>
}) {
    return (
        <div className={styles.container}>
                <h3 className={styles.container__header}>Tags</h3>
                <div className={styles.container__links}>
                {
                    tags.map(category => {
                        return (
                            <Link href={`/tag/${category}`}>
                                <a className={styles.container__link}>
                                    {category}
                                </a>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
    )
}