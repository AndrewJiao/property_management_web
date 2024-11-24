import React from "react";
import {MainLayout, PriceBasic} from "../../layout";

/**
 * 构建主页面
 * @constructor
 */
export const HomePage: React.FC = () => {
    return <>
        <MainLayout>
            <PriceBasic/>
        </MainLayout>

    </>
}