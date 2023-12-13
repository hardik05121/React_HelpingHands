import React, { useEffect, useState } from "react";
import {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "../../Apis/companyApi";
import { useGetCountrysQuery } from "../../Apis/countryApi";
import { useGetStatesQuery } from "../../Apis/stateApi";
import { useGetCitysQuery } from "../../Apis/cityApi";
import { useGetFirstCategorysQuery } from "../../Apis/firstCategoryApi";
import { useGetSecondCategorysQuery } from "../../Apis/secondCategoryApi";
import { useGetThirdCategorysQuery } from "../../Apis/thirdCategoryApi";
import { useGetAmenitysQuery } from "../../Apis/amenityApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const companyData: {
  companyName: string; companyLogo?: string; firstCategoryId?: number;
  secondCategoryId?: number; thirdCategoryId?: number; cityId?: number; countryId?: number;
  address: string; description: string; phoneNumber: string;
  email: string; certificate: string; isDelete?: any; isActive?: boolean;
  whatsApp: string; instagramId: string; facebook?: string; website: string;
  twitter?: string; createdDate?: any; updatedDate?: string; establishDate: string; stateId?: number
} = {
  companyName: "",
  companyLogo: "",
  firstCategoryId: undefined,
  secondCategoryId: undefined,
  thirdCategoryId: undefined,
  countryId: undefined,
  stateId: undefined,
  cityId: undefined,
  email: "",
  address: "",
  description: "",
  phoneNumber: "",
  certificate: "",
  isDelete: false,
  whatsApp: "",
  instagramId: "",
  facebook: "",
  website: "",
  twitter: "",
  createdDate: "",
  updatedDate: "",
  establishDate: "",
  // isActive: false,
};

function CompanyUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [companyInputs, setCompanyInputs] = useState(companyData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const { data } = useGetCompanyByIdQuery(id);
  const { data: countriesData } = useGetCountrysQuery(null);
  const { data: firstCategoriesData } = useGetFirstCategorysQuery(null);
  const { data: statessData } = useGetStatesQuery(null);
  const { data: citysData } = useGetCitysQuery(null);
  const { data: secondacategorysData } = useGetSecondCategorysQuery(null);
  const { data: thirdCategorysData } = useGetThirdCategorysQuery(null);

  // useEffect(() => {
  //   if (data && data.result) {
  //     const tempData = {
  //       stateName: data.result.stateName,
  //       countryId: data.result.countryId,
  //       isActive: data.result.isActive,
  //     };
  //     setStateInputs(tempData);
  //     setIsChecked(tempData.isActive);
  //   }
  // }, [data]);

  useEffect(() => {
    if (id) {
      // Fetch state data by ID
      // const { data } = useGetStateByIdQuery(id);
      if (data && data.result) {
        const tempData = {
          companyName: data.result.companyName,
          firstCategoryId: data.result.firscategoryId,
          countryId: data.result.countryId,
          stateId: data.result.stateId,
          cityId: data.result.cityId,
          secondCategoryId: data.result.secondCategoryId,
          thirdCategoryId: data.result.thirdCategoryId,
          companyLogo: data.result.companyLogo,
          email: data.result.email,
          address: data.result.address,
          description: data.result.description,
          phoneNumber: data.result.phoneNumber,
          certificate: data.result.certificate,
          whatsApp: data.result.whatsApp,
          instagramId: data.result.instagramId,
          facebook: data.result.facebook,
          website: data.result.website,
          twitter: data.result.twitter,
          createdDate: data.result.createdDate,
          updatedDate: data.result.updatedDate,
          establishDate: data.result.establishDate,
          isActive: data.result.isActive,
        };
        setCompanyInputs(tempData);
        setIsChecked(tempData.isActive);
      }
    }
  }, [id]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    // Update CityInputs with the new value of isActive
    setCompanyInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleCompanyInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, companyInputs);
    setCompanyInputs(tempData);
  };

  const handleFirstCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const firstCategoryId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      firstCategoryId,
    }));
  };

  const handleSecondCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const secondCategoryId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      secondCategoryId,
    }));
  };

  const handleThirdCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const thirdCategoryId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      thirdCategoryId,
    }));
  };
  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const countryId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      countryId,
    }));
  };

  const handleStateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const secondCategoryId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      secondCategoryId,
    }));
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const cityId = parseInt(e.target.value);
    setCompanyInputs((prevData) => ({
      ...prevData,
      cityId,
    }));
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("CompanyName", companyInputs.companyName);
    formData.append("IsActive", isChecked.toString());
    formData.append("CountryId", companyInputs.countryId?.toString() || "");
    formData.append("StateId", companyInputs.stateId?.toString() || "");
    formData.append("CityId", companyInputs.cityId?.toString() || "");
    formData.append("FirstCategoryId", companyInputs.firstCategoryId?.toString() || "");
    formData.append("SecondCategoryId", companyInputs.secondCategoryId?.toString() || "");
    formData.append("ThirdCategoryId", companyInputs.thirdCategoryId?.toString() || "");
    formData.append("CompanyLogo", companyInputs.companyLogo?.toString() || "");
    formData.append("Email", companyInputs.email?.toString() || "");
    formData.append("Address", companyInputs.address.toString() || "");
    formData.append("Description", companyInputs.description.toString() || "");
    formData.append("PhoneNumber", companyInputs.phoneNumber.toString() || "");
    formData.append("Certificate", companyInputs.certificate.toString() || "");
    formData.append("WhatsApp", companyInputs.whatsApp.toString() || "");
    formData.append("InstagramId", companyInputs.instagramId.toString() || "");
    formData.append("Facebook", companyInputs.facebook?.toString() || "");
    formData.append("Website", companyInputs.website.toString() || "");
    formData.append("Twitter", companyInputs.twitter?.toString() || "");
    formData.append("CreatedDate", companyInputs.createdDate?.toString() || "");
    formData.append("UpdatedDate", companyInputs.updatedDate?.toString() || "");
    formData.append("EstablishDate", companyInputs.establishDate.toString() || "");
    let response;

    if (id) {
      //update
      formData.append("Id", id);
     
      response = await updateCompany({ data: formData, id });
      toastNotify("Company updated successfully", "success");
    } else {
      //create
      response = await createCompany(formData);

      toastNotify("Company created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/company/companylist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">{id ? "Edit Company" : "Add Company"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="companyName"
              value={companyInputs.companyName}
              onChange={handleCompanyInput}
            />

            <label htmlFor="country">Select Country</label>
            <select
              className="form-control"
              name="countryId"
              value={companyInputs.countryId}
              onChange={(e) => handleCountryChange(e)}
            >
              <option value="">Select Country</option>
              {countriesData?.result.map((country: any) => (
                <option key={country.id} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>

            <label htmlFor="state">Select State</label>
            <select
              className="form-control"
              name="stateId"
              value={companyInputs.stateId}
              onChange={(e) => handleStateChange(e)}
            >
              <option value="">Select State</option>
              {statessData?.result.map((state: any) => (
                <option key={state.id} value={state.id}>
                  {state.stateName}
                </option>
              ))}
            </select>

            <label htmlFor="city">Select City</label>
            <select
              className="form-control"
              name="cityId"
              value={companyInputs.cityId}
              onChange={(e) => handleCityChange(e)}
            >
              <option value="">Select City</option>
              {citysData?.result.map((city: any) => (
                <option key={city.id} value={city.id}>
                  {city.cityName}
                </option>
              ))}
            </select>

            <label htmlFor="firstCategory">Select FirstCategory</label>
            <select
              className="form-control"
              name="firstCategoryId"
              value={companyInputs.firstCategoryId || ""}
              onChange={handleFirstCategoryChange}
            >
              <option value="">Select FirstCategory</option>
              {firstCategoriesData?.result.map((firstCategory: any) => (
                <option key={firstCategory.id} value={firstCategory.id}>
                  {firstCategory.firstCategoryName}
                </option>
              ))}
            </select>


            <label htmlFor="secondCategory">Select SecondCategory</label>
            <select
              className="form-control"
              name="secondCategoryId"
              value={companyInputs.secondCategoryId}
              onChange={(e) => handleSecondCategoryChange(e)}
            >
              <option value="">Select SecondCategory</option>
              {secondacategorysData?.result.map((secondcategory: any) => (
                <option key={secondcategory.id} value={secondcategory.id}>
                  {secondcategory.secondCategoryName}
                </option>
              ))}
            </select>

            <label htmlFor="thirdCategory">Select ThirdCategory</label>
            <select
              className="form-control"
              name="thirdCategoryId"
              value={companyInputs.thirdCategoryId || ""}
              onChange={handleThirdCategoryChange}
            >
              <option value="">Select ThirdCategory</option>
              {thirdCategorysData?.result.map((thirdCategory: any) => (
                <option key={thirdCategory.id} value={thirdCategory.id}>
                  {thirdCategory.thirdCategoryName}
                </option>
              ))}
            </select>

            {/* <label htmlFor="companyLogo">Company Logo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="companyLogo"
              value={companyInputs.companyLogo}
              onChange={handleCompanyInput}
            /> */}

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="phone Number"
              required
              name="phoneNumber"
              value={companyInputs.phoneNumber}
              onChange={handleCompanyInput}
            />

            <label htmlFor="email">Company Logo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              name="Email"
              value={companyInputs.email}
              onChange={handleCompanyInput}
            />


            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={companyInputs.address}
              onChange={handleCompanyInput}
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
              value={companyInputs.description}
              onChange={handleCompanyInput}
            />

            <label htmlFor="certificate">Certificate</label>
            <input
              type="text"
              className="form-control"
              placeholder="Certificate"
              name="certificate"
              value={companyInputs.certificate}
              onChange={handleCompanyInput}
            />

            <label htmlFor="whatsApp">WhatsApp</label>
            <input
              type="text"
              className="form-control"
              placeholder="WhatsApp"
              name="whatsApp"
              value={companyInputs.whatsApp}
              onChange={handleCompanyInput}
            />

            <label htmlFor="instagramId">Instagram</label>
            <input
              type="text"
              className="form-control"
              placeholder="Instagram"
              name="instagramId"
              value={companyInputs.instagramId}
              onChange={handleCompanyInput}
            />

            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              className="form-control"
              placeholder="Facebook"
              name="facebook"
              value={companyInputs.facebook}
              onChange={handleCompanyInput}
            />

            <label htmlFor="website">Website</label>
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              name="website"
              value={companyInputs.website}
              onChange={handleCompanyInput}
            />

            <label htmlFor="twitter">Twitter</label>
            <input
              type="text"
              className="form-control"
              placeholder="Twitter"
              name="twitter"
              value={companyInputs.twitter}
              onChange={handleCompanyInput}
            />

            <label htmlFor="createdDate">CreatedDate</label>
            <input
              type="date"
              className="form-control"
              placeholder="Create Date"
              required
              name="createdDate"
              value={companyInputs.createdDate}
              onChange={handleCompanyInput}
            />


            <label htmlFor="updatedDate">UpdatedDate</label>
            <input
              type="date"
              className="form-control"
              placeholder="Update Date"
              required
              name="updatedDate"
              value={companyInputs.updatedDate}
              onChange={handleCompanyInput}
            />


            <label htmlFor="establishDate">EstablishDate</label>
            <input
              type="date"
              className="form-control"
              placeholder="EstablishDate"
              required
              name="establishDate"
              value={companyInputs.establishDate}
              onChange={handleCompanyInput}
            />





            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              // checked={cityInputs.isActive}
              // onChange={handlecityInput}
              checked={isChecked}
              onChange={handleOnChange}
            />

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/company/companylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Company
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyUpsert;
