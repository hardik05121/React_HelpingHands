import React, { useEffect, useState } from "react";
import {
  useCreatePaymentMutation,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
} from "../../Apis/paymentApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";


const paymentData = {
  paymentName: "",
  isActive: false
};

function PaymentUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  // const [imageToStore, setImageToStore] = useState<any>();
  // const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [paymentInputs, setPaymentInputs] = useState(paymentData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const { data } = useGetPaymentByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        paymentName: data.result.paymentName,
        isActive: data.result.isActive,
       // isActive: isChecked,
      };
      setPaymentInputs(tempData);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePaymentInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, paymentInputs);
    // setIsChecked(!isChecked);
    setPaymentInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // if (!imageToStore && !id) {
    //   toastNotify("Please upload an image", "error");
    //   setLoading(false);
    //   return;
    // }

    const formData = new FormData();

    formData.append("paymentName", paymentInputs.paymentName);
    formData.append("isActive", isChecked?"yes":"No");

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updatePayment({ data: formData, id });
      toastNotify("Payment updated successfully", "success");
    } else {
      //create
      response = await createPayment(formData);
      toastNotify("Payment created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/payment/paymentlist");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-success">
        {id ? "Edit Payment" : "Add Payment"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter PaymentName"
              required
              name="paymentName"
              value={paymentInputs.paymentName}
              onChange={handlePaymentInput}
            />
              <label htmlFor="checkbox">Is Active</label>
            <input
              type="checkbox"
              name="isActive"
              //  checked={paymentInputs.isActive}
             // onChange={handlePaymentInput}
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
                  onClick={() => navigate("/payment/paymentlist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Menu Items
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentUpsert;
