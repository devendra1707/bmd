// "use client";
// import React from 'react'
// import { Instagram, Twitter, YouTube } from '@mui/icons-material'
// const Footer = () => {
//   return (
//     <footer className='my-40'>

//     <div className='container mx-auto py-8'>
//       <div className="grid grid-cols-1 md:flex justify-around">
//         <div className="footer-links">
//           <img src="" alt="" />
//           <div className="flex items-center mt-5">
//             <Instagram className='' style={{ fontSize: 40 }} />
//             <YouTube className='ml-5' style={{ fontSize: 40 }} />
//             <Twitter className='' style={{ fontSize: 40 }} />
//           </div>
//         </div>
//         <div className="footer-linkss">
//           <h3 className="text-lg font-semibold">
//             Explore
//           </h3>
//           <ul className='mt-4'>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>
//                 Book a Ride
//               </a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>
//                 Carrers
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div className="footer-links">
//           <h3 className="text-lg font-semibold">Customer Support</h3>
//           <ul className="mt-4">
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>Help Center</a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>Contact Us</a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>FAQs</a>
//             </li>

//           </ul>
//         </div>

//         <div className="footer-links">
//           <h3 className='text-lg font-semibold'>Legal</h3>
//           <ul className="mt-4">
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>Terms & Conditions</a>
//             </li>
//             <li>
//               <a href="#" className='text-gray-400 hover:text-white'>Privacy Policy</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//     </div>
//     <div className="bg-gray-800 py-4">
//       <div className="container mx-auto">
//         <p className='text-center text-gray-400 text-sm'>
//           &copy; {new Date().getFullYear()} Ola Cabs. All rights reserved
//         </p>
//       </div>
//     </div>

//   </footer>
// )
// }
 

// export default Footer


import React from "react";
import { Grid, Typography } from "@mui/material"; // Import components from MUI
import { Container } from "reactstrap"; // Import Container from Reactstrap

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "20px 0" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Links</Typography>
            <Typography variant="body2">
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">
              123 Main Street, City Name <br />
              Country, Postal Code <br />
              Phone: +1234567890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Follow Us</Typography>
            {/* Add social media icons or links here */}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;

