import { Box, Typography } from "@mui/material";
import React from "react";
import UserTable from "./usersTable/UserTable";

const SiteUsers = () => {
  return (
    <Box>
      <Typography>Authors Table</Typography>
      <UserTable />
    </Box>
  );
};

export default SiteUsers;
