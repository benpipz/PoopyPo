import React, { useEffect } from "react";
import { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles.css";
import Icons from "../../assets/Icons";
import { auth } from "../../../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { updateVotesForPoint } from "../../store/mapSlice";
import { useState } from "react";
import { Point } from "../../Types/Infra";
import { ApiUtils } from "../../Utils/ApiUtil";

interface MyInfoWindowType {
  point: Point;
  getRoute: () => void;
}

enum Action {
  None,
  Upvote,
  Downvote,
}
const MyInfoWindow: FC<MyInfoWindowType> = ({ point, getRoute }) => {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const [action, setAction] = useState<Action>(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (point.image) {
      const photo = base64ToUint8Array(point.image);
      setImageSrc(`data:image/jpeg;base64,${point.image}`);
    }
  }, [point]);

  const base64ToUint8Array = (base64) => {
    // Decode the Base64 string to a binary string
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    // Convert the binary string to a Uint8Array
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  };

  const UpdateVote = async (newVoteScore, action) => {
    const url = `Points/${point.id}`;
    const data = { id: point.id, votes: newVoteScore };
    const result = await ApiUtils.Put(url, {
      userId: point.userId,
      interaction: action,
    });
    if (result.status === 200) {
      dispatch(updateVotesForPoint(data));
      await getLastAction();
    }
  };

  const getLastAction = async () => {
    const url = `Points/${point.id}/${point.user.id}`;
    const result = await ApiUtils.Get(url);
    setAction(result.data);
  };
  useEffect(() => {
    getLastAction();
  }, []);

  return (
    <div>
      {!user ? (
        <div>
          <p>upvotes: {point.votes}</p>
          <p>Reporter: {point.user.name}</p>
          {imageSrc && (
            <img
              src={imageSrc}
              style={{ width: "100px", height: "100px" }}
              alt="Fetched from server"
            />
          )}
        </div>
      ) : (
        <div className="smallCol">
          {point.description}
          <button
            style={{ margin: "1px" }}
            className="btn btn-success"
            onClick={async () => await UpdateVote(point.votes + 1, 1)}
            disabled={action === 1}
          >
            <div className="smallContainer">
              I approve!
              <Icons iconType={"Like"} />
            </div>
          </button>
          <button
            style={{ margin: "1px" }}
            className="btn btn-warning"
            onClick={async () => await UpdateVote(point.votes - 1, 2)}
            disabled={action === 2}
          >
            <div className="smallContainer">
              Nope
              <Icons iconType={"Dislike"} />
            </div>
          </button>
          <button
            style={{ margin: "1px" }}
            className="btn btn-primary"
            onClick={() => getRoute()}
          >
            <div className="smallContainer">
              Go!
              <Icons iconType={"Go"} />
            </div>
          </button>
          <p>upvotes: {point.votes}</p>
          <p>Reporter: {point.user.name}</p>
          {imageSrc && (
            <img
              src={imageSrc}
              style={{ width: "100px", height: "100px" }}
              alt="Fetched from server"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyInfoWindow;
