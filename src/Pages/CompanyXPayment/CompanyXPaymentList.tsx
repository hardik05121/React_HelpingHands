import React from "react";
import {
  useDeleteCompanyXPaymentMutation,
  useGetCompanyXPaymentsQuery,
} from "../../Apis/companyXPaymentApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { companyXPaymentModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CompanyXPaymentList() {

  const [deleteCompanyXPayment] = useDeleteCompanyXPaymentMutation();
  const { data, isLoading } = useGetCompanyXPaymentsQuery(null);
  const navigate = useNavigate();

  const handleCompanyXPaymentDelete = async (id: number) => {
    toast.promise(
      deleteCompanyXPayment(id),
      {
        pending: "Processing your request...",
        success: "CompanyXPayment Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };
  
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">CompanyXPayment List</h1>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Id</div>
              <div className="col-4">Company Name</div>
              <div className="col-4">Payment Name</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((companyXPayment: companyXPaymentModel) => {
              return (
                <div className="row border" key={companyXPayment.id}>
                  <div className="col-2">{companyXPayment.id}</div>
                  <div className="col-4">{companyXPayment.company?.companyName}</div>
                  <div className="col-4">{companyXPayment.payment?.paymentName}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCompanyXPaymentDelete(companyXPayment.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyXPaymentList;
