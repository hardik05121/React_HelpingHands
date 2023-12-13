import React from 'react'
import { useGetPaymentsQuery,
    useDeletePaymentMutation 
} from "../../Apis/paymentApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { paymentModel } from "../../Interfaces";
import { useNavigate } from "react-router";

function PaymentList() {

    const [deletePayment] = useDeletePaymentMutation();
  const { data, isLoading } = useGetPaymentsQuery(null);
  const navigate = useNavigate();

  
  const handlePaymentDelete = async (id: number) => {
    toast.promise(
      deletePayment(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (
      <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">Payment List</h1>
          <button
            className="btn btn-success"
            onClick={() => navigate("/payment/paymentupsert")}
          >
            Add New Payment
          </button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-3">ID</div>
            <div className="col-5">PaymentName</div>
            {/* <div className="col-3">Is Active</div> */}
            <div className="col-4">Action</div>
          </div>

          {data.result.map((payment: paymentModel) => {
            return (
              <div className="row border" key={payment.id}>
                <div className="col-3">{payment.id}</div>
                <div className="col-5">{payment.paymentName}</div>
                {/* <div className="col-3">{payment.isActive}</div> */}
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/payment/paymentupsert/" + payment.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handlePaymentDelete(payment.id)}
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

export default PaymentList