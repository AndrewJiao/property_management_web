import React, {ReactElement, ReactNode} from "react";
import {MainLayout, PriceBasicTable} from "../../layout";
import {useParams} from "react-router-dom";
import {OwnerInfoTable} from "../ownerinfo";

/**
 * 构建主页面
 * @constructor
 */
export const HomePage: React.FC = () => {
    let {tableType} = useParams<{ tableType: string }>();

    let renderSub: ReactNode;
    switch (tableType) {
        case "priceBasic" :
            renderSub = <PriceBasicTable/>
            break
        case "ownerInfo":
            renderSub = <OwnerInfoTable/>
            break
        default:
            renderSub = <></>
    }

    return <>
        <MainLayout>
            { renderSub }
        </MainLayout>
    </>
}