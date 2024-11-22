import React, {ReactNode} from "react";
import {Footer, Header} from "../component";
import styles from './MainLayout.module.css'

class Props {
    children: ReactNode
}

/**
 * 构建主页面
 * @constructor
 */
export const MainLayout: React.FC<Props> = ({children}) => {
    return <>
        <Header/>
        <div className={styles['layout-content']}>
            {children}
        </div>
        <Footer/>
    </>
}
