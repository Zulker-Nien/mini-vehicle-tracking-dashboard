import { useState } from "react";
import { createStyles, Navbar, rem } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { Link, useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: rem(60),
    paddingTop: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: rem(44),
    lineHeight: rem(44),

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: "gray",
      }).background,
      color: theme.white,
    },
  },
  hamburgerButton: {
    display: "none",
    [theme.breakpoints.sm]: {
      display: "block",
      marginLeft: "auto",
      padding: theme.spacing.md,
    },
  },
}));

const linksMockdata = ["Home", "Dashboard", "Analytics", "Vehicles"];

export default function Sidebar() {
  const { classes, cx } = useStyles();
  const location = useLocation();
  const pathWithoutLeadingSlash = location.pathname.substring(1);
  const [activeLink, setActiveLink] = useState<string>(pathWithoutLeadingSlash);

  const links = linksMockdata.map((link) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link,
      })}
      to={link === "Home" ? "/" : link}
      onClick={() => {
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </Link>
  ));

  return (
    <Navbar display={"flex"} width={{ sm: 300 }}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.main}>
          <div className={classes.logo}>
            <MantineLogo type="mark" size={30} />
          </div>
          {links}
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
