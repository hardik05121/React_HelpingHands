import React from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../Apis/companyApi";
import { useGetCompanyXAmenityByCompanyIdQuery } from "../Apis/companyXAmenityApi";
import { useGetCompanyXPaymentByCompanyIdQuery } from "../Apis/companyXPaymentApi";
import { useGetCompanyXServiceByCompanyIdQuery } from "../Apis/companyXServiceApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { apiResponse } from "../Interfaces";
import { toastNotify } from "../Helper";
import { RootState } from "../Storage/Redux/store";
import { useSelector } from "react-redux";

function CompanyDetail() {
  const { companyId } = useParams();
  const { data: companyData } = useGetCompanyByIdQuery(companyId);
  const { data: paymentData } =
    useGetCompanyXPaymentByCompanyIdQuery(companyId);
  const { data: amenityData } =
    useGetCompanyXAmenityByCompanyIdQuery(companyId);
  const { data: serviceData } =
    useGetCompanyXServiceByCompanyIdQuery(companyId);
  const navigate = useNavigate();
  //Method:-1
  // const [showFullDescription, setShowFullDescription] = useState(false);
  // const toggleDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  // };

  //Method:-2
  const [showFullDescription, setShowFullDescription] = useState(false);
  function toggleDescription() {
    setShowFullDescription((prev) => !prev);
  }

  return (
    <div className="card shadow  border-0 p-4 m-5 bg-body rounded">
      <div className="card-header bg-secondary bg-gradient text-light py-4">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="text-white text-uppercase">
              {companyData?.result.companyName}
            </h3>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="py-3">
          <div className="row d-flex "></div>
          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="row">
                <div className="col-12 col-lg-4  text-center mb-3">
                  {/* @if (Model.CompanyImageList != null && Model.CompanyImageList.Count > 0)
                            {
                                <div id="carouselExampleIndicators" className="carousel  slide" data-bs-ride="carousel">
                                    <div className="carousel-indicators">

                                        @foreach (var imageWithIndex in
                                       Model.CompanyImageList
                                       .Select((image, index) => new { Image = image, Index = index }))
                                        {
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="@imageWithIndex.Index" className="@(imageWithIndex.Index==0?"active":"")" aria-current="true" aria-label="Slide 1"></button>
                                        }


                                    </div>
                                    <div className="carousel-inner">
                                        @foreach (var imageWithIndex in
                                       Model.CompanyImageList
                                       .Select((image, index) => new { Image = image, Index = index }))
                                        {
                                            <div className="@(imageWithIndex.Index==0?"carousel-item active":"carousel-item")">
                                                <a asp-action="AllImages" asp-route-companyId="@Model.Company.Id">  <img src="@imageWithIndex.Image.Image" style="height:250px; width:100%;" className="d-block w-100" alt="..."> </a>
                                            </div>
                                        }
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            }   */}
                </div>
                <div className="col-12 col-lg-5 ms-5  align-items-center ">
                  <h4 className="fw-bold mb-2 mx-2"> Basic Information</h4>
                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      First Category Name :-
                    </span>
                    <span className="">
                      {companyData?.result.firstCategory.firstCategoryName}
                    </span>
                  </div>

                 {companyData?.result.secondCategoryId > 0 ? (
                    <div className="pb-2">
                      <span className="text-dark text-opacity-50 fw-bold">
                        Second Category Name :-
                      </span>
                      <span className="">
                        {companyData?.result.second}
                      </span>
                    </div>
                  ) : null}

                   {companyData?.result.ThirdCategoryId > 0 ? (
                    <div className="pb-2">
                      <span className="text-dark text-opacity-50 fw-bold">
                        Third Category Name :-
                      </span>
                      <span className="">
                        {companyData?.result.ThirdCategory.ThirdCategoryName}
                      </span>
                    </div>
                  ) : null}

                 {companyData?.result.ThirdCategoryId > 0 && (
                    <div className="pb-2">
                      <span className="text-dark text-opacity-50 fw-bold">
                        Third Category Name :-
                      </span>
                      <span className="">
                        {companyData?.result.ThirdCategory.ThirdCategoryName}
                      </span>
                    </div>
                  )} 

                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      Address :-
                    </span>
                    <span className="">{companyData?.result.address}</span>
                  </div>

                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      City Name :-
                    </span>
                    <span className="">
                      {companyData?.result.city.cityName}
                    </span>
                  </div>

                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      State :-
                    </span>
                    <span className="">
                      {companyData?.result.state.stateName}
                    </span>
                  </div>

                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      Country :-
                    </span>
                    <span className="">
                      {companyData?.result.country.countryName}
                    </span>
                  </div>

                  {/* Method:-1 */}
                  {/* <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      Description :-
                    </span>
                    <span className="" id="ReadMore">
                      {showFullDescription
                        ? companyData?.result.description
                        : `${companyData?.result.description.substring(
                            0,
                            10
                          )}...`}
                    </span>
                    {companyData?.result.description.length > 10 && (
                      <span>
                        {" "}
                        <a className="" onClick={toggleDescription}>
                          {showFullDescription ? "Read Less" : "Read More"}
                        </a>
                      </span>
                    )}
                  </div> */}

                  {/* Method:-2 */}
                  <div className="pb-2">
                    <span className="text-dark text-opacity-50 fw-bold">
                      Description :-
                    </span>
                    <span className="" id="ReadMore">
                      {showFullDescription
                        ? companyData?.result.description
                        : companyData?.result.description.substring(0, 10)}
                    </span>
                    <span className="" id="ReadLess">
                      {companyData?.result.description}
                    </span>
                    <span id="dots">...</span>{" "}
                    <a className="" onClick={toggleDescription} id="myBtn">
                      {showFullDescription ? "Read less" : "Read more"}
                    </a>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className=" text-body">
                  <h4 className="fw-bold m-2 p-2"> Contact Information</h4>
                  <div className="d-flex">
                    <div className="col-lg-2">
                      <span className="fw-bold">Certification</span>
                      <div className="mt-2">
                        {companyData?.result.certificate}
                      </div>
                    </div>

                    <div className="ms-3 col-lg-2">
                      <span className="fw-bold">Establish Year</span>
                      <div className="mt-2">
                        {companyData?.result.establishDate}
                      </div>
                    </div>

                    <div className="ms-3 col-lg-2">
                      <span className="fw-bold">Phone Number</span>
                      <div className="mt-2">
                        <a className="btn btn-primary" target="_blank">
                          <i className="bi bi-telephone"></i>{" "}
                          {companyData?.result.phoneNumber}
                        </a>
                      </div>
                    </div>

                    <div className="ms-3">
                      <span className="fw-bold">Mail</span>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary"
                          href="https://mail.google.com/"
                          target="_blank"
                        >
                          <i className="bi bi-envelope"></i>{" "}
                          {companyData?.result.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex">
                    <div className="col-lg-2">
                      <span className="fw-bold">WhatsApp</span>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary"
                          type="button"
                          href="https://web.whatsapp.com/"
                          data-action="share/whatsapp/share"
                          target="_blank"
                        >
                          <i className="bi bi-whatsapp"></i>whatsApp
                        </a>
                      </div>
                    </div>

                    <div className="ms-3 col-lg-2">
                      <span className="fw-bold">Instragram</span>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary"
                          type="button"
                          href="https://web.whatsapp.com/"
                          data-action="share/whatsapp/share"
                          target="_blank"
                        >
                          <i className="bi bi-instagram"></i>Instragram
                        </a>
                      </div>
                    </div>
                    <div className="ms-3 col-lg-2">
                      <span className="fw-bold">Facebook</span>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary"
                          type="button"
                          href="https://www.facebook.com/"
                          data-action="share/whatsapp/share"
                          target="_blank"
                        >
                          <i className="bi bi-facebook"></i>Facebook
                        </a>
                      </div>
                    </div>

                    <div className="ms-3">
                      <span className="fw-bold">Twitter</span>
                      <div className="mt-2">
                        <a
                          className="btn btn-primary"
                          type="button"
                          href="https://twitter.com/"
                          data-action="share/whatsapp/share"
                          target="_blank"
                        >
                          <i className="bi bi-twitter"></i>Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <h4 className="fw-bold  m-3 p-2"> Special Detail</h4>
                <div className="col-12 col-lg-3">
                  <h5 className=" fw-bold">Amenity</h5>
                  <div className="row">
                    {/* {amenityData?.result !== null &&
                      amenityData?.result.map((item: any) => (
                        <div key={item.amenity.Id} className="">
                          {item.amenity.amenityName}
                        </div>
                      ))} */}
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <h5 className=" fw-bold">Payment</h5>
                  <div className="row">
                    {paymentData?.result !== null &&
                      paymentData?.result.map((item: any) => (
                        <div key={item.payment.Id} className="">
                          {item.payment.paymentName}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <h5 className="fw-bold">Service</h5>
                  <div className="row">
                    {serviceData?.result !== null &&
                      serviceData?.result.map((item: any) => (
                        <div key={item.service.Id} className="">
                          {item.service.serviceName}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <a
                  className="btn btn-primary col-lg-3 justify-content-end"
                  asp-action="CreateReview"
                  asp-controller="Review"
                  asp-route-companyId="@Model.Company.Id"
                >
                  Add Review
                </a>
              </div>
              <div className="row">
                {/* @foreach (var item in Model.ReviewList)
                        {
                            <div className="my-1">

                                <div className="pl-1 text-start">
                                    <span className="fw-bold col-lg-2">Title:-</span><span className="col-lg-7">@item.Title</span>

                                </div>
                                <div className="pl-1 text-start">
                                    <span className="fw-bold">UserName:-</span>
                                    @item.ApplicationUser.UserName
                                </div>

                                <div className="pl-1 text-start">
                                    <span className="fw-bold">Description:-</span>
                                    @item.Description
                                </div>

                                <div className="ratingContainer">
                                    @for (int i = 0; i < @item.Rating; i++)
                                    {
                                        <i className="ratingStar fas fa-star"></i>
                                    }
                                    @for (int i = 0; i < 5 - @item.Rating; i++)
                                    {
                                        <i className="ratingStar far fa-star"></i>
                                    }
                                </div>
                                <div className=" d-flex justify-content-evenly m-2 ">
                                    <div className="border border-1 border-dark rounded-pill p-1">
                                        <a asp-controller="Review" asp-action="LikeCount" asp-area="Admin" asp-route-reviewId="@item.Id">
                                            <i className="bi bi-hand-thumbs-up Like"></i>
                                            <span>@item.LikeCount</span>
                                        </a>

                                    </div>
                                    <div className="border border-1 border-dark rounded-pill p-1">
                                        <a asp-action="DisLikeCount" asp-controller="Review" asp-area="Admin" asp-route-reviewId="@item.Id">
                                            <i className="bi bi-hand-thumbs-down DisLike"></i>
                                            <span>@item.DisLikeCount</span>
                                        </a>

                                    </div>

                                    <div className="">
                                        <a className="btn btn-primary " asp-action="ReviewXComment" asp-controller="Review" asp-route-reviewId="@item.Id" asp-route-companyId="@item.CompanyID" asp-area="Customer">
                                            <i className="bi bi-chat"></i>Add your comment
                                        </a>
                                    </div>
                                </div>
                                <div className="row">
                                    @foreach (var item1 in Model.ReviewXCommentList)
                                    {
                                        @if (@item.Id == @item1.ReviewID)
                                        {
                                            <div className="pl-1 text-start">
                                                <span className="fw-bold">UserName:-</span>
                                                @item.ApplicationUser.UserName
                                            </div>

                                            <div className="pl-1 text-start">
                                                <span className="fw-bold">Comment:-</span>
                                                @item1.Comment
                                            </div>


                                        }
                                    }
                                </div>
                            </div>
                            <hr />
                        } */}
              </div>
            </div>
            <div className="col-12 col-lg-3 ">
              {/* <div className="wrapper">
        <h2>Enquiry</h2>
        <form method="post" asp-action="CreateEnquiry" asp-controller="Enquiry" asp-area="Admin">
            <input hidden asp-for="@Model.Company.Id" />
            <input hidden asp-for="@Model.Enquiry.Id" />

            <div className="input-box pb-2">
                <input asp-for="Enquiry.UserName" className="form-control" placeholder="Enter UserName" required/>
                <span asp-validation-for="Enquiry.UserName" className="text-danger"></span>
            </div>

            <div className="input-box pb-2">
                                <input asp-for="Enquiry.Email" className="form-control" placeholder="Enter Email" required />
                <span asp-validation-for="Enquiry.Email" className="text-danger"></span>
            </div>

            <div className="input-box pb-2">
                                <input type="number" value="" asp-for="Enquiry.PhoneNumber" className="form-control" placeholder="Enter Your PhoneNumber" required />
                <span asp-validation-for="Enquiry.PhoneNumber" className="text-danger"></span>
            </div>

            <div className="input-box pb-2">
                                <input asp-for="Enquiry.Title" className="form-control" placeholder="Enter Title" required />
                <span asp-validation-for="Enquiry.Title" className="text-danger"></span>
            </div>

            <div className="input-box pb-2">
                <input asp-for="Enquiry.Description" className="form-control" placeholder=" Enter Description" required/>
                <span asp-validation-for="Enquiry.Description" className="text-danger"></span>
            </div>

            <div className="input-box button">
                <input type="submit" value="Save" className=" form-control" />
            </div>
        </form>
    </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
