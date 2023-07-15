import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Controller, useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Stack from "@mui/material/Stack";
import Add from "../components/Category/Add";
import Edit from "../components/Category/Edit";
import CloseIcon from '@mui/icons-material/Close';

const Category = () => {
  const [menuData, setMenuData] = useState([]);
  const [megaData, setMegaData] = useState([]);
  const [currentNode, setCurrentNode] = useState(-1);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // console.log(watch("parent"));

  const deleteItem = (itemId) => {
    // Perform the deletion logic for the item with the given itemId
    if (confirm("you sure delet this item ?")) {
      fetch(import.meta.env.VITE_BASE_URL + "/api/categories/" + itemId, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + import.meta.env.VITE_API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setCurrentNode(-1);
          getData();
        });
    } else console.log("cancel");
  };
  const addItem = (itemId) => {
    console.log("Add item with ID:", itemId);
    setShowAddPanel(true);
    setShowEditPanel(false);
  };
  const editItem = (itemId) => {
    // Perform the deletion logic for the item with the given itemId
    console.log(" Edit item with ID:", itemId);
    setShowEditPanel(true);
    setShowAddPanel(false);
  };

  const getData = () => {
    fetch(import.meta.env.VITE_BASE_URL + "/api/categories?populate=*", {
      headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY },
    })
      .then((response) => response.json())
      .then((result) => {
        setMenuData(result.data);
        console.log(result.data);
      });
  };

  const generateMenu = () => {
    const root = {
      title: "All",
      id: 0,
      parent: -1,
      subCategory: [],
      icon: undefined,
    };

    function getSubCategory(menuItem) {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].attributes.parent == menuItem.id) {
          const item = {
            title: menuData[i].attributes.title,
            id: menuData[i].id,
            parent: menuItem.id,
            subCategory: [],
            icon: menuData[i].attributes.icon,
            deleteItem: () => deleteItem(menuData[i].id),
            addItem: () => addItem(menuData[i].id),
            editItem: () => editItem(menuData[i].id),
          };
          menuItem.subCategory.push(item);
          getSubCategory(item);
        }
      }
    }

    getSubCategory(root);
    setMegaData(root);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    generateMenu();
  }, [menuData]);

  useEffect(() => {
    console.log(currentNode);
  }, [currentNode]);

  return (
    <React.Fragment>
      <CssBaseline />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            width: "40%",
            height: "60%",
            marginLeft: "30px",
            marginRight: "30px",
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Controller
            name="parent"
            control={control}
            render={({ field }) => (
              <TreeView
                {...field}
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  height: "100%",
                  width: "100%",
                  overflowY: "auto",
                   marginBottom: "20px",
                  marginTop: "20px",
                }}
                onNodeSelect={(event, value) => {
                  field.onChange(Number(value));
                  setCurrentNode(Number(value));
                }}
              >
                {megaData.subCategory &&
                  megaData.subCategory.map((item) => (
                    <TreeItem
                      label={
                        <React.Fragment>
                          {item.title}
                          {currentNode == item.id && (
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                display: "inline-block",
                                 }}
                            >
                              <IconButton
                                aria-label="delete"
                                onClick={item.deleteItem}
                              >
                                <DeleteIcon
                                  sx={{
                                    fill: "red",
                                    fontSize: 20,
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={item.editItem}
                              >
                                <ModeEditIcon
                                  sx={{
                                    fill: "red",
                                    fontSize: 20,
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={item.addItem}
                              >
                                <AddIcon
                                  sx={{
                                    fill: "red",
                                    fontSize: 20,
                                  }}
                                />
                              </IconButton>
                            </Stack>
                          )}
                        </React.Fragment>
                      }
                      nodeId={item.id.toString()}
                      key={item.id}
                    >
                      {item.subCategory.map((subItem) => (
                        <TreeItem
                          nodeId={subItem.id.toString()}
                          label={
                            <React.Fragment>
                              {subItem.title}
                              {currentNode == subItem.id && (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    display: "inline-block",
                                  }}
                                >
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.deleteItem}
                                  >
                                    <DeleteIcon
                                      sx={{
                                        fill: "red",
                                        fontSize: 20,
                                     
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.editItem}
                                  >
                                    <ModeEditIcon
                                      sx={{
                                        fill: "red",
                                        fontSize: 20,
                                     
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.addItem}
                                  >
                                    <AddIcon
                                      sx={{
                                        fill: "red",
                                        fontSize: 20,
                                      }}
                                    />
                                  </IconButton>
                                </Stack>
                              )}
                            </React.Fragment>
                          }
                          key={subItem.id}
                        >
                          {subItem.subCategory.map((opt) => (
                            <TreeItem
                              nodeId={opt.id.toString()}
                              label={
                                <React.Fragment>
                                  {opt.title}
                                  {currentNode == opt.id && (
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{
                                        display: "inline-block",
                                      }}
                                    >
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.deleteItem}
                                      >
                                        <DeleteIcon
                                          sx={{
                                            fill: "red",
                                            fontSize: 20,
                                          }}
                                        />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.editItem}
                                      >
                                        <ModeEditIcon
                                          sx={{
                                            fill: "red",
                                            fontSize: 20,
                                          }}
                                        />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.addItem}
                                      >
                                        <AddIcon
                                          sx={{
                                            fill: "red",
                                            fontSize: 20,
                                          }}
                                        />
                                      </IconButton>
                                    </Stack>
                                  )}
                                </React.Fragment>
                              }
                              key={opt.id}
                            ></TreeItem>
                          ))}
                        </TreeItem>
                      ))}
                    </TreeItem>
                  ))}
              </TreeView>
            )}
          />
        </Box>
      </form>

      {showEditPanel && (
        <Box
          sx={{
            position: "absolute",
            top: 50,
            right: 40,
            width: "40%",
            height: "40%",
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            marginTop: "40px",
          }}
        >
          <IconButton
            onClick={() => {
              setShowEditPanel(false);
            }}
      
          >
            {" "}
            < CloseIcon style={{ color: "#EE384E" }}/>
          </IconButton>
          <Edit
            itemId={currentNode}
            setShowEditPanel={setShowEditPanel}
            refreshTree={getData}
            setCurrentNode={setCurrentNode}
          />
        </Box>
      )}
      {showAddPanel && (
        <Box 
        sx={{
          position: "absolute",
          top: 50,
          right: 40,
          width: "40%",
          height: "40%",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#FFF",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          marginTop: "40px",
        }}
        >
          <IconButton
            onClick={() => {
              setShowAddPanel(false);
            }}
          >
            {" "}
          < CloseIcon style={{ color: "#EE384E" }}/>
          </IconButton>
          <Add
            parent={currentNode}
            getData={getData}
            setCurrentNode={setCurrentNode}
            setShowAddPanel={setShowAddPanel}
          />
        </Box>
      )}
    </React.Fragment>
  );
};

export default Category;
