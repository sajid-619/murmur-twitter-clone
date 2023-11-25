import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import swal from "sweetalert";
import { UserDetails } from "../../api/user";
import { 
  murmursListProps,
  murmursLikeProps,
  userDetailsPorps,
  userProps,
} from "../../model";
import { userState } from "../../atoms/user";
import UserItem from '../../componets/Users/Item'
import MurmurItem from '../../componets/Murmurs/Item'

const UsersDetails: FC = () => {
  const [error, setError] = useState<string>("");
  const [noError, setNoError] = useState<string>("");
  const [details, setDetails] = useState<userProps | undefined>({});
  const [murmurs, setMurmurs] = useState<murmursListProps[] | undefined>([]);

  const params = useParams();
  const userId: string | undefined = (params['userId'] || undefined);
  const [user, ] = useRecoilState(userState);

  const getUserDetails = async () => {
 
    const res: {error:  boolean, data?: userDetailsPorps} = await UserDetails(userId, user.auth);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      setDetails(res['data']?.user);
      setMurmurs(res['data']?.murmurs);
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

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container">
      <UserItem
         user={details || {}}
         userId={user.userId}
         updateRefresh={getUserDetails}
         token={user.auth}
         type={"details"}
      />
      {/* This Post is given By: {" "} */}
      {
      <div className="container">
        <div className="row">
          {
            murmurs && murmurs.map((murmur: murmursListProps, key: number) => (
              <div className="col-sm-4" key={key}>
                <MurmurItem
                  murmur={murmur}
                  userId={user.userId}
                  updateRefresh={getUserDetails}
                  token={user.auth}
                />
              </div>
            ))
          }
          </div>
      </div>
      }
    </div>
  );
};

export default UsersDetails;
