import { Box, Text, Badge, Button } from "@chakra-ui/react";
import React from "react";

function DatasetCard(props) {

    const loadData = () => {
        fetch("/api").then((res) => res.json()).then((data) => console.log(data));
    }

    return (
      <Box bg="purple.100" p={4}>
        <Text fontWeight="bold">
          {props.name}
          <Badge ml={2} colorScheme="green">
            Regression
          </Badge>
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          expedita,.
        </Text>
        <Button onClick={loadData}>Click me!</Button>
      </Box>
    );
}

export default DatasetCard;