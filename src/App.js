import React, { useState } from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import "./index.css";
import TicketList from "./Components/TicketList/TicketList";
const App = () => {
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  return (
    <div className="app">
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />
      <TicketList grouping={grouping} ordering={ordering} />
    </div>
  );
};

export default App;
