import { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import swal from "sweetalert";
import { followUser } from "../../api/user";
import { 
  userProps 
} from "../../model";

type propsType = {
  user: userProps,
  userId: string,
  updateRefresh(): void,
  token: string,
  type?: string,
}

const MurmurItem: FC<propsType> = ({
  user,
  userId,
  updateRefresh,
  token,
  type
}) => {
  const [error, setError] = useState<string>("");
  const [noError, setNoError] = useState<string>("");

  const navigate = useNavigate();
  
  const followUserHandler = async () => {
    const result = await followUser(user.id, token);
    if (result.error) {
      setError("Something went wrong")
    } else {
      setNoError(result.data)
      updateRefresh();
    }
  };

  useEffect(() => {
    if (error || noError) {
      swal({
        text: error || noError,
        icon: noError  ? "success" : "error",
      });
    }
    setError("");
    setNoError("");

  }, [error, noError]);

  return (
    <div className="container">
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title"> Name: {user.name}</h5>
          <p className="card-title">Followers: {user.followed_count}</p>
          <p className="card-title">Following: {user.follow_count}</p>

          {userId.toString() !== user.id?.toString() &&
            <p className="btn btn-success btn-sm" onClick={followUserHandler}>Follow</p>
          }&nbsp;
          {type !== "details" && <p className="btn btn-info btn-sm" onClick={() => navigate(`/user_details/${user.id}`)}>Details</p>}
        </div>
      </div>
    </div>
  );
};

export default MurmurItem;
