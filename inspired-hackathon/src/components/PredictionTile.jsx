import React, { useState } from "react";
import { Box, Grid, GridItem, ButtonGroup, Heading, Badge, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function PredictionTile(props) {

    const [index, setIndex] = useState(0);

    return (
        <Box my={8} p={4} border="1px" borderColor="gray.200" rounded="lg">
            <Heading>Predictions <Badge ml={2} colorScheme="green">{`${index} / ${props.predictedData.predictions.length}`}</Badge></Heading>
            <Grid my={4} gridTemplateColumns="repeat(2, 1fr)" gap={12}>
                <GridItem p={8} textAlign="center" bg="gray.100" rounded="lg" boxShadow="base">
                    <Heading>Actual Value</Heading>
                    <Heading>{props.predictedData.real[index]}</Heading>
                </GridItem>
                <GridItem p={8} textAlign="center" bg="gray.100" rounded="lg" boxShadow="base">
                    <Heading>Predicted</Heading>
                    <Heading>{props.predictedData.predictions[index][0].toFixed(1)}</Heading>
                </GridItem>
            </Grid>
            <ButtonGroup my={2} size="lg" isAttached variant="solid">
                <IconButton colorScheme="teal" onClick={() => {setIndex((index - 1) % props.predictedData.predictions.length)}} icon={<ArrowBackIcon />}/>
                <IconButton colorScheme="teal" onClick={() => {setIndex((index + 1) % props.predictedData.predictions.length)}} icon={<ArrowForwardIcon />}/>
            </ButtonGroup>
        </Box>
    );
}

export default PredictionTile;