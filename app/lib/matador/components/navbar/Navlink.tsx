import React from "react";
import {
  UnstyledButton,
  ThemeIcon,
  Group,
  Text,
  MantineColor,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

export interface NavlinkProps {
  icon: React.ReactNode;
  color: MantineColor;
  label: string;
  href: string;
  onClick: () => void;
}

const Navlink = ({ icon, color, label, href, onClick }: NavlinkProps) => {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      children={({ isActive }) => {
        return (
          <UnstyledButton
            sx={(theme) => ({
              display: "block",
              width: "100%",
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
              backgroundColor: isActive
                ? theme.colorScheme === "dark"
                  ? `${theme.colors.dark[4]} !important`
                  : `${theme.colors.gray[2]} !important`
                : theme.colorScheme === "dark"
                ? `${theme.colors.dark[7]} !important`
                : `white !important`,
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? `${theme.colors.dark[4]} !important`
                    : `${theme.colors.gray[2]} !important`,
              },
              marginBottom: "2%",
            })}
          >
            <Group>
              <ThemeIcon color={color} variant="light">
                {icon}
              </ThemeIcon>

              <Text size="md">{label}</Text>
            </Group>
          </UnstyledButton>
        );
      }}
    />
  );
};

export default Navlink;
