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
        <Grid my={8} templateColumns="repeat(3, 1fr)" columnGap={8}>
            <GridItem>
                <AttributeList attrs={model.allAttrs} name="All Attributes" dropId="allAttrs" dir="row" tip="Choose any of these attributes for your model to base its predictions off of."/>
            </GridItem>
            <GridItem>
                <AttributeList attrs={model.xAttrs} name="X Attributes" dropId="xAttrs" dir="col" tip={"The attributes in this section will be used by your model to make a prediction for the attribute under \"Y Attribute\""}/>
            </GridItem>
            <GridItem>
                <AttributeList attrs={model.yAttrs} name="Y Attribute" dropId="yAttrs" dir="col" tip={"The attribute in here will be what your model attempts to predict."}/>
            </GridItem>
        </Grid>
    );
}

export default LinearRegressionBuilder;