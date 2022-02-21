import type { NextPage } from "next";
import { Box, Container, Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Container>
      <Box marginY={5}>
        <Typography variant="h4" gutterBottom>
          Administration
        </Typography>
        <Typography variant="h5">Programmer: Matias Facio </Typography>
        <Typography variant="body1">
          website:
          <a
            href="https://www.matiasfacio-dev.de"
            style={{ textDecoration: "default" }}
          >
            {" "}
            www.matiasfacio-dev.de
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
