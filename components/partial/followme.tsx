import Link from 'next/link'
import Image from 'next/image'

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
                                    <Image src={image} width={60} height={60} loading='lazy'
                                        quality={40} alt={platform} />
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