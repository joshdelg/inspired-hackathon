import React, { useContext, useEffect } from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
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
            <Heading>{props.name}</Heading>
            <Droppable droppableId={props.dropId}>
                {(provided) => (
                    <Flex className={props.dropId} {...provided.droppableProps} ref={provided.innerRef} flexDir="column">
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