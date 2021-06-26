import { VStack, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import Switch from "./components/Switch";

function App() {
  return (
    <div className="App">
      <Grid templateRows="1fr 11fr" gap={0} height="100vh">
        <Header />
        <Switch />
      </Grid>
    </div>
  );
}

export default App;
