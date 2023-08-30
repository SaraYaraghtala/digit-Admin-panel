import { Box, Typography } from "@mui/material";
import React from "react";
import UserTable from "./usersTable/UserTable";

const SiteUsers = () => {
  return (
    <Box sx={{ marginX:"20px" }}>
      <Typography sx={{ marginX:"120px" }}>Authors Table</Typography>
      <UserTable />
    </Box>
  );
};

export default SiteUsers;
