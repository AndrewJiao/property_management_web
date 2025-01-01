import React from "react";
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return <>
        <div className={styles.content}>
            <div>
                <ul className={styles["footer-links"]}>
                    <li>关于我</li>
                    <li>联系我</li>
                    <li>隐私政</li>
                    <li>服务条</li>
                </ul>
            </div>
            {/*<div className="footer-socials">*/}
            {/*    <ul>*/}
            {/*        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>*/}
            {/*        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>*/}
            {/*        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div className={styles["footer-copy"]}>
                <p style={{margin:0}}>&copy; 2025 MyCompany. 保留所有权利。</p>
            </div>
        </div>
    </>
}