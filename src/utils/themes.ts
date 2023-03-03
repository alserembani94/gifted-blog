import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride | undefined = {
  /** Put your mantine theme override here */
  colorScheme: "dark",

  colors: {
    brand: [
      "#ffe4ea",
      "#fdb6c3",
      "#f6889b",
      "#f15a72",
      "#ec2d4a",
      "#d31532",
      "#a50e26",
      "#77081b",
      "#49020f",
      "#1f0003",
    ],
    lightGray: [
      "#f8f0f2",
      "#d9d9d9",
      "#bfbfbf",
      "#a6a6a6",
      "#8c8c8c",
      "#737373",
      "#595959",
      "#404040",
      "#262626",
      "#120b0d",
    ],
  },
  primaryColor: "brand",
  primaryShade: 5,

  headings: {
    fontFamily: "Bitter, Roboto, sans-serif",
    sizes: {
      h1: { fontSize: 48 },
      h2: { fontSize: 44 },
      h3: { fontSize: 40 },
      h4: { fontSize: 36 },
      h5: { fontSize: 32 },
      h6: { fontSize: 28 },
    },
  },
};

export const titleColor = "#df2644";
