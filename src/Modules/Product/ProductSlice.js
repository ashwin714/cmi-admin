import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ToastAlert from "../../Component/Alert/ToastAlert";
import { AddProduct, GetProduct, GetProductById, GetCategory, GetUnit,GetFilter, DeleteProduct } from "./ProductService";
// import swal from "sweetalert";

const initialState = {
  addData: undefined,
  getData: undefined,
  getDataById:undefined,
  getCategory:undefined,
  getUnit:undefined,
  getFilter:undefined,
  deleteData: undefined, // Add deleteData state
  error: undefined,
  status: "idle"
};

export const AddProductData = createAsyncThunk(
  "Product/AddProduct",
  async (data) => {
    const response = await AddProduct(data);
    return response;
  }
);

export const GetProductData = createAsyncThunk(
  "Product/GetProduct",
  
  async (data) => {
    //console.log(data,"slice");
    const response = await GetProduct(data);
    return response;
  }
);
export const GetProductByIdData = createAsyncThunk(
  "Product/GetProductById",
  async (id) => {
    const response = await GetProductById(id);
    return response;
  }
);
export const GetCategoryData = createAsyncThunk(
  "Product/GetCategory",
  async () => {
    const response = await GetCategory();
    return response;
  }
);
export const GetUnitData = createAsyncThunk(
  "Product/GetUnit",
  async () => {
    const response = await GetUnit();
    return response;
  }
);
export const GetFilterData = createAsyncThunk(
  "Product/GetFilter",
  async () => {
    const response = await GetFilter();
    return response;
  }
);
// Add DeleteProductData
export const DeleteProductData = createAsyncThunk(
  "Product/DeleteProduct",
  async (id) => {
    const response = await DeleteProduct(id);
    return response;
  }
);
export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(AddProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.addData = action.payload;
        ToastAlert(action.payload.message, "success");
      })

      .addCase(GetProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.getData = action.payload;
      })

      .addCase(GetProductByIdData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetProductByIdData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetProductByIdData.fulfilled, (state, action) => {
        state.status = "success";
        state.getDataById = action.payload;
      })


      .addCase(GetCategoryData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetCategoryData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetCategoryData.fulfilled, (state, action) => {
        state.status = "success";
        state.getCategory = action.payload;
      })


      .addCase(GetUnitData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetUnitData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetUnitData.fulfilled, (state, action) => {
        state.status = "success";
        state.getUnit = action.payload;
      })

      .addCase(GetFilterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetFilterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetFilterData.fulfilled, (state, action) => {
        state.status = "success";
        state.getFilter = action.payload;
      })

      // Add cases for DeleteProductData
      .addCase(DeleteProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(DeleteProductData.fulfilled, (state, action) => {
        state.status = "success";
        state.deleteData = action.payload;
        ToastAlert(action.payload.message, "success");
      });
  }
});

export const {} = ProductSlice.actions;

export const ProductData = (state) => {
  return state.product;
};

export const productReducer = ProductSlice.reducer;
