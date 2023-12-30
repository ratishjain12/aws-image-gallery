import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

const configChakra = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme(configChakra);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {localStorage.setItem("chakra-ui-color-mode", "dark")}
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
