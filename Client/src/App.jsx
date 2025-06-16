import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider,redirect } from "react-router-dom";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import NotFound from "./NotFound";
import DonorRegister, { action as donorRegAction } from "./Form-components/Donor-forms/DonorRegister";
import DonorLogin,  {loader as donorLogLoader,  action as donorLogAction, loader } from "./Form-components/Donor-forms/DonorLogin";
import RecipientLogin, {loader as recipientLogLoader, action as recipientLogAction } from "./Form-components/Recipient-forms/RecipientLogin";
import RecipientRegister, { action as recipientRegAction } from "./Form-components/Recipient-forms/RecipientRegister";
import DonorLayout from "./Donor-components/DonorLayout";
import DonorDashboard, {loader as donorDashboardLoader} from "./Donor-components/DonorDashboard";
import BloodDonate, {loader as bloodDonateLoader, action as bloodDonateAction} from "./Donor-components/BloodDonate";
import DonorHistory, {loader as donorHistoryLoader} from "./Donor-components/DonorHistory";
import BloodRequest, { action as bloodRequestAction, loader as bloodRequestLoader } from "./Recipient-components/BloodRequest";
import RecipientDashboard, {loader as recipientDashboardLoader} from "./Recipient-components/RecipientDashboard";
import RecipientHistory, {loader as recipientHistoryLoader} from "./Recipient-components/RecipientHistory";
import RecipientLayout from "./Recipient-components/RecipientLayout";
import RecipientProfile, {loader as recipientProfileLoader, action as recipientProfileAction} from "./Recipient-components/RecipientProfile";
import DonorProfile, { loader as donorProfileLoader, action as donorProfileAction} from "./Donor-components/DonorProfile";
import AdminLogin, { adminAction, loginLoader } from "./Form-components/Admin-form/AdminLogin";
import AdminDashboard, {loader as adminDashboardLoader} from "./Admin-components/AdminDashboard";
import AdminLayout, {loader as adminLayoutLoader} from "./Admin-components/AdminLayout";
import BloodDonations, {loader as bloodDonationsLoader, action as bloodDonationsAction} from "./Admin-components/BloodDonations";
import BloodRequests, {loader as bloodRequestsLoader, action as bloodRequestsAction} from "./Admin-components/BloodRequests";
import BloodInventory, {loader as bloodInventoryLoader} from "./Admin-components/BloodInventory";
import AddBlood, {action as addBloodAction} from "./Admin-components/AddBlood";
import Donors, {loader as donorsLoader} from "./Admin-components/Donors";
import Recipients, {loader as recipientsLoader} from "./Admin-components/Recipients";
import { authDonor } from "./Form-components/Donor-forms/authDonor";
import { authRecipient } from "./Form-components/Recipient-forms/recipientAuth";
import RemoveBlood, {action as removeBloodAction} from "./Admin-components/RemoveBlood";
import VerifyDonorUsername, {action as verifyDonorUsernameAction} from "./Form-components/Donor-forms/VerifyDonorUsername";
import ChangeDonorPassword, {action as changeDonorPasswordAction, loader as changeDonorPasswordLoader} from "./Form-components/Donor-forms/ChangeDonorPassword";
import ChangeRecipientPassword, {action as changeRecipientPasswordAction, loader as changeRecipientPasswordLoader} from "./Form-components/Recipient-forms/ChangeRecipientPassword";
import VerifyRecipientUsername, {action as verifyRecipientUsernameAction} from "./Form-components/Recipient-forms/VerifyRecipientUsername";
import "./style.css"
import VerifyDonorAnswer, {action as verifyDonorsAnswer, loader as verifyDonorsAnswerLoader} from "./Form-components/Donor-forms/VerifyDonorAnswer";
import VerifyRecipientAnswer, {action as verifyRecipientAnswerAction, loader as verifyRecipientAnswerLoader} from "./Form-components/Recipient-forms/VerifyRecipientAnswer";
import ErrorBoundary from "./ErrorBoundary";
import ErrorBoundaryFallback from "./ErrorBoundaryFallback";

