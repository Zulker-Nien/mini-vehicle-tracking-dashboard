import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  rem,
  Group,
  Button,
} from "@mantine/core";
import { TrackingDataProps } from "../utils";

import { IconEdit, IconTrash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",
    zIndex: 3000,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  icon: {
    cursor: "pointer",
    opacity: "0.5 ",
    "&:hover": {
      opacity: "1",
    },
  },
}));

export default function TableVehicle(props: {
  data: TrackingDataProps[];
  setPopup: (value: boolean) => void;
  setClickedVehicle: (value: TrackingDataProps[]) => void;
}) {
  const { data, setPopup, setClickedVehicle } = props;
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.vehicleName}</td>
      <td>{row.vehicleType}</td>
      <td>{row.vehicleStatus === false ? "Idle" : "Moving"}</td>
      <td>
        <Group>
          <div
            onClick={() => {
              setPopup(true);
              setClickedVehicle([row]);
            }}
          >
            <IconEdit color="#228be6" className={classes.icon} />
          </div>
          <div color="red">
            <IconTrash color="red" className={classes.icon} />
          </div>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      w={"100%"}
      h={"90%"}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table horizontalSpacing="md" maw={"100%"}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Vehicle Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
