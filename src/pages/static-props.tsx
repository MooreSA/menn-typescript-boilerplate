import { Box } from "@mui/system";

const StaticProps = ({ data }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <h1>This Page is static</h1>
      <p>The data for this page was created at: </p>
      <p>{data}</p>
    </Box>
  );
};

export async function getStaticProps() {
  const data = new Date().toTimeString();

  return {
    props: {
      data,
    },
    revalidate: 30,
  };
}

export default StaticProps;
