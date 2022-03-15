/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import * as React from "react";

import Server from "../components/Server";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [servers, setServers] = React.useState([
    { id: "0", load: 0, status: false },
    { id: "1", load: 0, status: false },
    { id: "2", load: 0, status: false },
    { id: "3", load: 0, status: false },
  ]);

  function handleServerChange(id: string) {
    setServers((servers) =>
      servers.map((server) => {
        return server.id !== id
          ? server
          : { ...server, status: !server.status };
      })
    );
  }

  const handleUpdateServer = React.useCallback(({ id, load }) => {
    setServers((servers) =>
      servers.map((server) => {
        return server.id !== id ? server : { ...server, load };
      })
    );
  }, []);

  return (
    <main className={styles.container}>
      {servers.map((server) => {
        return (
          <div key={server.id}>
            <Server
              handleStatus={() => handleServerChange(server.id)}
              id={server.id}
              load={server.load}
              status={server.status}
              updateServerLoad={handleUpdateServer}
            />
            ;
          </div>
        );
      })}
    </main>
  );
};

export default App;
