require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5001


app.get('/', (req, res) => {
  res.send('hello everyone!');
});

const cors = require("cors");
const corsOptions = {
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.post('/donorlogin', require('./login-account.js').loginDonorAccount);
app.post('/recipientlogin', require('./login-account.js').loginRecipientAccount);

app.get('/donorlogin/:username', require('./login-account.js').getDonorAccount);
app.get('/recipientlogin/:username', require('./login-account.js').getRecipientAccount);


app.get("/donate/all", require("./donate-donations.js").getAllDonations)
app.get("/request/all", require("./blood-requests.js").getAllRequests)

app.post('/donate', require('./donate-donations.js').donate)
app.post('/request', require('./blood-requests.js').request)

app.patch("/request/all/:id", require("./blood-requests.js").updateRequestStatus)
app.patch("/donate/all/:id", require("./donate-donations.js").updateDonationStatus)

app.get("/donate/:username", require("./donate-donations.js").getDonations)
app.get("/donate/:username/last", require("./donate-donations.js").getLastDonation);
app.get("/request/:username", require("./blood-requests.js").getRequests)
app.get("/request/:username/last", require("./blood-requests.js").getLastRequest);

app.post('/donorregister', require('./create-account.js').createDonorAccount);
app.post('/recipientregister', require('./create-account.js').createRecipientAccount);
app.patch('/donorregister/:id', require('./create-account.js').updateDonorProfile);
app.patch('/recipientregister/:id', require('./create-account.js').updateRecipientProfile);

app.patch("/bloodTypes/add", require("./blood-Stock.js").addToStock)
app.patch("/bloodTypes/remove", require("./blood-Stock.js").removeFromStock)


app.post("/bloodTypes", require("./seedBloodTypes.js").seedBloodTypes)
app.get("/bloodTypes", require("./get-BloodTypes.js").getBloodStocks)


app.post('/donorregister/:username/verify-username', require("./forgot-password.js").verifyDonorUsername);
app.post('/donorregister/:username/verify-answer', require("./forgot-password.js").verifyDonorSecurityAnswer);

app.post('/donorregister/:username/reset', require("./forgot-password.js").resetDonorPassword);

app.post('/recipientregister/:username/verify-username', require("./forgot-password.js").verifyRecipientUsername);
app.post('/recipientregister/:username/verify-answer', require("./forgot-password.js").verifyRecipientSecurityAnswer);
app.post('/recipientregister/:username/reset', require("./forgot-password.js").resetRecipientPassword);

app.get("/donorregister/all", require("./create-account.js").getAllDonors)
app.get("/recipientregister/all", require("./create-account.js").getAllRecipients)

app.get("/pending-user-donations", require("./donate-donations.js").getPendingUserDonations);
app.get("/accepted-user-donations", require("./donate-donations.js").getAcceptedUserDonations);
app.get("/rejected-user-donations", require("./donate-donations.js").getRejectedUserDonations);
app.get("/pending-user-requests", require("./blood-requests.js").getPendingUserRequests);
app.get("/accepted-user-requests", require("./blood-requests.js").getAcceptedUserRequests);
app.get("/rejected-user-requests", require("./blood-requests.js").getRejectedUserRequests);


app.use("/pending-requests", require("./blood-requests.js").getPendingRequests);
app.use("/pending-donations", require("./donate-donations.js").getPendingDonations);

app.post("/adminlogin", require("./admin-login.js").adminLogin)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
