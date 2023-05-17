import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    bg: "red.500",
    borderRadius: "3xl",

    _hover: {
      backgroundColor: "red.400",
      color: "white",
      svg: {
        fill: "red.500",
      },
    },
    _active: {
      backgroundColor: "red.300",
      color: "white",
    },
    _focusVisible: {
      boxShadow: "3",
    },
    _disabled: {
      color: "gray.400",
      fontWeight: "bold",
      backgroundColor: "red.900",
      span: {
        fill: "gray.400",
      },
      svg: {
        fill: "gray.400",
      },
      _hover: {
        color: "gray.400",
        backgroundColor: "red.800",
        span: {
          fill: "gray.400",
        },
        svg: {
          fill: "gray.400",
        },
      },
    },
  },
  sizes: {
    lg: {
      px: "16",
      py: "5",
      fontSize: "3xl",
    },
    md: {
      px: "16",
      py: "4",
      fontSize: "2xl",
    },
    sm: {
      px: "4",
      py: "2",
      fontSize: "xl",
    },
  },
  variants: {
    primary: {
      w: "fit-content",
      h: "fit-content",
      border: "0",
      color: "white",
      span: {
        fill: "white",
      },
      _active: {
        border: "none",
      },
      _hover: {
        border: "none",
      },
      _disabled: {
        border: "none",
        backgroundColor: "red.900!important", // no way to override without !important
        color: "gray.400",
        opacity: "1!important", // no way to override without !important
        _hover: {
          border: "none",
        },
      },
    },
    secondary: {
      w: "fit-content",
      h: "fit-content",
      bg: "green.500",
      _active: {
        bg: "green.300",
      },
      _hover: {
        bg: "green.400",
      },
    },
    tertiary: {
      w: "fit-content",
      h: "fit-content",
      bg: "transparent",
      _active: {
        bg: "green.300",
      },
      _hover: {
        bg: "green.400",
      },
    }
  },
  defaultProps: {
    size: "lg",
    variant: "primary",
  },
};
