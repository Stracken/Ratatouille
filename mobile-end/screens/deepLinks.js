import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Linking } from "expo";

const prefix = Linking.makeUrl("/");

import Root from "./Root";

export default function Navigation() {
  const linking = {
    prefixes: [prefix],
    config: {
      Feed: {
        screens: {
          Article: "profil/:profilId",
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Root />
    </NavigationContainer>
  );
}