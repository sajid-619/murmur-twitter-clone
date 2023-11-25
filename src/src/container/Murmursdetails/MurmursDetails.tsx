import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import swal from "sweetalert";
import { murmurDetails } from "../../api/timeline";
import { 
  murmursDetaislProps,
  murmursLikeProps,
  murmursListProps,
} from "../../model";
import { userState } from "../../atoms/user";
import MurmurItem from '../../componets/Murmurs/Item'

const MurmurDetails: FC = () => {
  const [error, setError] = useState<string>("");
  const [noError, setNoError] = useState<string>("");
  const [details, setDetails] = useState<murmursListProps | undefined>({});
  const [liked, setLiked] = useState<murmursLikeProps[] | undefined>([]);



  const params = useParams();
  const murmurId: string | undefined = (params['murmurId'] || undefined);
  const [user, ] = useRecoilState(userState);

  console.log(murmurId)

  const getMurmurDetails = async () => {

    const res: {error:  boolean, data?:murmursDetaislProps} = await murmurDetails(murmurId, user.auth);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      console.log(res.data)
      setDetails(res['data']?.murmurDetails);
      setLiked(res['data']?.liked);
    }
  };

  useEffect(() => {
    console.log()
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
    getMurmurDetails();
  }, []);

  return (
    <div className="container">
      <MurmurItem
         murmur={details || {}}
         userId={user.userId}
         updateRefresh={getMurmurDetails}
         token={user.auth}
         type={"details"}
      />
      {/* This Murmur is Liked By : {" "} */}
      {
        liked?.map((liked_by: murmursLikeProps, index: number) => {
          return(
            <span key={index}><b>{liked_by.name}</b>{", "}</span>
          )
        })
      }
    </div>
  );
};

export default MurmurDetails;
