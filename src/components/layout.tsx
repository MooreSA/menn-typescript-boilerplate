import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>NextJS Features</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Container>
  </>
);

export default Layout;
