import { Box, Heading, HStack, IconButton } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import React from "react";
import DatasetCard from "./DatasetCard";
import CustomModal from "./CustomModal";
import { useDisclosure } from "@chakra-ui/react";

function DatasetSelection() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <CustomModal isOpen={isOpen} onClose={onClose} bodyText="The first thing you need to do in any Machine Learning project is select a dataset. A dataset contains information about a large number of the same thing. This information is organized into attributes. Each entry in a dataset, representing one object, contains a value corresponding to each particular attribute. Machine learning algorithms find the patterns among these attributes between different entries in the dataset, and thena ttempt t o predict one or more attributes based on the others. To get started, lets select the Automobile MPG Dataset."/>
            <Box p={8} height="100%">
                <Heading size="2xl">Select a Dataset <IconButton variant="ghost" rounded="lg" colorScheme="teal" icon={<QuestionIcon />} onClick={onOpen}/></Heading>
                <HStack my={12} p={8} bg="gray.100" rounded="lg" justify="space-between">
                    {
                        [0, 1, 2].map((value) => (
                            <DatasetCard index={value} key={value} name={`Dataset ${value}`} />
                        ))
                    }
                </HStack>
            </Box>
        </>
    );
}

export default DatasetSelection;