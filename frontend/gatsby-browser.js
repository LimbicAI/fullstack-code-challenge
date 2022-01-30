import React from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { QuestionStateProvider } from "./src/context/questions";
import { UserStateProvider } from "./src/context/users";

const theme = createTheme();

const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QuestionStateProvider>
          <UserStateProvider>{element}</UserStateProvider>
        </QuestionStateProvider>
      </ThemeProvider>
    </>
  );
};

export { wrapRootElement };
