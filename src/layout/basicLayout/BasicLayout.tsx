import React, {ReactNode} from "react";
import {Footer, Header} from "../../component";
import styles from './BasicLayout.module.css';

class Props {
    children: ReactNode
}

/**
 * 构建主页面
 * @constructor
 */
export const BasicLayout: React.FC<Props> = ({children}) => {
    return <>
        <Header/>
        <div className={styles['layout-content']}>
            {children}
        </div>
        <Footer/>
    </>
}
