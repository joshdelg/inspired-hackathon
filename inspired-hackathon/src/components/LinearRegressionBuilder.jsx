import React, { useContext } from "react";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import AttributeList from "./AtrributeList";
import { DatasetContext } from "../contexts/DatasetContext";
import { ModelContext } from "../contexts/ModelContext";

function LinearRegressionBuilder(props) {

    const { dataset } = useContext(DatasetContext);
    const { model } = useContext(ModelContext);
    console.log('But here still', model.allAttrs);

    return (
        <Grid my={8} bg="teal.500" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
            <GridItem colSpan={2} bg="tomato">
                <AttributeList attrs={model.allAttrs} name="All Attributes" dropId="allAttrs" dir="row"/>
            </GridItem>
            <GridItem bg="teal.600">
                <AttributeList attrs={model.xAttrs} name="X Attributes" dropId="xAttrs" dir="col"/>
            </GridItem>
            <GridItem bg="teal.700">
                <AttributeList attrs={model.yAttrs} name="Y Attribute" dropId="yAttrs" dir="col"/>
            </GridItem>
        </Grid>
    );
}

export default LinearRegressionBuilder;