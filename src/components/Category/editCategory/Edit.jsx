import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import styles from "./edit.styles";



const Edit = ({ itemId, setShowEditPanel, refreshTree, setCurrentNode }) => {
  const [imageId, setImageId] = useState();
  const [itemData, setItemData] = useState();
  const [title, setTitle] = useState("");
  const [parent, setParent] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getData();
  }, [itemId]);

  const getData = () => {
    fetch(
      import.meta.env.VITE_BASE_URL +
        "/api/categories/" +
        itemId +
        "?populate=*",
      {
        headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setItemData(result.data);
        setTitle(result.data.attributes.title);
        setImageId(result.data.attributes.icon.data[0].id);
        setParent(result.data.attributes.parent);
        console.log(result.data);
      });
  };

  const onSubmit = async () => {
    try {
      const formData = {
        data: {
          title: title,
          icon: [imageId],
          parent: parent,
        },
      };

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/categories/" + itemId,
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + import.meta.env.VITE_API_KEY,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setShowEditPanel(false);
        const result = await response.json();
        console.log("Data successfully posted to Strapi:", result);
        refreshTree();
        setCurrentNode(-1);
      } else {
        console.error("Error posting data to Strapi:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data to Strapi:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const imageUrl = result[0]?.url || "";
        console.log(result);

        setImageId(result[0].id);

        setItemData((prevItemData) => ({
          ...prevItemData,
          attributes: {
            ...prevItemData.attributes,
            icon: {
              data: [
                {
                  attributes: {
                    url: imageUrl,
                  },
                },
              ],
            },
          },
        }));

        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={styles.mainContainerSx()}
      >
        <TextField
          helperText="Please enter category name"
          id="demo-helper-text-aligned"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={styles.categoryNameSx()}
        />

        <FormControl sx={styles.formControlContainerSx()}>
          <InputLabel htmlFor="icon-upload" shrink>
            Icon Upload
          </InputLabel>
          <Input
            id="icon-upload"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
            }}
          />
          <FormHelperText>
            {imageFile ? imageFile.name : "Choose an image file"}
          </FormHelperText>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            onClick={uploadImage}
            disabled={!imageFile}
          >
            Upload
          </Button>
        </FormControl>

        <Button
          variant="outlined"
          color="info"
          startIcon={<AddIcon />}
          onClick={onSubmit}
          sx={styles.submitButtonSx()}
        >
          Save
        </Button>
      </Box>

      <img
        style={styles.productImageSx()}
        src={
          import.meta.env.VITE_BASE_URL +
          ((itemData?.attributes?.icon?.data != null &&
            itemData.attributes.icon.data[0]?.attributes.url) ||
            "")
        }
        alt="image"
      />
    </Box>
  );
};

export default Edit;
