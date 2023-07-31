const mainContainerSx = () => ({ height: 400, width: "100%" });

const headingContainerSx = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const panelsContainerSx = () => ({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
  borderRadius: "20px",
  backgroundColor: "#FFF",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  "& .closeIcon": {
    color: "#EE384E",
  },
});

const productListIndexStyles = {
  mainContainerSx,
  headingContainerSx,
  panelsContainerSx,
};

export default productListIndexStyles;
