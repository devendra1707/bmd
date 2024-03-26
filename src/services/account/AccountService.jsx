import { myAxios } from "../helper";

export const getAccountHolder = () => {
  return myAxios.get(`scopes/51648`).then((response) => {
    return response.data;
  });
};
