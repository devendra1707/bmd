import { myAxios, privateAxios } from "../helper";

// export const loadAllAppointments = () => {
//   return myAxios.get(`appointment/my-appointments`).then((response) => {
//     return response.data;
//   });
// };

// Appointment By Using User Id
export const appoUserId = () => {
  return myAxios.get(`appointment/user/15/appointments`).then((response) => {
    return response.data;
  });
};

// // Book Appointment
// export const bookAppointment = (appointmentData) => {
//   console.log(appointmentData);
//   return privateAxios
//     .post(
//       // ${appointmentData.doctorId
//       `appointment/book-appointment?doctorId=${appointmentData.doctorId}`,
//       appointmentData
//     )
//     .then((response) => {
//       return response.data;
//     });
// };

export const bookAppointment = (doctorId, appointmentData) => {
  console.log(appointmentData);
  return privateAxios
    .post(`appointment/book-appointment?doctorId=${doctorId}`, appointmentData)
    .then((response) => {
      return response.data;
    });
};

// /my-appointments
export const getAppointment = () => {
  return privateAxios.get(`appointment/my-appointments`).then((response) => {
    return response.data;
  });
};

// GetAppointment By Appointment Id

export const getAppointmentById = (appointmentId) => {
  return privateAxios.get(`appointment/` + appointmentId).then((response) => {
    return response.data;
  });
};

// Get Appointment By Patient Name  ${patientName}

export const getAppointmentByPatientName = (patientName) => {
  return privateAxios
    .get(`appointment/name/${patientName}`)
    .then((response) => {
      return response.data;
    });
};
