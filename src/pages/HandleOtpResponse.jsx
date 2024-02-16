import Otp from "./Otp";

const HandleOtpResponse = ({ response }) => {
  const receivedOtp = response.otp; // Assuming response.otp contains the OTP value
  // Pass the received OTP as a prop to the Otp component
  return <Otp receivedOtp={receivedOtp} />;
};
