import { instance } from "../../Features/Network/ApiCall";

export async function AddOrder(data) {
  const response = await instance.post(`/Order`, data);
  return response.data;
}

export async function GetOrder(id) {
  let orderUrl=""
  if(id){
    orderUrl=`/order?customerId=${id}`
  }else{
    orderUrl=`/order?`
  }
  const response = await instance.get(orderUrl);
  return response.data;
}
export async function GetOrderById(id) {
  const response = await instance.get(`/order/${id}`);
  return response.data;
}
export async function GetCustomer() {
  const response = await instance.get(`/order/customers/`);
  return response.data;
}