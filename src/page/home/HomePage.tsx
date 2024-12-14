import React, {ReactNode} from "react";
import {MainLayout, PriceBasicTable} from "../../layout";
import {useParams} from "react-router-dom";
import {OwnerInfoTable} from "../ownerinfo";
import {RoomInfoTable} from "../roominfo";
import {PropertyFeeTable} from "../propertyfee";
import {OwnerFeeTable} from "../ownerfee";

/**
 * 构建主页面
 * @constructor
 */
export const HomePage: React.FC = () => {
    let {tableType} = useParams<{ tableType: string }>();
    console.log(`HomePage tableType = ${tableType}`)

    let renderSub: ReactNode;
    switch (tableType) {
        case "priceBasic" :
            renderSub = <PriceBasicTable/>
            break
        case "ownerInfo":
            renderSub = <OwnerInfoTable/>
            break
        case "roomInfo":
            renderSub = <RoomInfoTable/>
            break
        case "propertyFee":
            renderSub = <PropertyFeeTable/>
            break
        case "ownerFee":
            renderSub = <OwnerFeeTable/>
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