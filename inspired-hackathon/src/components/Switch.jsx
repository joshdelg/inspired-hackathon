import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading } from "@chakra-ui/react";
import DatasetSelection from "./DatasetSelection";

function Switch() {
    return (
        <Box bg="tomato" px={8} py={4}>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Dataset</Tab>
                    <Tab>Model</Tab>
                    <Tab>Results</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <DatasetSelection />
                    </TabPanel>
                    <TabPanel>
                        <Heading>Model</Heading>
                    </TabPanel>
                    <TabPanel>
                        <Heading>Results</Heading>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default Switch;