import React, { useEffect, useState } from "react";
import { useGetCompanyByIdQuery } from "../../Apis/companyApi";
import { useGetPaymentsQuery } from "../../Apis/paymentApi";
import { useGetCompanyXPaymentByCompanyIdQuery, useCreateCompanyXPaymentMutation } from "../../Apis/companyXPaymentApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function CompanyXPaymentUpsert() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: companyData } = useGetCompanyByIdQuery(companyId);
  const { data: paymentData } = useGetPaymentsQuery(null);
  const { data: companyXPaymentData } = useGetCompanyXPaymentByCompanyIdQuery(companyId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  const [createCompanyXPayment] = useCreateCompanyXPaymentMutation();

  
  useEffect(() => {
    if (paymentData) {
      const initialCheckedMap: Record<string, boolean> = {};
      companyXPaymentData?.result.forEach((item: any) => {
        initialCheckedMap[item.paymentId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedCompanyIds(companyXPaymentData?.result.map((item: any) => item.paymentId) || []);
    }
  }, [paymentData, companyXPaymentData]);

  const handleOnChange = (paymentId: string) => {
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [paymentId]: !prevMap[paymentId],
    }));
    
    setSelectedCompanyIds((prevIds) => {
      if (prevIds.includes(paymentId)) {
        // If colorId is already in the list, remove it
        return prevIds.filter((id) => id !== paymentId);
      } else {
        // If colorId is not in the list, add it
        return [...prevIds, paymentId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (companyId) {
      formData.append("CompanyId", companyId);
      selectedCompanyIds.forEach((paymentId) => {
        formData.append("SelectedPaymentIds", paymentId);
      });

      const response = await createCompanyXPayment(formData);
      if (response) {
        toastNotify("Payment updated successfully", "success");
        setLoading(false);
        navigate("/company/companylist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success"> Edit Payment For {companyData?.result.companyName}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Colors:</label>
              {paymentData?.result.map((payment: any) => (
                <a key={payment.id} className="form-check text-decoration:none">
                  <input
                    type="checkbox"
                    name="SelectedPaymentIds"
                    className="form-check-input"
                    id={`payment-${payment.id}`}
                    value={payment.id}
                    checked={isCheckedMap[payment.id] || false}
                    onChange={() => handleOnChange(payment.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`color-${payment.id}`}
                  >
                    {payment.paymentName}
                  </label>
                </a>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/company/companylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to CarList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyXPaymentUpsert;




    // var data : any = {
    //   CompanyId : companyData?.result.id
    // };
    // selectedPayments.map((val,index) => {
    //   data[`PaymentId[${index}]`] = val
    // });
  
    // const data: any[] = selectedPayments.map((val, index) => ({
    //   CompanyId: companyData?.result.id,
    //   PaymentId: val,
    // }));
    // console.log(data);