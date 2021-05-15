import Link from 'next/link'

import styles from './followme.module.scss'

export default function FollowMe({socials} : {
        socials: Array<Array<any>>
}) {
    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.container__header}>Follow Me</h3>
                <div className={styles.container__links}>
                {
                    socials.map(data => {
                        let [platform, link, image] = data
                        return (
                            <Link href={link}>
                                <a target='_blank'>
                                    <img src={image} alt={platform} />
                                </a>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}