import React, { useState } from "react";
import {
  Grid,
  Group,
  TextInput,
  createStyles,
  useMantineTheme,
  SegmentedControl,
  Center,
  LoadingOverlay,
  ActionIcon,
  Container,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons-react";
import VehicleCard from "../Components/Vehicles/VehicleCard";
import Map from "../Components/Map/Map";
import { TrackingDataProps } from "../Components/utils";

const gridStyles = createStyles((theme) => ({
  gridMain: {
    margin: 0,
    padding: 0,
    height: "100%",
    width: "100%",
    maxHeight: "100vh",
    display: "flex",
  },
  gridColLeft: {
    height: "98vh",
  },
  search: {},
  vehicleList: {
    height: "92vh",
    marginTop: "10px",
    overflow: "scroll",
    padding: 0,
    borderTop: "1px solid silver",
  },
  gridColRight: {
    height: "100%",
    overflow: "hidden",
    maxHeight: "98.5vh",
    margin: 0,
  },
}));

function Dashboard(props: { data: TrackingDataProps[] }) {
  const { data } = props;
  const { classes } = gridStyles();
  const theme = useMantineTheme();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [status, setStatus] = useState<string>("All");

  const [longStart, setLongStart] = useState<TrackingDataProps[] | null>();
  const [latStart, setLatStart] = useState<TrackingDataProps[] | null>();

  const [longEnd, setLongEnd] = useState<TrackingDataProps[] | null>();
  const [latEnd, setLatEnd] = useState<TrackingDataProps[] | null>();

  const [vehicleCardActive, setVehicleCardActive] = useState<boolean>(false);

  const [activeCardIndex, setActiveCardIndex] = useState<
    boolean | null | TrackingDataProps[] | number
  >(null);

  const handleCardClick = (index: number | null) => {
    setActiveCardIndex(index);
  };

  const handleVehicleClicked = (
    longStart: TrackingDataProps[] | null,
    latStart: TrackingDataProps[] | null,
    status: boolean,
    longEnd: TrackingDataProps[] | null,
    latEnd: TrackingDataProps[] | null,
    active: boolean
  ) => {
    setLongStart(longStart);
    setLatStart(latStart);
    setStatus(status ? "Moving" : "Idle");
    setLongEnd(longEnd);
    setLatEnd(latEnd);
    setVehicleCardActive(!vehicleCardActive);
    setActiveCardIndex(active ? null : longStart); // Toggle active card index
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setActiveCardIndex(null); // Clear the active card when searching
  };

  const filteredData = data
    ? data.filter((item) => {
        const vehicleName = item.vehicleName.toLowerCase();
        const matchesSearchQuery = vehicleName.includes(
          searchQuery.toLowerCase()
        );
        const matchesStatus =
          status === "All" ||
          (status === "Moving" ? item.vehicleStatus : !item.vehicleStatus);

        return matchesSearchQuery && matchesStatus;
      })
    : [];

  return (
    <Grid className={classes.gridMain} gutter="lg">
      <Grid.Col lg={4} md={12} className={classes.gridColLeft}>
        <Group>
          <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            value={searchQuery}
            onChange={handleSearchChange}
            rightSection={
              <ActionIcon
                size={32}
                radius="xl"
                color={theme.black}
                variant="filled"
              >
                {theme.dir === "ltr" ? (
                  <IconArrowRight size="1.1rem" stroke={1.5} />
                ) : (
                  <IconArrowLeft size="1.1rem" stroke={1.5} />
                )}
              </ActionIcon>
            }
            placeholder="Search Vehicles"
            rightSectionWidth={42}
          />
          <SegmentedControl
            radius="xl"
            size="md"
            data={["All", "Idle", "Moving"]}
            value={status}
            onChange={(value) => setStatus(value)}
          />
        </Group>
        <Container className={classes.vehicleList}>
          {filteredData.length > 0 ? (
            filteredData.map((item: any) => {
              const uniqueKey = `${item.vehicleName}-${item.vehicleType}`;
              return (
                <div
                  onClick={() =>
                    handleVehicleClicked(
                      item.startLatitude,
                      item.startLongitude,
                      item.vehicleStatus,
                      item.endLongitude,
                      item.endLatitude,
                      true
                    )
                  }
                  key={uniqueKey}
                >
                  <VehicleCard
                    title={item.vehicleName}
                    type={item.vehicleType}
                    status={item.vehicleStatus}
                    longitude={item.startLongitude}
                    latitude={item.startLatitude}
                    active={item.id === activeCardIndex}
                    onClick={() => handleCardClick(item.id)}
                  />
                </div>
              );
            })
          ) : (
            // Render a message when there are no matching vehicles
            <Center>
              <p>No matching vehicles found</p>
            </Center>
          )}
        </Container>
      </Grid.Col>
      <Grid.Col lg={8} md={12} className={classes.gridColRight}>
        <Map
          longStart={longStart || []}
          latStart={latStart || []}
          status={status === "Moving"}
          longEnd={longEnd || []}
          latEnd={latEnd || []}
        />
      </Grid.Col>
    </Grid>
  );
}

export default Dashboard;
