import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import storage from "./storage";
import themes from "./themes/themes";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={storage}>
      <ChakraProvider theme={themes}>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
