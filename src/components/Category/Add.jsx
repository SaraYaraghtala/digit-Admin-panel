import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from '@mui/material/TextField';
import { Controller, useForm } from "react-hook-form";
import Alert from '@mui/material/Alert';


const Add = () => {
  const [menuData, setMenuData] = useState([]);
  const [megaData, setMegaData] = useState([]);
  const {
    control, 
    handleSubmit,
    register ,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  console.log(watch("parent"))
 
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
    <form onSubmit={handleSubmit(onSubmit)}>
       <Controller
      name="parent"
      control={control}
      render={({ field }) =>(
      <TreeView 
        {...field}
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        onNodeSelect={(event, value) => field.onChange(value)}
      >
        {megaData.subCategory &&
          megaData.subCategory.map((item) => {
              return (
                <TreeItem label={item.title} nodeId={item.title} key={item.id}>
                  {item.subCategory.map((subItem) => {
                    return (
                      <TreeItem nodeId={subItem.title} label={subItem.title} key={subItem.id}>
                        {subItem.subCategory.map((opt) => {
                          return <TreeItem nodeId={opt.title} label={opt.title} key={opt.id}></TreeItem>;
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
      
      <TextField
        helperText="Please enter category name"
        id="demo-helper-text-aligned"
        label="category"
        {...register("title" ,{ required: true }) }
      />
      {errors.title&& <Alert severity="error">this field is required??</Alert>}
      <input type="file" {...register("iconFile")} />

      <Button variant="outlined" color="info" startIcon={<AddIcon />} type="submit">
        Save
      </Button>
    </form>
  );
};

export default Add;
