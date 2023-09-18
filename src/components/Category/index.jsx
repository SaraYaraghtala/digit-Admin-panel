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
import CloseIcon from "@mui/icons-material/Close";

import Add from "./addCategory/Add";
import Edit from "./editCategory/Edit";

import styles from "./category.styles";

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

  const deleteItem = (itemId) => {
    if (confirm("you sure delete this item ?")) {
      const headers = {
        Authorization: "bearer " + import.meta.env.VITE_API_KEY,
        accept: "application/json",
        "Content-Type": "application/json",
      };
      fetch(import.meta.env.VITE_BASE_URL + "/api/categories/" + itemId, {
        method: "DELETE",
        headers : headers,
      })
        .then((res) => res.json())
        .then((response) => {
          setCurrentNode(-1);
          getData();
        });
    }
  };
  const addItem = (itemId) => {
    setShowAddPanel(true);
    setShowEditPanel(false);
  };
  const editItem = (itemId) => {
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
        <Box sx={styles.mainContainerSx()}>
          <Controller
            name="parent"
            control={control}
            render={({ field }) => (
              <TreeView
                {...field}
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={styles.treeViewSx()}
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
                                <DeleteIcon sx={styles.deleteIconSx()} />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={item.editItem}
                              >
                                <ModeEditIcon sx={styles.modeEditIconSx()} />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={item.addItem}
                              >
                                <AddIcon sx={styles.addIconSx()} />
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
                                  sx={styles.treeItemSx()}
                                >
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.deleteItem}
                                  >
                                    <DeleteIcon sx={styles.deleteIconSx()} />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.editItem}
                                  >
                                    <ModeEditIcon
                                      sx={styles.modeEditIconSx()}
                                    />
                                  </IconButton>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={subItem.addItem}
                                  >
                                    <AddIcon sx={styles.addIconSx()} />
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
                                      sx={styles.treeItemSx()}
                                    >
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.deleteItem}
                                      >
                                        <DeleteIcon
                                          sx={styles.deleteIconSx()}
                                        />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.editItem}
                                      >
                                        <ModeEditIcon
                                          sx={styles.modeEditIconSx()}
                                        />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={opt.addItem}
                                      >
                                        <AddIcon sx={styles.addIconSx()} />
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
        <Box sx={styles.showPanelSx()}>
          <IconButton
            onClick={() => {
              setShowEditPanel(false);
            }}
          >
            <CloseIcon className="closeIcon" />
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
        <Box sx={styles.showPanelSx()}>
          <IconButton
            onClick={() => {
              setShowAddPanel(false);
            }}
          >
            <CloseIcon className="closeIcon" />
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
