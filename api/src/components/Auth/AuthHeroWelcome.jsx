// import React from "react";
// import Logo from "../../assets/Images/Logo.png";
// import AuthHeroImg from "./AuthHeroImg";
// import Button from "../Button";
// import Google from "../../assets/Images/google.png";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../../../API_MODULES/API_ADDRESS";
// import { useState } from "react";
// const [error, setError] = useState("");
// const [success, setSuccess] = useState("");


// function AuthHeroWelcome() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Function to make POST request
//   async function postData(url, data) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/users/register/initiate`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.message || `HTTP error! Status: ${response.status}`
//         );
//       }

//       const responseData = await response.json();
//       return responseData;
//     } catch (error) {
//       console.error("Error during POST request:", error);
//       throw error;
//     }
//   }

//   // Function to create user
//   const createUser = async (userData) => {
//     return await postData(`${API_BASE_URL}/users/register/initiate`, userData);
//   };

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setIsSubmitting(true);

//     try {
//       const newUser = await createUser({ email });
//       setSuccess(
//         `Welcome ${newUser.email || "aboard"}! Account created successfully.`
//       );
//       setEmail("");
      
//       // Store in memory instead of localStorage (or use state management)
//       // If you need to use this in another component, consider using Context or state management
      
//       setTimeout(() => {
//         navigate("/login", { state: { email: newUser.email } });
//       }, 2000); // Reduced timeout to 2 seconds for better UX
//     } catch (err) {
//       setError(err.message || "Failed to register. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const navigate = useNavigate();
//   return (
//     <>
//       <AuthHeroImg />
//       <div className="justify-center items-center flex">
//         <div className="flex justify-center items-center absolute top-0.5 w-auto text-center flex-col">
//           <div className="opacity-100 flex justify-center items-center flex-col">
//             <img src={Logo} alt="" className="w-2/5" />
//           </div>
//           <div className="">
//             <div>
//               <h1 className="text-2xl">Welcome to Vysk Kitchen</h1>
//               <p>Type your email address to log in or create a Vysk account</p>
//             </div>
//             <div className="input mt-10 mb-10">
//               <input
//                 type="text"
//                 className="w-4/5 h-12 rounded-2xl border pl-4 pr-4 pt-4 pb-4 outline-0"
//                 placeholder="Enter Your Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <button
//               className="text-white bg-[#e59a0d] cursor-pointer w-4/5 h-12 rounded-2xl pl-4 pr-4 pt-2 pb-2"
//               onClick={() => {
//                 navigate(".././verify");
//               }}
//             >
//               Create Account
//             </button>
//             <div className="mt-5">
//               <p>
//                 By continuing you agree to Vsyk kitchen{" "}
//                 <span
//                   className="hover:underline cursor-pointer text-link"
//                   onClick={() => navigate(".././terms-condition")}
//                 >
//                   Terms
//                 </span>{" "}
//                 &{" "}
//                 <span
//                   className="hover:underline cursor-pointer text-link"
//                   onClick={() => navigate(".././terms-consition")}
//                 >
//                   Conditions
//                 </span>
//               </p>
//             </div>
//             <div className="or flex justify-center items-center">
//               <div className="border-2 w-40"></div>
//               <div className="m-5">
//                 <p>Or</p>
//               </div>
//               <div className="border-2 w-40"></div>
//             </div>
//             <div className="google">
//               <button className="w-4/5 h-12 rounded-2xl bg-yellow-200 pl-4 pr-4 pt-2 pb-2" onClick={()=>(handleSubmit)}>
//                 <img
//                   src={Google}
//                   alt=""
//                   className="absolute w-6 rounded-full"
//                 />
//                 Sign Up With Google
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthHeroWelcome;
