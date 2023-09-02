const mainContainerSx = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "10%",
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

const formControlContainerSx = () => ({ marginTop: "10px", width: "60%" });

const submitButtonSx = () => ({ marginTop: "10px", width: "15%" });

const productImageSx = () => ({
  width: "80px",
  height: "80px",
  marginBottom: "10px",
});

const editCategoryStyles = {
  mainContainerSx,
  categoryNameSx,
  formControlContainerSx,
  submitButtonSx,
  productImageSx,
};

export default editCategoryStyles;
