import Link from 'next/link'
import Image from 'next/image'

import styles from './socialshare.module.scss'

export default function SocialShare({socials, url} : {
    socials: Array<Array<string>>,
    url: string
}) {
    return (
        <div className={styles.container}>
            <h3>タメになったらSHARE!!!</h3>
            <div className={styles.container__links}>
            {
                socials.map((data) => {
                    let [media, format, image] = data;
                    let link = format + url
                    return (
                        <Link href={link}>
                            <a target='_blank'>
                                <Image src={image} width={60} height={60} quality={80}
                                    loading='lazy' alt={`${url}を${media}に共有する`} />
                            </a>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}