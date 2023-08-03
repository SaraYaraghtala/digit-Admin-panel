const addProductContainerSx = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px",
  marginLeft: "30px",
  marginRight: "30px",
});

const texFieldContainerSx = () => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const textFieldSx = () => ({
  marginBottom: "10px",
  fontSize: "20px", // Adjust the font size as needed
  marginRight: "30px",
  width: "80%",
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

const formControlLableSx = () => ({
  display: "flex",
  alignItems: "center",
  "&.secondColumn": { width: "50%" },
});

const categoriesContainerSx = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  width: "100%",
});

const chipsContainerSx = () => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
});

const saveButtonSx = () => ({
  marginTop: "10px",
  width: "40%",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  borderRadius: "10px",
  margin: 'auto',
  marginTop: '10px',

});

const formControlImageSx = () => ({
  backgroundColor: "#edf2f4",
  marginTop: "10px",
  width: "60%",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& #icon-upload[type='file'] ": {
    backgroundColor: "green",
  },
});

const formUploadImageSx = () => ({
  width: "80px",
  height: "80px",
  marginBottom: "10px",
  marginTop: "20px",
});

const showTypographySx = () => ({ marginRight: "12px" });

const menuPropsSx = () => ({
  minWidth: 250,
  marginTop: "10px",
});

const productListStyles = {
  addProductContainerSx,
  texFieldContainerSx,
  textFieldSx,
  formControlLableSx,
  categoriesContainerSx,
  chipsContainerSx,
  saveButtonSx,
  formControlImageSx,
  formUploadImageSx,
  showTypographySx,
  menuPropsSx,
};

export default productListStyles;
