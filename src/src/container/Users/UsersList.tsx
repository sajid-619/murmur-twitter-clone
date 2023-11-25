import React, { FC, useState, useEffect } from "react";
import { listofUsers } from "../../api/user";
import { userState } from "../../atoms/user";
import swal from "sweetalert";
import { useRecoilState } from "recoil";
import {
  usersResProps,
  userProps
} from "../../model";
import UserDetails from '../../componets/Users/Item'

const UsersList: FC = () => {
  const [error, setError] = useState<string>("");
  const [refresh, setRefresh] = useState<number>(0);
  const [usersList, setUsersList] = useState<userProps[] | any>([]);

  const [user, ] = useRecoilState(userState);

  const getUserList = async () => {

    const res: usersResProps = await listofUsers(user.auth);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      setUsersList(res?.data)
    }
  };

  const updateRefresh = () => setRefresh(refresh+1);

  useEffect(() => {
    if (error) {
      swal({
        title: "Some error occured",
        text: error,
        icon: "error",
      });
    }
    setError("");
  }, [error]);

  useEffect(() => {
    getUserList();
  }, [refresh]);

  return (
    <div className="container">
      <div className="row">
        {
          usersList && usersList.map((userItem: userProps, key: number) => (
            <div className="col-sm-4" key={key}>
              <UserDetails
                user={userItem}
                userId={user.userId}
                updateRefresh={updateRefresh}
                token={user.auth}
              />
            </div>
          ))
        }
       </div>
    </div>
  );
};

export default UsersList;
