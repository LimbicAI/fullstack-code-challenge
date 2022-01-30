import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Layout from "../../components/Layout";

import { useUserState } from "../../context/users";

const UsersPage = () => {
  const [state] = useUserState();

  return (
    <Layout title="Users">
      <Stack spacing={2}>
        {state.users.map((u) => (
          <Card
            key={u.id}
            sx={{
              p: 2,
            }}
          >
            <CardContent>
              <Typography component="p">{u.name}</Typography>
            </CardContent>
            <CardActions>
              <Button
                component="a"
                href={`/users/${u.id}`}
                size="small"
                color="primary"
              >
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Layout>
  );
};

export default UsersPage;
