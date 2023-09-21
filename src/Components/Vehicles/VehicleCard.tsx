import { createStyles, Text, Card, Group, rem, Badge } from "@mantine/core";
import { VehicleCardProps } from "../utils";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginTop: "20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  cardActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      color: theme.white,
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
}));

export default function VehicleCard({
  title,
  type,
  status,
  longitude,
  latitude,
  active,
  onClick,
}: VehicleCardProps) {
  const { classes, cx } = useStyles();

  const cardClicked = () => {
    onClick();
  };

  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      className={cx(classes.card, {
        [classes.cardActive]: active,
      })}
      onClick={cardClicked}
    >
      <Group position="apart">
        <Text fz="xl" className={classes.label}>
          {title}
        </Text>
        <Badge color={status === true ? "blue" : "green"}>
          {status === true ? "Moving" : "Idle"}
        </Badge>
      </Group>
      <Text fz="sm" color={active ? "white" : "dimmed"}>
        {type}
      </Text>
      <Group position="apart">
        <Text color={active ? "white" : "dimmed"} mt={20}>
          Long: {longitude}, Lat: {latitude}
        </Text>
      </Group>
    </Card>
  );
}
