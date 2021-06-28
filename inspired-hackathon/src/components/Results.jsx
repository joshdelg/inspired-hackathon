import React, { useContext, useState } from "react";
import { Box, Heading, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Tooltip, useDisclosure, IconButton } from "@chakra-ui/react";
import { ModelContext } from "../contexts/ModelContext";
import { DatasetContext } from "../contexts/DatasetContext";
import PredictionTile from "./PredictionTile";
import CustomModal from "./CustomModal";
import { QuestionIcon } from "@chakra-ui/icons";

function Results(props) {

    const [trainPercent, setTrainPercent] = useState(80);
    const { model, setTrainingData, setTestData, setData } = useContext(ModelContext);
    const { dataset } = useContext(DatasetContext);

    const [predictedData, setPredictedData] = useState();

    const handleTrainPercentChange = (val) => {
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
                xRowData.push((row[attr] !== "?" ? parseFloat(row[attr]) : "?"));
            });

            let yRowData = [];
            model.yAttrs.forEach((attr) => {
                yRowData.push((row[attr] !== "?" ? parseFloat(row[attr]) : "?"));
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
            setPredictedData(data);
        }).catch((err) => console.error(err));
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <CustomModal isOpen={isOpen} onClose={onClose} bodyText="Now that we've constructed our linear regression model we're going to train it using our dataset and make some predictions with it! To start, we need to specify how much of our data we want to use for training the model and how much for testing it. The reason we do this is because we don't want evaluate the accuracy of our model using predictions for data it has already seen. 80/20 is a typically train-test split so you can leave the slider there and simple click Divide Data to partition the data. Now, all you have to do is click Train and Predict and let SimpleML work its magic! After the model has finished making predictions based on the testing data, you can scroll through each entry to see how accurate your model was." />
        <Box p={8} height="100%">
            <Heading size="2xl">Train and predict<IconButton variant="ghost" rounded="lg" colorScheme="teal" icon={<QuestionIcon />} onClick={onOpen}/></Heading>
            <Flex my={8} justify="space-between" alignItems="center">
                <Box minW={500}>
                    <Tooltip label="This determines how much of your data will be used for training the model, and how much will be used to evaluate its effectiveness. You don't want to test your model with the same data you trained it on!">
                        <Heading size="md">Train-Test Split: {`${trainPercent}% training, ${100 - trainPercent}% testing`}</Heading>
                    </Tooltip>
                    <Slider defaultValue={80} colorScheme="teal" min={0} max={100} step={10} onChangeEnd={handleTrainPercentChange}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
            </Flex>
            <Button mr={4} colorScheme="teal" size="lg" disabled={!(model.xAttrs.length > 0 && model.yAttrs.length === 1)} onClick={handleCollectData}>Divide Data</Button>
            <Button colorScheme="teal" size="lg" disabled={!(model.train && model.test)} onClick={handlePredict}>Train and Predict</Button>
            {
                predictedData && <PredictionTile predictedData={predictedData} />
            }
        </Box>
        </>
    );
}

export default Results;