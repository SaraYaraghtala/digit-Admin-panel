const mainContainerSx = () => ({
  display: "flex",
  width: "40%",
  height: "100%",
  minHeight: "300px",
  marginLeft: "30px",
  marginRight: "30px",
  borderRadius: "20px",
  backgroundColor: "#FFF",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  marginX: "100px",
});

const treeViewSx = () => ({
  height: "100%",
  width: "100%",
  overflowY: "auto",
  marginBottom: "20px",
  marginTop: "20px",
});

const deleteIconSx = () => ({
  fill: "red",
  fontSize: 20,
});

const modeEditIconSx = () => ({
  fill: "red",
  fontSize: 20,
});

const addIconSx = () => ({
  fill: "red",
  fontSize: 20,
});

const treeItemSx = () => ({
  display: "inline-block",
});
const showPanelSx = () => ({
  position: "absolute",
  top: 50,
  right: 40,
  width: "40%",
  height: "40%",
  borderRadius: "20px",
  backgroundColor: "#FFF",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  marginTop: "40px",
  '& .closeIcon':{ color: "#EE384E" }
});

const categorystyles = {
  mainContainerSx,
  treeViewSx,
  deleteIconSx,
  modeEditIconSx,
  addIconSx,
  treeItemSx,
  showPanelSx,
};

export default categorystyles;
