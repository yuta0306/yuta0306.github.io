import Link from 'next/link'

import styles from './tags.module.scss'

export default function Tags({tags} : {
    tags: Array<string>
}) {
    const sortedTags: Array<string> = tags.sort((a, b) => {
        if (a < b) return -1
        else return 1
    })
    return (
        <div className={styles.container}>
                <h3 className={styles.container__header}>Tags</h3>
                <div className={styles.container__links}>
                {
                    tags.map(category => {
                        return (
                            <Link href={`/tag/${category}/1`}>
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