import Link from 'next/link'

import styles from './categories.module.scss'

export default function Categories({categories} : {
    categories: Array<string>
}) {
    return (
        <div className={styles.container}>
                <h3 className={styles.container__header}>Categories</h3>
                <div className={styles.container__links}>
                {
                    categories.map(category => {
                        return (
                            <Link href={`/category/${category}/1`}>
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