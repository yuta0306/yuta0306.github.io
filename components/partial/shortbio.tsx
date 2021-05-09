import styles from './shortbio.module.scss'
import {shortBio} from '../../global.d'

export default function ShortBio() {
    return (
        <div className={styles.container}>
            <p>{shortBio}</p>
        </div>
    )
}