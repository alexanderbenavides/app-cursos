import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import "./TutorialList.scss";

import Tutorial from "./Tutorial";
function TutorialList(props) {
  const emptyTutorial = props.tutorialsData.length === 0 ? true : false;

  return (
    <div>
      <div className="courses__list">
        {emptyTutorial ? (
          <LoadingOutlined />
        ) : (
          props.tutorialsData.map((tutorial, i) => {
            return <Tutorial tutorial={tutorial} key={i} />;
          })
        )}
      </div>
    </div>
  );
}

export default TutorialList;
