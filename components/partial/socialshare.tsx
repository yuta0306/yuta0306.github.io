import Link from 'next/link';
import styles from './socialshare.module.scss';


export default function SocialShare({ socials, url }: {
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
                            <Link href={link} key={media} target='_blank'>
                                <img src={image}
                                    loading='lazy' alt={`${url}を${media}に共有する`} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}