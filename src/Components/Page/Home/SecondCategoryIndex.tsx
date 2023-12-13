import React from "react";
import { apiResponse, secondCategoryModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
    secondCategory: secondCategoryModel;
}


function SecondCategoryIndex(props: Props) {
  const navigate = useNavigate();
  // const userData: userModel = useSelector(
  //   (state: RootState) => state.userAuthStore
  // );

  return (
<div className="col-md-2 col-sm-4 my-2 mt-3">
    <div className="text-center">
        <Link to={`/secondCategoryIndex/${props.secondCategory.id}`} className="text-decoration-none" >
            <img src={props.secondCategory.secondCategoryImage} alt={props.secondCategory.secondCategoryName} style={{ borderRadius: "5px", border: "1px solid #bbb9b9"}} height="100px" width="100px" />
            <h6 className="text-dark">{props.secondCategory.secondCategoryName}</h6>
        </Link>
    </div>
</div>
  );
}

export default SecondCategoryIndex;
