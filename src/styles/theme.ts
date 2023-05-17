import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";

export const rawTheme = {
  components: { Button },
  styles: {
    global: {
      body: {
        //fontFamily: "Inter",
      },
    },
  },
  colors: {
    dark: {
      100: "#1E1E1E",
    },
    green: {
      100: "#AEE1CD",
      200: "#87B9A5",
      300: "#629380",
      400: "#3E6E5C",
      500: "#1B4B3B",
    },
    red: {
      100: "#FFB7E7",
      200: "#EE8EBE",
      300: "#C36796",
      400: "#994170",
      500: "#71194c",
    },
    light: {
      100: "#C2A66E",
      200: "#9B824C",
      300: "#765F2B",
      400: "#523F0B",
      500: "#332100",
    },
    white: "#f0eee7",
  },
};
export const theme = extendTheme(rawTheme);
