import { configureStore } from "@reduxjs/toolkit";
import { countryReducer } from "./countrySlice";
import { stateReducer } from "./stateSlice";
import { cityReducer } from "./citySlice";
import { firstCategoryReducer } from "./firstCategorySlice";
import { secondCategoryReducer } from "./secondCategorySlice";
import { thirdCategoryReducer } from "./thirdCategorySlice";
import { amenityReducer } from "./amenitySlice";
import { paymentReducer } from "./paymentSlice";
import { serviceReducer } from "./serviceSlice";
import { companyReducer } from "./companySlice";
import { companyXAmenityReducer } from "./companyXAmenitySlice";
import { companyXPaymentReducer } from "./companyXPaymentSlice";
import { companyXServiceReducer } from "./companyXServiceSlice";
import { applicationRoleReducer } from "./applicationRoleSlice";
import { applicationUserReducer } from "./applicationUserSlice";
import { applicationUserRoleReducer } from "./applicationUserRoleSlice";
import { userAuthReducer } from "./userAuthSlice";

import {
  countryApi,
  stateApi,
  cityApi,
  firstCategoryApi,
  secondCategoryApi,
  thirdCategoryApi,
  amenityApi,
  paymentApi,
  serviceApi,
  companyApi,
  companyXAmenityApi,
  companyXPaymentApi,
  companyXServiceApi,
  applicationRoleApi,
  applicationUserApi,
  applicationUserRoleApi,
  usersApi
} from "../../Apis";

const store = configureStore({
  reducer: {
    countryStore: countryReducer,
    stateStore: stateReducer,
    cityStore: cityReducer,
    firstCategoryStore: firstCategoryReducer,
    secondCategoryStore: secondCategoryReducer,
    thirdCategoryStore: thirdCategoryReducer,
    amenityStore : amenityReducer,
    paymentStore: paymentReducer,
    serviceStore : serviceReducer,
    companyStore : companyReducer,
    companyXAmenityStore : companyXAmenityReducer,
    companyXPaymentStore : companyXPaymentReducer,
    companyXServiceStore : companyXServiceReducer,
    applicationRoleStore : applicationRoleReducer,
    applicationUserStore : applicationUserReducer,
    applicationUserRoleStore : applicationUserRoleReducer,
    userAuthStore : userAuthReducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [stateApi.reducerPath]: stateApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [firstCategoryApi.reducerPath]: firstCategoryApi.reducer,
    [secondCategoryApi.reducerPath]: secondCategoryApi.reducer,
    [thirdCategoryApi.reducerPath]: thirdCategoryApi.reducer,
    [amenityApi.reducerPath]: amenityApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [companyXAmenityApi.reducerPath] : companyXAmenityApi.reducer,
    [companyXPaymentApi.reducerPath] : companyXPaymentApi.reducer,
    [companyXServiceApi.reducerPath] : companyXServiceApi.reducer,
    [applicationRoleApi.reducerPath] : applicationRoleApi.reducer,
    [applicationUserApi.reducerPath] : applicationUserApi.reducer,
    [applicationUserRoleApi.reducerPath] : applicationUserRoleApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countryApi.middleware)
      .concat(stateApi.middleware)
      .concat(cityApi.middleware)
      .concat(firstCategoryApi.middleware)
      .concat(secondCategoryApi.middleware)
      .concat(thirdCategoryApi.middleware)
      .concat(amenityApi.middleware)
      .concat(paymentApi.middleware)
      .concat(serviceApi.middleware)
      .concat(companyApi.middleware)
      .concat(companyXAmenityApi.middleware)
      .concat(companyXPaymentApi.middleware)
      .concat(companyXServiceApi.middleware)
      .concat(applicationRoleApi.middleware)
      .concat(applicationUserApi.middleware)
      .concat(applicationUserRoleApi.middleware)
      .concat(usersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
