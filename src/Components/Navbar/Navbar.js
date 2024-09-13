import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { ReactComponent as AddImage } from "../../assets/add.svg";
import { ReactComponent as DotDot } from "../../assets/3 dot menu.svg";
import { ReactComponent as Backlog } from "../../assets/Backlog.svg";
import { ReactComponent as Cancelled } from "../../assets/Cancelled.svg";
import { ReactComponent as Done } from "../../assets/Done.svg";
import { ReactComponent as ToDo } from "../../assets/To-do.svg";
import { ReactComponent as InProgress } from "../../assets/in-progress.svg";

const Navbar = () => {
  const [statusCounts, setStatusCounts] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        const { tickets } = data;
        const counts = {
          backlog: tickets.filter((ticket) => ticket.status === "Backlog")
            .length,
          todo: tickets.filter((ticket) => ticket.status === "Todo").length,
          inProgress: tickets.filter(
            (ticket) => ticket.status === "In progress"
          ).length,
          done: tickets.filter((ticket) => ticket.status === "Done").length,
          cancelled: tickets.filter((ticket) => ticket.status === "Cancelled")
            .length,
        };

        setStatusCounts(counts);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <Backlog className="comp" />
          Backlog {statusCounts.backlog}
        </div>
        <div className="navbar-right">
          <AddImage /> <DotDot />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <ToDo className="comp" />
          To Do {statusCounts.todo}
        </div>
        <div className="navbar-right">
          <AddImage className="comp" /> <DotDot />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <InProgress className="comp" />
          In Progress {statusCounts.inProgress}
        </div>
        <div className="navbar-right">
          <AddImage /> <DotDot />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <Done className="comp" />
          Done {statusCounts.done}
        </div>
        <div className="navbar-right">
          <AddImage /> <DotDot />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-left">
          <Cancelled className="comp" />
          Cancelled {statusCounts.cancelled}
        </div>
        <div className="navbar-right">
          <AddImage /> <DotDot />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
