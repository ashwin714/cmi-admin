import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ToastAlert from "../../Component/Alert/ToastAlert";
import {
  AddOrder,
  GetOrder,
  GetOrderById,
  GetCustomer,
  UpdateOrderStatus,
  UploadOrderAttachment,
  GetOrderAttachments,
  DeleteOrderAttachment,
} from "./OrderService";
// import swal from "sweetalert";

const initialState = {
  addData: undefined,
  getData: undefined,
  getOrderDataById: undefined,
  getCustomer: undefined,
  error: undefined,
  status: "idle",
  attachments: [],
};

export const AddOrderData = createAsyncThunk("Order/AddOrder", async (data) => {
  const response = await AddOrder(data);
  return response;
});

export const GetOrderData = createAsyncThunk("Order/GetOrder", async (id) => {
  const response = await GetOrder(id);
  return response;
});
export const GetOrderDataById = createAsyncThunk(
  "Order/GetOrderById",
  async (id) => {
    const response = await GetOrderById(id);
    return response;
  }
);
export const GetCustomerData = createAsyncThunk(
  "Order/GetCustomer",
  async () => {
    const response = await GetCustomer();
    return response;
  }
);
export const UpdateStatus = createAsyncThunk(
  "Order/UpdateStatus",
  async (data) => {
    const response = await UpdateOrderStatus(data);
    return response;
  }
);
export const UploadAttachments = createAsyncThunk(
  "Order/UploadAttachments",
  async (data) => {
    const response = await UploadOrderAttachment(data.data);
    return response;
  }
);
export const GetAttachmentsById = createAsyncThunk(
  "Order/GetAttachmentsById",
  async (id) => {
    const response = await GetOrderAttachments(id);
    return response;
  }
);
export const DeleteAttachmentById = createAsyncThunk(
  "Order/DeleteAttachmentById",
  async (data) => {
    const response = await DeleteOrderAttachment(data);
    return response;
  }
);

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetAttachmentsById.fulfilled, (state, action) => {
        state.status = "success";
        state.attachments = action.payload;
      })

      .addCase(UploadAttachments.fulfilled, (state) => {
        ToastAlert("Uploaded", "success");
      })

      .addCase(UpdateStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(UpdateStatus.fulfilled, (state, action) => {
        state.status = "success";
        state.addData = action.payload;
        ToastAlert(action.payload.message, "success");
      })

      .addCase(AddOrderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddOrderData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(AddOrderData.fulfilled, (state, action) => {
        state.status = "success";
        state.addData = action.payload;
        ToastAlert(action.payload.message, "success");
      })

      .addCase(GetOrderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetOrderData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetOrderData.fulfilled, (state, action) => {
        state.status = "success";
        state.getData = action.payload;
      })

      .addCase(GetOrderDataById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetOrderDataById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetOrderDataById.fulfilled, (state, action) => {
        state.status = "success";
        state.getOrderDataById = action.payload;
      })

      .addCase(GetCustomerData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetCustomerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      })
      .addCase(GetCustomerData.fulfilled, (state, action) => {
        state.status = "success";
        state.getCustomer = action.payload;
      });
  },
});

export const {} = OrderSlice.actions;

export const OrderData = (state) => {
  return state.order;
};

export const orderReducer = OrderSlice.reducer;
