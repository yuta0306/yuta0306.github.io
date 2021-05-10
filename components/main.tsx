import styles from './main.module.scss'
import Content from './content'
import Sidebar from './sidebar'
import { ComponentProps } from 'react'

export default function Main({ content, sidebar=null, grid_layout=false }:
    {
        content: ComponentProps<any>
        sidebar?: ComponentProps<any>
        grid_layout?: boolean
    }) {
    return (
        <main className={styles.main}>
            <div className={!sidebar ? styles.main__container_about : styles.main__container}>
                <div className={styles.main__container__inner}>
                    <Content className={grid_layout ? styles.content__grid : styles.content}>
                        {content}
                    </Content>
                </div>
                {
                    sidebar &&
                    <Sidebar className={styles.sidebar}>
                        {sidebar}
                    </Sidebar>
                }
            </div>
        </main>
    )
}