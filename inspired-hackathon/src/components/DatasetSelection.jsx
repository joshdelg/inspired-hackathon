import { Box, Heading, HStack } from "@chakra-ui/layout";
import React from "react";
import DatasetCard from "./DatasetCard";

function DatasetSelection() {
    return (
        <Box bg="gray.100" p={8} height="100%">
            <Heading>Select a Dataset</Heading>
            <HStack my={12} p={4} bg="teal.200" justify="space-between">
                {
                    [0, 1, 2].map((value) => (
                        <DatasetCard index={value} key={value} name={`Dataset ${value}`} />
                    ))
                }
            </HStack>
        </Box>
    );
}

export default DatasetSelection;