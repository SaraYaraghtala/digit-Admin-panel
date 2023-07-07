import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Edit = ({ itemId,setShowEditPanel,refreshTree,setCurrentNode}) => {
  const [imageId, setImageId] = useState();
  const [itemData, setItemData] = useState();
  const [title,setTitle]= useState("");
  const [parent,setParent]=useState(0)
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
