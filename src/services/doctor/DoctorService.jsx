import { myAxios, privateAxios } from "../helper";

//doctor/current
export const getCurrentDoctor = () => {
  return privateAxios.get(`doctor/current`).then((response) => {
    return response.data;
  });
};

// get Doctor By Specilist

export const getDoctorBySpelist = (specilist) => {
  return myAxios.get(`doctor/specialist/${specilist}`).then((response) => {
    return response.data;
  });
};

// Update doctor details

export const updateDoctorDetails = (user) => {
  return privateAxios.put(`doctor/update`, user).then((response) => {
    return response.data;
  });
};