function App() {
const router = createBrowserRouter(createRoutesFromElements(
      <Route  >
          <Route path="/" element={<Home/>}/>
          <Route path="/donor-login" element={<DonorLogin />} loader={donorLogLoader} action={donorLogAction}/>
          <Route path="/donor-register" element={<DonorRegister />} action={donorRegAction}/>
          <Route path="/recipient-login" element={<RecipientLogin />} loader={recipientLogLoader} action={recipientLogAction}/>
          <Route path="/recipient-register" element={<RecipientRegister />} action={recipientRegAction}/>
          <Route path="/verify-donor-answer" element={<VerifyDonorAnswer/>} action={verifyDonorsAnswer} loader={verifyDonorsAnswerLoader}/>
          <Route path="/verify-donor-username" element={<VerifyDonorUsername/>} action={verifyDonorUsernameAction}/>
          <Route path="/change-donor-password" element={<ChangeDonorPassword/>} action={changeDonorPasswordAction} loader={changeDonorPasswordLoader}/>
          <Route path="/verify-recipient-username" element={<VerifyRecipientUsername/>} action={verifyRecipientUsernameAction}/>
          <Route path="/verify-recipient-answer" element={<VerifyRecipientAnswer/>} action={verifyRecipientAnswerAction} loader={verifyRecipientAnswerLoader}/>
          <Route path="/change-recipient-password" element={<ChangeRecipientPassword/>} action={changeRecipientPasswordAction} loader={changeRecipientPasswordLoader}/>
          <Route path="/admin-login" element={<AdminLogin />} action={adminAction} loader={loginLoader}/>
          <Route path="/donor" element={<DonorLayout/>} errorElement={<ErrorBoundaryFallback/>}   loader={
            async () => await authDonor()
          }>
            <Route index element={<DonorDashboard/>} loader={donorDashboardLoader}/>
            <Route path="donate" element={<BloodDonate />} action={bloodDonateAction} loader={bloodDonateLoader}/>
            <Route path="history" element={<DonorHistory />} loader={donorHistoryLoader}/>
            <Route path="profile" element={<DonorProfile />} loader={donorProfileLoader} action={donorProfileAction}/>
          </Route>
          <Route path="/recipient" element={<RecipientLayout />} errorElement={<ErrorBoundaryFallback/>}   loader={
            async () => await authRecipient()
          }>
            <Route index element={<RecipientDashboard />} loader={recipientDashboardLoader}/>
            <Route path="request" element={<BloodRequest />} action={bloodRequestAction} loader={bloodRequestLoader} />
            <Route path="history" element={<RecipientHistory />} loader={recipientHistoryLoader} />
            <Route path="profile" element={<RecipientProfile />} loader={recipientProfileLoader} action={recipientProfileAction}/>
          </Route>
          <Route path="/admin" element={<AdminLayout/>} errorElement={<ErrorBoundaryFallback/>}  loader={adminLayoutLoader}>
            <Route index element={<AdminDashboard />} loader={adminDashboardLoader}/>
            <Route path="donations" element={<BloodDonations />} loader={bloodDonationsLoader} action={bloodDonationsAction}/>
            <Route path="blood-requests" element={<BloodRequests />} loader={bloodRequestsLoader} action={bloodRequestsAction}/>
            <Route path="inventory" element={<BloodInventory />} loader={bloodInventoryLoader}/>
            <Route path="add-blood" element={<AddBlood />} action={addBloodAction}/>
            <Route path="remove-blood" element={<RemoveBlood />} action={removeBloodAction}/>
            <Route path="donors" element={<Donors />} loader={donorsLoader}/>
            <Route path="recipients" element={<Recipients />} loader={recipientsLoader}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
      </Route>
))

return (
  <>
    <ErrorBoundary>
      <RouterProvider router={router}/>
    </ErrorBoundary>
    <ToastContainer limit={1} autoClose={3000}/>
  </>
)
}

export default App