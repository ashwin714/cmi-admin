import { instance } from "../../Features/Network/ApiCall";

export async function AddOrder(data) {
  const response = await instance.post(`/Order`, data);
  return response.data;
}

export async function GetOrder(id) {
  let orderUrl = "";
  if (id) {
    orderUrl = `/order?customerId=${id}`;
  } else {
    orderUrl = `/order?`;
  }
  const response = await instance.get(orderUrl);
  return response.data;
}
export async function GetOrderById(id) {
  const response = await instance.get(`/order/${id}`);
  return response.data;
}
export async function GetOrderAttachments(id) {
  const response = await instance.get(`/order/${id}/attachment`);
  return response.data;
}
export async function DeleteOrderAttachment(data) {
  const response = await instance.delete(
    `/order/${data.orderId}/attachment/${data.id}`
  );
  return response.data;
}
export async function GetCustomer() {
  const response = await instance.get(`/order/customers/`);
  return response.data;
}
export async function UpdateOrderStatus(data) {
  const response = await instance.put(`/order/${data.id}/status`, {
    status: data.status,
  });
  return response.data;
}
export async function UploadOrderAttachment(data) {
  console.log(data);
  const formData = new FormData();
  data.files.forEach((file) => {
    formData.append("file", file);
  });
  console.log("file name", data.file?.name);
  const response = await instance.put(
    `/order/${data.id}/attachment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Optional: Axios usually sets this correctly
      },
    }
  );
  return response.data;
}
