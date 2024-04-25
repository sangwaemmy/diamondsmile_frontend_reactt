import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import "./components/Styles/App.css"
import "./components/Styles/commons.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { heart as wedding } from 'react-icons-kit/icomoon/heart'

import { ic_view_week_outline as struc } from 'react-icons-kit/md/ic_view_week_outline'
import SideBar from "./components/Navbar/SideBar";
import Dashboard from "./components/pages/Dashboard";
import "./components/Styles/SideBar.css"
import About from "./components/pages/About";
import AccountPage from "./components/pages/AccountPage";
import Account_category from "./components/pages/Account_category";
import Profile from "./components/pages/Profile";
import Items from "./components/pages/items";
import Sales from "./components/pages/Sales";
import Hwmovement from "./components/pages/Hw_movement";
import Sale_purchase_journal from "./components/pages/Sale_purchase_journal";
import Purchases from "./components/pages/Purchases";
import ItemCategory from "./components/pages/item_category";
import LoggedInPage from "./components/pages/LoggedInPage";
import { RequireAuth } from "react-auth-kit";
import Admin from "./components/pages/Admin";
import Damage from "./components/pages/Damage";
import Return from "./components/pages/Return";
import Configure from "./components/pages/Configure";
import Changepassword from "./components/pages/Changepassword";
import Appointment from "./components/pages/Appointment";
import Serv_group from "./components/pages/Serv_group";
import PatientUsers from "./components/pages/PatientUsers";
import PubAppointment from "./components/pages/PubAppointment";
import Product from "./components/pages/Product";
import Orders from "./components/pages/Orders";
import Images from "./components/pages/Images";
import Sample from "./components/pages/ImageSample";
import ImageUpload from "./components/pages/ImageSample";
import ImageSample from "./components/pages/ImageSample";
import Form1 from "./redux-table/Form1";
import { Provider } from 'react-redux';
import { store } from './redux-table/Store';
import { Form2 } from "./redux-table/Form2";
import { Result } from "./redux-table/Result";
import Pagination from "./redux-table/TablePages";
import { Check } from "./components/pages/Immage";
import QuickAppointment from "./components/pages/QuickAppointment";
import CreateAccount from "./components/pages/CreateAccount";
import PubUserDestination from "./components/pages/pub/PubUserDestination";
import PubProducts from "./components/pages/pub/PubProducts";
import PubProductDetails from "./components/pages/pub/PubProductDetails";


function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <QuickAppointment />} />

          <Route path="/dashboard" element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>
          } />

          <Route path="/account" element={
            <RequireAuth loginPath="/login">
              <AccountPage />
            </RequireAuth>

          } />
          <Route path="/patientsusers" element={
            <RequireAuth loginPath="/login">
              <PatientUsers />
            </RequireAuth>
          } />

          <Route path="/acc_category" element={
            <RequireAuth loginPath="/login">
              <Account_category />
            </RequireAuth>} />
          <Route path="/profile" element={
            <RequireAuth loginPath="/login">
              <Profile />
            </RequireAuth>} />
          <Route path="/orders" element={
            <RequireAuth loginPath="/login">
              <Orders />
            </RequireAuth>} />

          <Route path="/admin" element={
            <RequireAuth loginPath="/login">
              <Admin />
            </RequireAuth>} />

          <Route path="/appointment" element={
            <RequireAuth loginPath="/login">
              <Appointment />
            </RequireAuth>} />

          <Route path="/changepassword" element={
            <RequireAuth loginPath="/login">
              <Changepassword />
            </RequireAuth>} />

          <Route path="/serv_group" element={
            <RequireAuth loginPath="/login">
              <Serv_group />
            </RequireAuth>} />

          <Route path="/product" element={
            <RequireAuth loginPath="/login">
              <Product />

            </RequireAuth>} />

          <Route path="/form1" element={
            <RequireAuth loginPath="/login">
              <Form1 />
            </RequireAuth>} />
          <Route path="/form2" element={
            <RequireAuth loginPath="/login">
              <Form2 />
            </RequireAuth>} />
          <Route path="/view" element={
            <RequireAuth loginPath="/login">
              <Result />
            </RequireAuth>} />
          <Route path="/table" element={
            <RequireAuth loginPath="/login">
              <Pagination />
            </RequireAuth>} />
          <Route path="/check" element={
            <RequireAuth loginPath="/login">
              <Check />
            </RequireAuth>} />
          <Route path="/pubcreateaccount" element={
            <CreateAccount />
          } />

          {/* Login */}
          <Route path="/login" element={<LoggedInPage />} />
          <Route path="/afterappintmentSave" element={<PubUserDestination/>}/>
          <Route path="/pubproduct" element={<PubProducts/>}/>
          <Route path="/pubproductDetails" element={<PubProductDetails/>}/>

          <Route path="/image" element={
            <RequireAuth loginPath="/login">
              <Images />
            </RequireAuth>} />
          <Route path="/sample" element={
            <RequireAuth loginPath="/login">
              <ImageSample />
            </RequireAuth>} />
        </Routes>



      </Provider>
    </div>
  );
}

export default App;
