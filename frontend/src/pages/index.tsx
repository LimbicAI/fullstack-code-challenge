import * as React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography component="h2" variant="h6" color="inherit">
          Welcome
        </Typography>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Paper>
    </Layout>
  );
};

export default IndexPage;
