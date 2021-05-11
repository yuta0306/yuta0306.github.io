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
        <div className={styles.main}>
            <div className={!sidebar ? styles.main__container_about : styles.main__container}>
                <main className={styles.main__container__inner} role='main' itemProp='mainContentOfPage'
                    itemScope={true} itemType='http://schema.org/Blog'>
                    <Content className={grid_layout ? styles.content__grid : styles.content}>
                        {content}
                    </Content>
                </main>
                {
                    sidebar &&
                    <Sidebar className={styles.sidebar}>
                        {sidebar}
                    </Sidebar>
                }
            </div>
        </div>
    )
}