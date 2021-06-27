import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading } from "@chakra-ui/react";
import DatasetSelection from "./DatasetSelection";
import ModelBuilder from "./ModelBuilder";
import Results from "./Results";

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
                        <ModelBuilder />
                    </TabPanel>
                    <TabPanel>
                        <Results />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default Switch;