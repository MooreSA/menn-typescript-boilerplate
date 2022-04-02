const StaticProps = async (req, res) => {
  return res.status(200).json({
    currentTime: new Date().toLocaleTimeString(),
  });
};

export default StaticProps;
