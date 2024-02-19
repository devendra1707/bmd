import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

const Base = ({ children }) => {
  return (
    <div className="container-fluid p-0 mt-5" style={{ overflowX: "hidden" }}>
      <CustomNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default Base;
