import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
let logo = require("../../Assets/Images/HelpingHands.png");

function Header() {
  const navigate = useNavigate();
  const [search, setSearchText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setLoggedIn(false);
    setUserName("");
    //window.location.reload();
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      const decodedToken = parseJwt(token);
      setUserName(decodedToken.unique_name);
    } else {
      setLoggedIn(false);
      setUserName("");
    }
  }, []);

  const parseJwt = (token: any) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark box-shadow mb-3 position-static">
        <div className="container-fluid">
          <NavLink className="nav-link text-light" aria-current="page" to="/">
            <img src={logo} style={{ height: "40px" }} className="m-1" />{" "}
            &nbsp;Helping Hands
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1 me-auto">
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  asp-area="Customer"
                  asp-controller="Home"
                  asp-action="Index"
                >
                  Go to Customer Page
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("firstCategory/firstCategorylist")
                      }
                    >
                      First Category
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("secondCategory/secondCategorylist")
                      }
                    >
                      Second Category
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("thirdCategory/thirdCategorylist")
                      }
                    >
                      Third Category
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Company & Feature
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("company/companylist")}
                    >
                      Company
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("amenity/amenitylist")}
                    >
                      Amenity
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("payment/paymentlist")}
                    >
                      Payment
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("service/servicelist")}
                    >
                      Service
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("enquiry/enquirylist")}
                    >
                      Enquiry
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("review/reviewlist")}
                    >
                      Review
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Location
                </a>
                <ul className="dropdown-menu">
                <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={() => navigate("country/countrylist")}
                  >
                    Country
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={() => navigate("country/countrylistByLazyLoading")}
                  >
                    CountryList By LazyLoading
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={() => navigate("country/countrylistByPagination")}
                  >
                    CountryList By Pagination
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={() => navigate("state/statelist")}
                  >
                    State
                  </li>
                  <li
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={() => navigate("city/citylist")}
                  >
                    City
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User Managment
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("applicationRole/applicationRolelist")
                      }
                    >
                      Role
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("applicationUser/applicationUserlist")
                      }
                    >
                      User
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Car"
                    value={search}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button
                    className="btn btn-primary ms-1"
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-end">
            <ul className="navbar-nav">
              {!loggedIn && (
                <>
                  <li className="nav-item text-white m-1">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white m-1">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      style={{
                        border: "none",
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {loggedIn && (
                <>
                  <li className="nav-item text-white m-1">
                    <span className="text-light me-2">Welcome, {userName}</span>
                  </li>

                  <li className="nav-item text-white m-1">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white ms-8"
                      style={{
                        border: "none",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
