/* eslint-disable prettier/prettier */
import * as React from "react";

const Server = ({ id, load, status, handleStatus, image, displayStatus }) => {
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
        <img src={image} style={{ width: "160px", height: "160px" }} />
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
          Status: {displayStatus}
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
            {status}
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
          CPU Usage: {load}
        </div>
      </div>
    </div>
  );
};

export default Server;
