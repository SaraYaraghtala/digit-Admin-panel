import { Box, Typography, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  return (
    <Box sx={{marginX:"80px"}}>
      <Typography
        color={theme?.palette?.primary?.main || ""}
        fontFamily={"inherit"}
        sx={{ fontFamily: theme?.typography?.fontFamily?.secndary }}
      >
        home
      </Typography>
    </Box>
  );
};

export default Home;
