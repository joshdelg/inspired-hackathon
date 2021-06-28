import React, { useContext, useEffect } from "react";
import { Box, Heading, Flex, Tooltip } from "@chakra-ui/react";
import { DatasetContext } from "../contexts/DatasetContext";
import { ModelContext } from "../contexts/ModelContext";
import Attribute from "./Atrtibute";
import { Droppable, Draggable } from "react-beautiful-dnd";

function AttributeList(props) {

    const { dataset } = useContext(DatasetContext);
    const { model } = useContext(ModelContext);
    console.log('AtrList', model[props.dropId]);

    useEffect(() => {
        console.log("Context updated!");
    }, [model]);

    return (
        <Box>
            <Tooltip label={props.tip}>
                <Heading>{props.name}</Heading>
            </Tooltip>
            <Droppable droppableId={props.dropId}>
                {(provided) => (
                    <Flex minHeight="300px" bg="white" border="1px" borderColor="gray.100" rounded="lg" my={4} p={4} className={props.dropId} {...provided.droppableProps} ref={provided.innerRef} flexDir="column">
                        {model[props.dropId].map((attr, attrIndex) => (
                            <Draggable key={attrIndex} draggableId={attr} index={attrIndex}>
                                {(provided) => (
                                    <Attribute ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} attr={attr} />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Flex>
                )}
            </Droppable>
        </Box>
    );
}

export default AttributeList;