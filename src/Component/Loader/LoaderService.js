import { instance } from "../../../Features/Network/ApiCall";

export async function AddAmenties(data) {
  const response = await instance.post(`/master/amenties`, data);
  return response.data;
}

export async function GetAmenties() {
  const response = await instance.get(`/master/amenties`);
  return response.data;
}
