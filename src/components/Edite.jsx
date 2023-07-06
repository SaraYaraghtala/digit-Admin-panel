import React from 'react';

const Edite = () => {
    return (
        <div>
          <TextField
                  helperText="Please enter category name"
                  id="demo-helper-text-aligned"
                  label="category"
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
        </div>
    );
};

export default Edite;