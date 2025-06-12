// import React from "react";

// export default function TestingForm() {

//     function formAction(formData) {
//         if(formData.get("password") !== formData.get("passwordChecked")) {
//             return{ error: "Passwords do not match"}
//         }

//         try{
//             if(formData.get("password") === formData.get("passwordChecked")) {
//               window.alert("procced to log in")
//             }
//         }
//     }

//     return (
//         <form action={formAction} style={{display: "flex", flexDirection: "column", width: 
//         "200px"}}>
//             <h1>Form</h1>
//             <input type="password" name="password" placeholder="Password"/>
//             <input type="password" name="passwordChecked" placeholder="Confirm Pasword"/>
//             <button>Submit</button>
//         </form>
//     )
// }