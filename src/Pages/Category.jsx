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
import Container from "@mui/material/Container";

const Category = () => {
  const [menuData, setMenuData] = useState([]);
  const [megaData, setMegaData] = useState([]);
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("parent"));

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            borderRadius: "5px",
            padding: "2px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "2px",
                marginLeft: "30px",
                marginRight: "30px",
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
                      height: 240,
                      flexGrow: 1,
                      width: "80%",
                      overflowY: "auto",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      marginTop: "20px",
                      bgcolor: "#FDEDED",
                      border: "3px solid #73A5D3",
                    }}
                    onNodeSelect={(event, value) => field.onChange(value)}
                  >
                    {megaData.subCategory &&
                      megaData.subCategory.map((item) => {
                        return (
                          <TreeItem
                            label={item.title}
                            nodeId={item.id}
                            key={item.id}
                          >
                            {item.subCategory.map((subItem) => {
                              return (
                                <TreeItem
                                  nodeId={subItem.id}
                                  label={subItem.title}
                                  key={subItem.id}
                                >
                                  {subItem.subCategory.map((opt) => {
                                    return (
                                      <TreeItem
                                        nodeId={opt.id}
                                        label={opt.title}
                                        key={opt.id}
                                      ></TreeItem>
                                    );
                                  })}
                                </TreeItem>
                              );
                            })}
                          </TreeItem>
                        );
                      })}
                  </TreeView>
                )}
              />
            </Box>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Category;
