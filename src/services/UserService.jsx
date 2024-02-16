import { myAxios } from "./helper";

export const signUp = (id, user) => {
  return myAxios
    .post(`register?id=${id}`, user)
    .then((response) => response.data);
};

export const sendOtp = (userMobileNumber) => {
  return myAxios
    .post(`send-otp?mobileNumber=${userMobileNumber}`, userMobileNumber)
    .then((response) => response.data);
};

// export const loginUser = (otp) => {
//   return myAxios.post(`login`, otp).then((response) => response.data);
// };
export const loginUser = (otp, userMobileNumber) => {
  return myAxios.post(`login`, { otp, userMobileNumber }).then((response) => response.data);
};


// To Test The Api is Working Or not
export const testApi = () => {
  return myAxios.get(`test`).then((response) => {
    return response.data;
  });
};
