import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import "./CourseList.scss";

import Courses from "./Courses";
function CoursesList(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { coursesData } = props;

  useEffect(() => {
    if (coursesData.length > 0) {
      setIsLoading(false);
    }
  });
  return (
    <div>
      <div className="courses__list">
        {isLoading ? (
          <LoadingOutlined />
        ) : (
          coursesData.map((course, i) => {
            return <Courses course={course} key={i} />;
          })
        )}
      </div>
    </div>
  );
}

export default CoursesList;
