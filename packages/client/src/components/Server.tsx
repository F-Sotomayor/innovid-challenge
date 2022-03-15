/* eslint-disable prettier/prettier */
import * as React from "react";
import axios from "axios";

interface IServer {
  id: string;
  load: number;
  status: boolean;
  handleStatus: VoidFunction;
  updateServerLoad: (server: { id: string; load: number }) => void;
}

const Server: React.VFC<IServer> = ({
  id,
  load,
  status,
  handleStatus,
  updateServerLoad,
}) => {
  React.useEffect(() => {
    let interval: number;

    if (status === true) {
      interval = setInterval(() => {
        axios.get(`http://localhost:8000/status/${id}`).then((response) => {
          updateServerLoad(response.data);
        });
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [updateServerLoad, id, status]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "300px",
        width: "400px",
        padding: "2px",
        border: "1px solid gray",
        backgroundColor: "gray",
        margin: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "blue",
          width: "100%",
          height: "24px",
          color: "white",
          paddingLeft: "24px",
        }}
      >
        Server #{id}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={
            status === true ? "src/assets/pc-on.gif" : "src/assets/pc-off.png"
          }
          style={{ width: "160px", height: "160px" }}
        />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 0.33,
            border: "0.5px solid black",
            textTransform: "capitalize",
          }}
        >
          Status: {status === true ? "Online" : "Offline"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 0.33,
            border: "0.5px solid black",
          }}
        >
          <button
            style={{ width: "100%", height: "100%" }}
            onClick={handleStatus}
          >
            {status === true ? "Shutdown" : "Turn On"}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 0.33,
            border: "0.5px solid black",
          }}
        >
          CPU Usage: {status === true ? `${load}%` : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Server;
