import React from "react";
import "./TutorialList.scss";

import Tutorial from "./Tutorial";
class TutorialList extends React.Component {
  render() {
    const emptyTutorial = this.props.tutorialsData.length === 0 ? true : false;

    return (
      <div>
        <div className="courses__list">
          {emptyTutorial ? (
            <label>No hay resultados</label>
          ) : (
            this.props.tutorialsData.map((tutorial, i) => {
              return <Tutorial tutorial={tutorial} key={i} />;
            })
          )}
        </div>
      </div>
    );
  }
}

export default TutorialList;
