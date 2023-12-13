import React from "react";
import { apiResponse, companyModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";
import { toastNotify } from "../../../Helper";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  company: companyModel;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function CompanyIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
    <div className="col-lg-3 col-sm-6">
      <Link to={`/companyDetail/${props.company.id}`} className="text-decoration-none text-black">
        <div className="row p-2"> 
          <div className="col-12 p-1">
            <h5 className="fw-bold text-center  text-uppercase">
              {/* @TruncateText(Company.CompanyName, 20) */}
              {/* {props.company.companyName.substring(0,22)} */}
              {truncateText(props.company.companyName, 20)}
            </h5>

            <a>
              {/* @if (Company.CompanyLogo != null && Company.CompanyLogo.Count() > 0)
                    {
                        <img src="@Company.CompanyLogo" alt="@Company.CompanyName" height="300px" width="400px" className="card-img-top rounded" />
                    }
                    else
                    { */}
              <img
                src="https://placehold.co/300x400/png"
                height="300px"
                width="400px"
                className="card-img-top rounded"
              />
              {/* } */}
            </a>

            <div className="card-body p-1">
              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">Address:-</span>
                {/* @Company.Address.Substring(0, Math.Min(20, Company.Address.Length))... */}
                {props.company.address?.substring(0,Math.min(20, props.company.address.length))}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">City:-</span>
                {props.company.city?.cityName}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">State:-</span>
                {props.company.state?.stateName}
              </div>

              <div className="pl-1 text-start">
                <span className="fw-bold text-uppercase">Country:-</span>
               {props.company.country?.countryName}
              </div>
            </div>

            <div className="card-body pb-2">
              <div className="pl-1 d-flex justify-content-evenly">
                <button className="btn btn-primary">
                  <i className="bi bi-telephone"></i>
                  {/* @TruncateString(Company.PhoneNumber, 10) */}
                  {props.company.phoneNumber?.substring(0,10)}
                </button>
                <button className="btn btn-primary">
                  <i className="bi bi-whatsapp"></i>
                  {/* @TruncateString(Company.PhoneNumber, 10) */}
                  {props.company.phoneNumber?.substring(0,10)}
                </button>
              </div>
            </div>

            {/* @*   <div>
            <a asp-action="BrifDetail" asp-controller="Home" asp-area="Customer" asp-route-companyId="@Company.Id" className="btn btn-primary bg-gradient border-0 form-control">
            Details
            </a>
            </div> *@ */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CompanyIndex;
