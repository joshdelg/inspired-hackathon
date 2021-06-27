import { Box, Text, Badge, Button } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { DatasetContext } from "../contexts/DatasetContext";
import { ModelContext } from "../contexts/ModelContext";

function DatasetCard(props) {

  const [info, setInfo] = useState({});
  const { dataset, changeDataset } = useContext(DatasetContext);
  const { model, setAllAttrs } = useContext(ModelContext);

  useEffect(() => {
    fetch(`/api/datasets/info/${props.index}`).then((res) => res.json()).then((data) => setInfo(data));
  }, [])

  const selectDataset = () => {
    fetch(`/api/datasets/${props.index}`).then((res) => res.json()).then((data) => {
      if(data) {
        console.log(data)
        changeDataset({index: props.index, ...data});
        setAllAttrs(Object.keys(data.data[0]));
        return;
      } else {
        console.error("Failed to select this dataset :/");
      }
    });
  }

  return (
    <Box bg="purple.100" p={4}>
      {info && (
        <>
        <Text fontWeight="bold">
          {info.name}
          <Badge ml={2} colorScheme="green">
            {info.type}
          </Badge>
        </Text>
        <Text>{info.description}</Text>
        {
          dataset && (dataset.index == props.index) ? (
            <Button disabled>Dataset selected</Button>
          ) : <Button onClick={selectDataset}>Select this dataset</Button>
        }
        </>)}
    </Box>
  );
}

export default DatasetCard;