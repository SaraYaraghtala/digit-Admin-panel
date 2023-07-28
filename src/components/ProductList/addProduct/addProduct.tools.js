import C_ADD_PRODUCT from "./addProduct.constant";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:
        C_ADD_PRODUCT.ITEM_HEIGHT * 4.5 + C_ADD_PRODUCT.ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const steps = ["Upload Image", "Meta Data", "Finish"];

const addProductTools = { MenuProps, steps };

export default addProductTools;
