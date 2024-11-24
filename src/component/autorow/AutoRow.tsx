import React, {ReactElement} from "react";
import {Col, Row} from "antd";

interface Props {
    subElements: ReactElement[],
    perCountEachRow?: number,
    showBorder?: boolean
}

//定义每行有多少row

export const AutoRow: React.FC<Props> = ({subElements, perCountEachRow = 4, showBorder = true}) => {

    const rowData =
        Array.from(
            {length: Math.ceil((subElements.length + 1) / perCountEachRow)},
            (_, i) => subElements.slice(i * perCountEachRow, (i + 1) * perCountEachRow)
        );

    return (
        <>
            {rowData.map((per, index) => (
                <Row key={index}>
                    {per.map((ele, idx) => (
                        showBorder ?
                            <Col key={idx} span={24 / perCountEachRow} style={{padding: "10px", border: "solid"}}>
                                {ele}
                            </Col>
                            :
                            <Col key={idx} span={24 / perCountEachRow} style={{padding: "10px"}}>
                                {ele}
                            </Col>
                    ))}
                </Row>
            ))}
        </>
    );
}