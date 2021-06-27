import React, { useContext, useState } from "react";
import { Box, Heading, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from "@chakra-ui/react";
import { ModelContext } from "../contexts/ModelContext";
import { DatasetContext } from "../contexts/DatasetContext";

function Results(props) {

    const [trainPercent, setTrainPercent] = useState(80);
    const { model, setTrainingData, setTestData, setData } = useContext(ModelContext);
    const { dataset } = useContext(DatasetContext);

    const handleTrainPercentChange = (val) => {
        console.log(val);
        setTrainPercent(val);
    }

    const handleCollectData = () => {
        // Set up train: {X:, y:}, test: {X:, y:}
        let train = {
            X: [],
            y: []
        };
        let test = {
            X: [],
            y: []
        };

        const splitBreak = Math.floor(dataset.data.length * (trainPercent / 100));

        dataset.data.forEach((row, index) => {

            let xRowData = [];
            model.xAttrs.forEach((attr) => {
                xRowData.push(row[attr]);
            });

            let yRowData = [];
            model.yAttrs.forEach((attr) => {
                yRowData.push(row[attr]);
            })

            if(!xRowData.includes("?") && !yRowData.includes("?")) {
                if(index < splitBreak) {
                    train.X.push(xRowData);
                    train.y.push(yRowData);
                } else {
                    test.X.push(xRowData);
                    test.y.push(yRowData);
                }
            }
        });

        console.log(train);
        console.log(test);

        setData(train, test);
    }

    const handlePredict = () => {
        // Make the API request
        fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        }).then(response => response.json()).then(data => {
            console.log("Success: ", data);
        }).catch((err) => console.error(err));
    }

    return (
        <Box bg="gray.100" p={8} height="100%">
            <Heading>Train and predict</Heading>
            <Flex my={8} justify="space-between" alignItems="center">
                <Box minW={500}>
                    <Heading>Train-Test Split: {`${trainPercent}% training, ${100 - trainPercent}% testing`}</Heading>
                    <Slider defaultValue={80} colorScheme="teal" min={0} max={100} step={10} onChangeEnd={handleTrainPercentChange}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Button colorScheme="teal" size="lg" disabled={!(model.xAttrs.length > 0 && model.yAttrs.length === 1)} onClick={handleCollectData}>Sort Data!</Button>
            </Flex>
            <Button colorScheme="teal" size="lg" disabled={!(model.train && model.test)} onClick={handlePredict}>Predict!</Button>
        </Box>
    );
}

export default Results;