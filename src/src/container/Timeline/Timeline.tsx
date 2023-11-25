import React, { FC, useState, useEffect } from "react";
import { createMurmurs, mumurlist } from "../../api/timeline";
import { userState } from "../../atoms/user";
import swal from "sweetalert";
import { useRecoilState } from "recoil";
import { 
  murmursResProps,
  mumurInputProps,
  murmursListProps 
} from "../../model";
import MurmurItem from '../../componets/Murmurs/Item'

const Timeline: FC = () => {
  const [error, setError] = useState<string>("");
  const [refresh, setRefresh] = useState<number>(0);
  const [murmurs, setMurmurs] = useState<murmursListProps[] | any>([]);
  const [text, setText] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [current,setCurrent] = useState<number>(1);
  const [user, ] = useRecoilState(userState);

  const getMurmurlist = async () => {

    const mumurInputs: mumurInputProps = {
      type: 'list',
      token: user.auth,
      skip: skip,
    }
    const res: murmursResProps = await mumurlist(mumurInputs);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      setMurmurs(res?.data)
    }
  };

  const createrMumur = async () => {

    const res :{ error: boolean } = await createMurmurs(text ,user.auth);

    if (res.error === true) {
      setError("Couldnt load data.");
    } else {
      setText("");
      getMurmurlist();
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
    getMurmurlist();
  }, [refresh]);

  return (
    <div className="container">
      <div style={{ marginBottom: "30px", width: "35%", marginLeft: "0%", padding: "10px", textAlign: "center", borderRadius: "10px"}}>
        <h5 className="card-text">Create New Post</h5>
        <textarea name="Text" cols={40} rows={5} value={text} onChange={(e) => setText(e.target.value)}/><br />
        <p className={`btn btn-primary btn-sm ${!text && 'disabled'}`} onClick={createrMumur}>Post</p>
      </div>
      <div className="row mb-5">
        {
          murmurs && murmurs.map((murmur: murmursListProps, key: number) => (
            <div className="col-sm-4" key={key}>
              <MurmurItem
                murmur={murmur}
                userId={user.userId}
                updateRefresh={updateRefresh}
                token={user.auth}
              />
            </div>
          ))
        }
       </div>
      <button className="btn btn-primary btn-sm"
       disabled={current === 1 ? true: false}
       onClick={() => {
        setSkip(skip - limit);
        setCurrent(current-1)
        setRefresh(refresh+1);
       }}>Previous</button>&nbsp;&nbsp;

       <button className="btn btn-primary btn-sm">{current}</button>&nbsp;&nbsp;

       <button className="btn btn-primary btn-sm" 
       disabled={ murmurs.length >= 10 ? false : true}
       onClick={() => {
        setSkip(skip + limit);
        setCurrent(current+1)
        setRefresh(refresh+1);
       }}>Next</button>&nbsp;
      <br /><br />
    </div>
  );
};

export default Timeline;
