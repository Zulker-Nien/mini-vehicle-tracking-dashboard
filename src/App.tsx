import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Sidebar from "./Components/Navigation/Sidebar";
import { Grid, createStyles } from "@mantine/core";
import Vehicle from "./Pages/Vehicle";
import axios from "axios";
import { useEffect, useState } from "react";
import { TrackingDataProps } from "./Components/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./Pages/Analytics";

const useStyles = createStyles(() => ({
  gridMain: {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    maxHeight: "100vh",
    display: "flex",
    // overflow: "hidden",
  },
  gridCol: {
    margin: 0,
    padding: 0,
    zIndex: 3000,
  },
}));

const App = () => {
  const { classes } = useStyles();

  const [data, setData] = useState<TrackingDataProps[]>([]);
  async function fetchData() {
    await axios.get("/Coordinates").then((response) => {
      setData(response.data);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const dataProps = {
    data,
  };
  return (
    <Grid className={classes.gridMain}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Grid.Col lg={2} md={12} className={classes.gridCol}>
        <Sidebar />
      </Grid.Col>
      <Grid.Col lg={10} md={12}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard {...dataProps} />} />
          <Route path="/vehicles" element={<Vehicle {...dataProps} />} />
          <Route path="/analytics" element={<Analytics {...dataProps} />} />
        </Routes>
      </Grid.Col>
    </Grid>
  );
};

export default App;
