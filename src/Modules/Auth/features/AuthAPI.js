import { auth } from "../../../Features/Network/ApiCall";

export async function Register(data) {
  const response = await auth.post(`/employee/sign-up`, data);
  return response.data;
}

export async function Login(data) {
  const response = await auth.post(`/authenticate`, data);
  return response.data;
}

export async function SendOtp(data) {
  const response = await auth.get(
    `/send-otp?mobile=${data?.mobile}`, data
  );
  return response.data;
}

export async function ChangePassword(data) {
//  console.log(data)
  const response = await auth.put(`/employee/pin`, data
  );
  return response.data;
}
export async function PinPasswordOtp(data) {
  const response = await auth.put( `/employee/pin`,
    data
  );
  return response.data;
}
export async function SetPinPassword(data) {
  //  console.log(data)
    const response = await auth.put(`/employee/replace/pin`, data
    );
    return response.data;
  }
