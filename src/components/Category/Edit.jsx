import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
// import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";



const Edit = ({ itemId,setShowEditPanel,refreshTree,setCurrentNode}) => {
  const [imageId, setImageId] = useState();
  const [itemData, setItemData] = useState();
  const [title,setTitle]= useState("");
  const [parent,setParent]=useState(0);

  const [imageFile, setImageFile] = useState(null);
const [uploadedImageUrl, setUploadedImageUrl] = useState(
  itemData?.attributes?.icon?.data[0]?.attributes.url || ""
)


  useEffect(() => {
    getData();
  }, [itemId]);

  // useEffect(() => {
  //   if (itemData) {
  //     setTitle(itemData.attributes.title);
  //     setImageId(itemData.attributes.icon.data[0].id);
  //     setParent(itemData.attributes.parent);
  //     setUploadedImageUrl(
  //       itemData.attributes.icon.data[0].attributes.url || ""
  //     );
  //   }
  // }, [itemData]);

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
        setTitle(result.data.attributes.title)
        setImageId(result.data.attributes.icon.data[0].id)
        setParent(result.data.attributes.parent)
        console.log(result.data);
      });
  };

  const onSubmit = async() => {
    try {
      const formData = {
        data: {
          title:title,
          icon: [imageId],
          parent:parent ,
        },
      };

      console.log(formData);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/categories/"+itemId,
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + import.meta.env.VITE_API_KEY,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),

          // body: JSON.stringify({ data: formData }),
        }
      );

      if (response.ok) {
        setShowEditPanel(false)
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
        console.log (result)

  
        setUploadedImageUrl(imageUrl);
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
    <div>
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
          <TextField
            helperText="Please enter category name"
            id="demo-helper-text-aligned"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
      

            sx={{
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
            }}
          />

            <FormControl sx={{ marginTop: "10px", width: "60%" }}>
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
            sx={{ marginTop: "10px", width: "15%" }}
          >
            Save
          </Button>
        </Box>
    

      <img
       style={{ width: "80px", height: "80px", marginBottom: "10px" }}
        src={
          import.meta.env.VITE_BASE_URL +
          ((itemData?.attributes?.icon?.data != null &&
            itemData.attributes.icon.data[0]?.attributes.url) ||
            "")
        }
        
        alt=""
      />
    </div>
  );
};

export default Edit;
