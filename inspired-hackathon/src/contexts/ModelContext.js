import React, { createContext, useState } from 'react';

export const ModelContext = createContext();

const ModelContextProvider = (props) => {

    /**
     * For Regression:
     * {
     *  type: "reg",
     *  xAttrs: [],
     *  yAttrs: [],
     *  allAttrs: [],
     *  train: {
     *      X: [[,], [,]],
     *      y: [,]
     *  },
     *  test: {
     *      X: [[,], [,]]
     *      y: [],
     * },
     * custom: [,] For Custom Predictions
     * }
     */

    const [model, setModel] = useState({
        type: "reg",
        xAttrs: [],
        yAttrs: [],
        allAttrs: []
    });

    const changeModelType = (newType) => {
        setModel({...model, type: newType});
    }

    const setTrainingData = (trainingData) => {
        setModel({...model, train: {...trainingData}});
        console.log('updated training data');
    }

    const setTestData = (testData) => {
        setModel({...model, test: {...testData}});
        console.log('updated test data');
    }

    const setData = (train, test) => {
        setModel({...model, train: train, test: test});
    }

    const setCustomPredictions = (custom) => {
        setModel({...model, custom: custom});
    }

    const setAllAttrs = (attrs) => {
        console.log('Ressting model with', attrs);
        let newAttrs = Array.from(attrs);
        setModel({...model, allAttrs: newAttrs});
    }

    const setAttrs = (attrs, name) => {
        setModel({...model, [name]: attrs});
    }

    const setEverything = (newParams) => {
        setModel({...model, ...newParams});
    }

    return (
        <ModelContext.Provider value={{model, changeModelType, setTrainingData, setTestData, setCustomPredictions, setAllAttrs, setAttrs, setEverything, setData}}>
            {props.children}
        </ModelContext.Provider>
    );
}

export default ModelContextProvider;