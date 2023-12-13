import React from "react";
import { Footer, Header } from "../Components/Layout/index";

import { CountryList, CountryUpsert,
  CountryListByLazyLoading,CountryListByPagination,
  StateList,StateUpsert,
  CityList,CityUpsert,
  FirstCategoryList,FirstCategoryUpsert,
  SecondCategoryList,SecondCategoryUpsert,
  ThirdCategoryList,ThirdCategoryUpsert,
  AmenityList,AmenityUpsert,
  PaymentList,PaymentUpsert,
  ServiceList,ServiceUpsert,
  CompanyList,CompanyUpsert,
  CompanyXAmenityList,CompanyXAmenityUpsert,
  CompanyXPaymentList,CompanyXPaymentUpsert,
  CompanyXServiceList,CompanyXServiceUpsert,
  NotFound,
  Home, 
  CompanyDetail,
  ApplicationRoleList,
  ApplicationRoleUpsert,
  ApplicationUserList,
  ApplicationUserUpsert,
  AccessDenied,
  Login,
    Register,
    Search
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import jwt_decode from "jwt-decode";
// import { userModel } from "../Interfaces";
// import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
 import { RootState } from "../Storage/Redux/store";

function App() {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/search/:search" element={<Search />} />

          <Route path="/country/countrylist" element={<CountryList />} />
          <Route path="/country/countrylistByLazyLoading" element={<CountryListByLazyLoading />} />
          <Route path="/country/countrylistByPagination" element={<CountryListByPagination />} />
          <Route path="/country/countryUpsert/:id" element={<CountryUpsert />} />
          <Route path="/country/countryUpsert" element={<CountryUpsert />} />

          <Route path="/state/statelist" element={<StateList />} />
          <Route path="/state/stateUpsert/:id" element={<StateUpsert />} />
          <Route path="/state/stateUpsert" element={<StateUpsert />} />

          <Route path="/city/citylist" element={<CityList />} />
          <Route path="/city/cityUpsert/:id" element={<CityUpsert />} />
          <Route path="/city/cityUpsert" element={<CityUpsert />} />

          <Route path="/firstCategory/firstCategorylist" element={<FirstCategoryList />} />
          <Route path="/firstCategory/firstCategoryUpsert/:id" element={<FirstCategoryUpsert />} />
          <Route path="/firstCategory/firstCategoryUpsert" element={<FirstCategoryUpsert />} />
          
          <Route path="/secondCategory/secondCategorylist" element={<SecondCategoryList />} />
          <Route path="/secondCategory/secondCategoryUpsert/:id" element={<SecondCategoryUpsert />} />
          <Route path="/secondCategory/secondCategoryUpsert" element={<SecondCategoryUpsert />} />
          
          <Route path="/thirdCategory/thirdCategorylist" element={<ThirdCategoryList />} />
          <Route path="/thirdCategory/thirdCategoryUpsert/:id" element={<ThirdCategoryUpsert />} />
          <Route path="/thirdCategory/thirdCategoryUpsert" element={<ThirdCategoryUpsert />} />
          
          <Route path="/amenity/amenitylist" element={<AmenityList />} />
          <Route path="/amenity/amenityUpsert/:id" element={<AmenityUpsert />} />
          <Route path="/amenity/amenityUpsert" element={<AmenityUpsert />} />
          
          <Route path="/payment/paymentlist" element={<PaymentList />} />
          <Route path="/payment/paymentUpsert/:id" element={<PaymentUpsert />} />
          <Route path="/payment/paymentUpsert" element={<PaymentUpsert />} />
          
          <Route path="/service/servicelist" element={<ServiceList />} />
          <Route path="/service/serviceUpsert/:id" element={<ServiceUpsert />} />
          <Route path="/service/serviceUpsert" element={<ServiceUpsert />} />
          
          <Route path="/company/companylist" element={< CompanyList/>} />
          <Route path="/company/companyUpsert/:id" element={<CompanyUpsert />} />
          <Route path="/company/companyUpsert" element={<CompanyUpsert />} />
          
          <Route path="/companyXAmenity/companyXAmenitylist" element={< CompanyXAmenityList/>} />
          <Route path="/companyXAmenity/companyXAmenityUpsert/:companyId/:firstCategoryId" element={<CompanyXAmenityUpsert />} />
          <Route path="/companyXAmenity/companyXAmenityUpsert" element={<CompanyXAmenityUpsert />} />
          
          <Route path="/companyXPayment/companyXPaymentlist" element={< CompanyXPaymentList/>} />
          <Route path="/companyXPayment/companyXPaymentUpsert/:companyId" element={<CompanyXPaymentUpsert />} />
          <Route path="/companyXPayment/companyXPaymentUpsert" element={<CompanyXPaymentUpsert />} />
          
          <Route path="/companyXService/companyXServicelist" element={< CompanyXServiceList/>} />
          <Route path="/companyXService/companyXServiceUpsert/:companyId/:firstCategoryId" element={<CompanyXServiceUpsert />} />
          <Route path="/companyXService/companyXServiceUpsert" element={<CompanyXServiceUpsert />} />

          <Route path="*" element={<NotFound />}></Route>

          <Route path="/companyDetail/:companyId" element={<CompanyDetail />} />

          <Route path="/applicationRole/applicationRolelist" element={< ApplicationRoleList/>} />
          <Route path="/applicationRole/applicationRoleUpsert/:id" element={<ApplicationRoleUpsert />} />
          <Route path="/applicationRole/applicationRoleUpsert" element={<ApplicationRoleUpsert />} />

          
          <Route path="/applicationUser/applicationUserlist" element={< ApplicationUserList/>} />
          <Route path="/applicationUser/applicationUserUpsert/:userId" element={<ApplicationUserUpsert />} />
          <Route path="/applicationUser/applicationUserUpsert" element={<ApplicationUserUpsert />} />

          <Route path="/login" element={< Login/>} />
          <Route path="/register" element={< Register/>} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
