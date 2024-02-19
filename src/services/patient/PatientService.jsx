import { myAxios, privateAxios } from "../helper";

// Get All Doctors
export const getAllDoctors = () => {
  return privateAxios.get(`patient/doctor/all`).then((response) => {
    return response.data;
  });
};

// Get All Appointments

export const getAllAppointments = (pageNumber, pageSize) => {
  return privateAxios
    .get(
      `appointment/my-appointments?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=id&sortDir=asc`
    )
    .then((response) => {
      return response.data;
    });
};
// Get All Appointments

// export const getAllAppointments = () => {
//   return privateAxios.get(`appointment/my-appointments`).then((response) => {
//     return response.data;
//   });
// };

// Get Current Patient

export const getCurrentPatient = () => {
  return privateAxios.get(`patient/current`).then((response) => {
    return response.data;
  });
};

// Get Doctor Profile One At a time

export const getDoctorById = (doctorId) => {
  return privateAxios.get(`doctor/` + doctorId).then((response) => {
    return response.data;
  });
};

// Get All Doctor With Pagination

export const getAllDoctor = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `patient/doctors/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=id&sortDir=asc`
    )
    .then((response) => {
      return response.data;
    });
};

// Update Details

export const updatePatientDetails = (user) => {
  return privateAxios.put(`patient/update`, user).then((response) => {
    return response.data;
  });
};
