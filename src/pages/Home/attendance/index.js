import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { addAttendance } from "../../../api/attendance";
function Attendance() {
  const [inputValues, setInputValues] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [ip, setIp] = useState("");
  function submitForm() {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      "-" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    if (inputValues.length === 0) {
      notification["warning"]({
        message: "Obligatorio.",
      });
    } else {
      const data = {
        ip: ip,
        nombres: inputValues,
        hora: datetime,
      };
      addAttendance(data)
        .then((response) => {
          if (response?.status !== 200) {
            notification["warning"]({
              message: response.message,
            });
          } else {
            notification["success"]({
              message: response.data.message,
            });
            setDisabled(true);
          }
        })
        .catch(() => {
          notification["error"]({
            message:
              "Ocurrió un error en el servidor. Por favor,inténtelo más tarde.",
          });
        });
    }
  }
  useEffect(() => {
    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res.json())
      .then((json) => setIp(json.IPv4));
  }, []);
  return (
    <>
      <div>
        <section
          style={{
            paddingTop: "10rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Registrar datos para la asistencia.</p>
          <label>
            Nombre completo:
            <br />
            <br />
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setInputValues(e.target.value)}
            />
          </label>
          <br />
          <br />
          <input
            type="button"
            value="Registrar"
            onClick={() => submitForm()}
            disabled={disabled}
          />
        </section>
      </div>
    </>
  );
}

export default Attendance;
