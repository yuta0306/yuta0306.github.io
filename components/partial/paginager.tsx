import Link from 'next/link'

import styles from './paginager.module.scss'

export default function Paginager({ top, pages, page, minPage = 1, visible = 5 }: {
    top: string,
    pages: number,
    page: number,
    minPage?: number,
    visible?: number
}) {
    const hasNext: boolean = page < pages && minPage <= page
    const hasPrev: boolean = minPage < page
    const pageNum: number = pages - minPage + 1

    const window: number = Math.floor(visible / 2)
    const startIndex: number = page - window >= minPage ?
        page - window - minPage : 0
    const endIndex: number = page + window <= pages ?
        page + window - minPage + 1 : pages - minPage + 1
    const pageList: Array<number> = [...Array(pageNum + 1)].map((v, k) => k + minPage)
        .slice(startIndex, endIndex)

    return (
        <div className={styles.container}>
            <ul className={styles.container__pagers}>
                <Link href={`${top}/${minPage}`} className={styles.container__pager}>
                    <li key='<<' className={styles.container__pager__page}>&lt;&lt;</li>
                </Link>
                {hasPrev ?
                    <Link href={`${top}/${page - 1}`} className={styles.container__pager}>
                        <li key='<' className={styles.container__pager__page}>&lt;</li>
                    </Link>
                    :
                    <li key='<' className={styles.container__pager_deactive}>&lt;</li>
                }
                {pageList.map((targetPage) => {
                    if (targetPage != page) {
                        return (
                            <Link href={`${top}/${targetPage}`} className={styles.container__pager}>
                                <li key={`/${top}/${targetPage}`} className={styles.container__pager__page}>{targetPage}</li>
                            </Link>
                        )
                    } else {
                        return (
                            <li key={`${top}/${targetPage}`} className={styles.container__pager_active}>{targetPage}</li>
                        )
                    }
                })}
                {hasNext ?
                    <Link href={`${top}/${page + 1}`} className={styles.container__pager}>
                        <li key='>' className={styles.container__pager__page}>&gt;</li>
                    </Link>
                    :
                    <li key='>' className={styles.container__pager_deactive}>&gt;</li>
                }
                <Link href={`${top}/${pages}`} className={styles.container__pager}>
                    <li key='>>' className={styles.container__pager__page}>&gt;&gt;</li>
                </Link>
            </ul>
        </div>
    )
}