import React, { createContext, useContext, useState } from 'react';

export const DatasetContext = createContext();

const DatasetContextProvider = (props) => {
    const [dataset, setDataset] = useState(); // { index: 0, data: Array(398)}

    const changeDataset = (newDataset) => {
        setDataset(newDataset);
    }

    return (
        <DatasetContext.Provider value={{dataset, changeDataset}}>
            {props.children}
        </DatasetContext.Provider>
    );
}

export default DatasetContextProvider;