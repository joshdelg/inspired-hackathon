import React, { useContext } from "react";
import { Box, Heading, Flex, Select, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { ModelContext } from "../contexts/ModelContext";
import LinearRegressionBuilder from "./LinearRegressionBuilder";
import { DatasetContext } from "../contexts/DatasetContext";
import { DragDropContext } from "react-beautiful-dnd";
import CustomModal from "./CustomModal";

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

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <CustomModal isOpen={isOpen} onClose={onClose} bodyText="In this section, we will build a model that attempts to predict the MPG for a certain car given some attributes from the dataset. In the dropdown menu, select Linear Regression. This is one of the simplest machine learning algorithms so it will be the easiest to start with. In the first box, you will see a list of all the attributes in our dataset. We want to choose some that we want our model to use in order to predict the MPG of a car. Drag Cylinders, Displacement, Horsepower, Weight, Acceleration, and Model year into the X Attributes secion to tell the model that you want to use them to make predictions. To tell the model that you want to predict the MPG of a certiain car, drag the MPG attribute into the Y Attribute list."/>
        <Box bg="white" p={8} height="100%">
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Heading size="2xl" mr={12}>Build your model<IconButton variant="ghost" rounded="lg" colorScheme="teal" icon={<QuestionIcon />} onClick={onOpen}/></Heading>
                    <Box>
                        <Select value={model.type} onChange={(e) => changeModelType(e.target.value)} variant="filled">
                            <option value="reg">Linear Regression</option>
                            <option value="knn">K Nearest Neighbors</option>
                            <option value="nn">Neural Network</option>
                        </Select>
                    </Box>
                </Flex>
            </Flex>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Box>
                    {renderSpecificModelEditor()}
                </Box>
            </DragDropContext>
        </Box>
        </>
    );
}

export default ModelBuilder;