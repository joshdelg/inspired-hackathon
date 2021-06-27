import { VStack, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import Switch from "./components/Switch";
import DatasetContextProvider from "./contexts/DatasetContext";
import ModelContextProvider from "./contexts/ModelContext";

function App() {
  return (
    <div className="App">
      <Grid templateRows="1fr 11fr" gap={0} height="100vh">
        <Header />
        <DatasetContextProvider>
          <ModelContextProvider>
              <Switch />
          </ModelContextProvider>
        </DatasetContextProvider>
      </Grid>
    </div>
  );
}

export default App;
