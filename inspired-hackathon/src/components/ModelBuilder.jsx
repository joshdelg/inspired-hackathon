import React, { useContext } from "react";
import { Box, Heading, Flex, Select, Button } from "@chakra-ui/react";
import { ModelContext } from "../contexts/ModelContext";
import LinearRegressionBuilder from "./LinearRegressionBuilder";
import { DatasetContext } from "../contexts/DatasetContext";
import { DragDropContext } from "react-beautiful-dnd";

function ModelBuilder(props) {

    const { model, changeModelType, setAllAttrs, setAttrs, setEverything } = useContext(ModelContext);
    const { dataset } = useContext(DatasetContext);

    const renderSpecificModelEditor = () => {
        if(!dataset) {
            return <Heading>Please select a dataset from the previous tab</Heading>
        } else if(!model.type) {
            return <Heading>Please select a model type</Heading>
        } else if(model.type === 'reg') {
            return <LinearRegressionBuilder />;
        } else if(model.type === 'knn') {
            return <Heading>K Nearest Neighbors</Heading>
        } else if(model.type === 'nn') {
            return <Heading>Neural Network</Heading>
        }
    }

    const handleOnDragEnd = (result) => {
        console.log(result);

        if(result.source.droppableId === "allAttrs") {
            if(result.destination.droppableId === "xAttrs") {
                let allAttrs = Array.from(model.allAttrs);
                let xAttrs = Array.from(model.xAttrs);

                const [removed] = allAttrs.splice(result.source.index, 1);
                xAttrs.splice(result.destination.index, 0, removed);

                setEverything({allAttrs: allAttrs, xAttrs: xAttrs});
            } else if(result.destination.droppableId === "yAttrs") {
                let allAttrs = Array.from(model.allAttrs);
                let yAttrs = Array.from(model.yAttrs);
                if(yAttrs.length < 1) {
                    const [removed] = allAttrs.splice(result.source.index, 1);
                    yAttrs.splice(result.destination.index, 0, removed);

                    setEverything({allAttrs: allAttrs, yAttrs: yAttrs});
                }
            }
        }
    }

    return (
        <Box bg="gray.100" p={8} height="100%">
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Heading mr={12}>Build your model</Heading>
                    <Box>
                        <Select value={model.type} onChange={(e) => changeModelType(e.target.value)}>
                            <option value="reg">Linear Regression</option>
                            <option value="knn">K Nearest Neighbors</option>
                            <option value="nn">Neural Network</option>
                        </Select>
                    </Box>
                </Flex>
                <Button colorScheme="teal" size="lg">Train!</Button>
            </Flex>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Box bg="teal.200">
                    {renderSpecificModelEditor()}
                </Box>
            </DragDropContext>
        </Box>
    );
}

export default ModelBuilder;