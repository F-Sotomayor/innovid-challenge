/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import * as React from "react";
import axios from "axios";

import Server from "../components/Server";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const amount = [1, 2, 3, 4];
  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    amount.map((sv) => {
      axios
        .get(`http://localhost:8000/status/${sv}`)
        .then((response) =>
          setServers((server) =>
            server.concat({ status: true, ...response.data })
          )
        );
    });
  }, []);

  function handleServerChange(id) {
    setServers((servers) =>
      servers.map((server) => {
        return server.id !== id
          ? server
          : { ...server, status: !server.status };
      })
    );
  }

  async function getLoad(id: number) {
    await axios
      .get(`http://localhost:8000/status/${id}`)
      .then((response) => response.data)
      .then((data) => {
        return data.load;
      });
  }

  React.useEffect(() => {
    let timeout: any;

    // eslint-disable-next-line prefer-const
    timeout = setTimeout(() => {
      setServers((servers: any) =>
        servers.map((server: any) =>
          server.status === false
            ? server
            : {
                ...server,
                load: console.log(getLoad(server.id)),
              }
        )
      );
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [servers]);

  return (
    <main className={styles.container}>
      {servers.map((server) => {
        return (
          <div key={server.id}>
            <Server
              displayStatus={server.status === true ? "Online" : "Offline"}
              handleStatus={() => handleServerChange(server.id)}
              id={server.id}
              image={
                server.status === true
                  ? "src/assets/pc-on.gif"
                  : "src/assets/pc-off.png"
              }
              load={server.status === false ? `N/A` : `${server.load}%`}
              status={server.status === true ? "Shutdown" : "Turn On"}
            />
            ;
          </div>
        );
      })}
    </main>
  );
};

export default App;
