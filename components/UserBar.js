import { useState } from "react";
import UserCheckOut from "./UserCheckOut";
import UserPublish from "./UserPublications";
import UserReels from "./UserReels";
import UserVideos from "./UserVideos";

function UserBar(props) {
  const [selectedBar, setSelectedBar] = useState("posts");
  return (
    <div className="row">
      <div className="col col-12 col-lg-6 offset-lg-3 my-2">
        <div className="row border-top">
          <div
            onClick={() => setSelectedBar("posts")}
            className={
              "col text-center py-3" +
              (selectedBar === "posts" ? " border-top border-dark" : "")
            }
          >
            Публикации
          </div>
          <div
            onClick={() => setSelectedBar("reels")}
            className={
              "col text-center py-3" +
              (selectedBar === "reels" ? " border-top border-dark" : "")
            }
          >
            Reels
          </div>
          <div
            onClick={() => setSelectedBar("videos")}
            className={
              "col text-center py-3" +
              (selectedBar === "videos" ? " border-top border-dark" : "")
            }
          >
            Видео
          </div>
          <div
            onClick={() => setSelectedBar("check-out")}
            className={
              "col text-center py-3" +
              (selectedBar === "check-out" ? " border-top border-dark" : "")
            }
          >
            Отметки
          </div>
        </div>
      </div>
      {selectedBar === "posts" && (
        <div className="col col-12">
          <UserPublish id={props.id} avatar={props.avatar}/>
        </div>
      )}
      {selectedBar === "reels" && (
        <div className="col col-12">
          <UserReels id={props.id} avatar={props.avatar}/>
        </div>
      )}
      {selectedBar === "videos" && (
        <div className="col col-12">
          <UserVideos id={props.id} avatar={props.avatar}/>
        </div>
      )}
      {selectedBar === "check-out" && (
        <div className="col col-12">
          <UserCheckOut id={props.id} avatar={props.avatar}/>
        </div>
      )}
    </div>
  );
}

export default UserBar;
