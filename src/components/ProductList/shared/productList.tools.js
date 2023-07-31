import C_PRODUCT_LIST from "./productList.constant";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight:
        C_PRODUCT_LIST.ITEM_HEIGHT * 4.5 + C_PRODUCT_LIST.ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const steps = ["Upload Image", "Meta Data", "Finish"];

const ProductListTools = { MenuProps, steps };

export default ProductListTools;
