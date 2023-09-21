import { useState } from "react";
import { Button, Group, createStyles } from "@mantine/core";
import TableVehicle from "../Components/Vehicles/TableVehicle";
import { TrackingDataProps } from "../Components/utils";
import AddVehicle from "../Components/Vehicles/AddVehicle";

const gridStyles = createStyles(() => ({
  containerMain: {
    margin: 0,
    padding: "0 1%",
    height: "100%",
    width: "100%",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  gridRow: {
    width: "100%",
    height: "10%",
  },
  gridRowBottom: {
    height: "90%",
    width: "100%",
  },
  popUp: {
    position: "absolute",
    height: "70vh",
    backgroundColor: "orange",
    width: "60vw",
  },
}));

const Vehicle = (props: { data: TrackingDataProps[] }) => {
  const { data } = props;
  const { classes } = gridStyles();
  const [popUp, setPopUp] = useState(false);
  const [clickedVehicle, setClickedVehicle] = useState<TrackingDataProps[]>([]);

  return (
    <div className={classes.containerMain}>
      <Group position="apart" className={classes.gridRow}>
        <h3>All Vehicles</h3>
        <Button
          onClick={() => {
            setPopUp(!popUp);
            setClickedVehicle([]);
          }}
        >
          {popUp ? "Back to List" : "Add Vehicles +"}
        </Button>
      </Group>
      <Group className={classes.gridRowBottom}>
        {popUp ? (
          <AddVehicle currentVehicle={clickedVehicle} setPopup={setPopUp} />
        ) : (
          <TableVehicle
            data={data}
            setPopup={setPopUp}
            setClickedVehicle={setClickedVehicle}
          />
        )}
      </Group>
    </div>
  );
};

export default Vehicle;
