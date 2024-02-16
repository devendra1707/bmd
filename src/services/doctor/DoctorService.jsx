import { privateAxios } from "../helper";

//doctor/current
export const getCurrentDoctor = () => {
  return privateAxios.get(`doctor/current`).then((response) => {
    return response.data;
  });
};
