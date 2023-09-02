const mainContainerSx = () => ({
  height: "100%",
  borderRadius: "5px",
  padding: "2px",
});

const innerContainerSx = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "2px",
  marginLeft: "30px",
  marginRight: "30px",
});

const categoryNameSx = () => ({
  marginBottom: "10px",
  width: "60%",
  "& .MuiFormHelperText-root": {
    color: "#02A2E4",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: " #73A5D3",
    },
  },
});
const withoutImageSx = () => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const submitButtonSx = () => ({ marginTop: "10px", width: "15%" });

const addCategoryStyles = {
  mainContainerSx,
  innerContainerSx,
  categoryNameSx,
  submitButtonSx,
  withoutImageSx,
};

export default addCategoryStyles;
