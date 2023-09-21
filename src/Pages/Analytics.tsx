import React from "react";
import { Grid, Text, createStyles, useMantineTheme } from "@mantine/core";
import DistanceChart from "../Components/Charts_Graphs/DistanceChart";
import PositionChart from "../Components/Charts_Graphs/PositionChart";
import StatusChart from "../Components/Charts_Graphs/StatusChart";
import { TrackingDataProps } from "../Components/utils";

const gridStyles = createStyles(() => ({
  containerMain: {
    margin: 0,
    padding: "2% 1%",
    width: "100%",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
  },
  popUp: {
    position: "absolute",
    height: "70vh",
    backgroundColor: "orange",
    width: "100%",
  },
}));

const Analytics = (props: { data: TrackingDataProps[] }) => {
  const { data } = props;
  const theme = useMantineTheme();
  const { classes } = gridStyles();

  return (
    <div className={classes.containerMain}>
      <h3>Analytics</h3>
      <Grid gutter={theme.spacing.md}>
        <Grid.Col span={6}>
          <div>
            <Text fw={700}>Vehicle Status</Text>
            <StatusChart data={data} />
          </div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>
            <Text fw={700}>Position Chart</Text>
            <Text fw={400}>x: Latitude | y: Longitude</Text>
            <PositionChart data={data} />
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Text fw={700}>Position Chart</Text>
          <DistanceChart data={data} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Analytics;
