import React, { useState, useEffect } from "react";
import TicketCard from "../TicketCard/TicketCard";
import Navbar from "../Navbar/Navbar";
import "./TicketList.css";

function TicketList({ grouping, ordering }) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown";
  };

  let filteredTickets = [...tickets];
  if (grouping === "user") {
    filteredTickets.sort((a, b) => {
      const userA = getUserById(a.userId);
      const userB = getUserById(b.userId);
      return userA.localeCompare(userB);
    });
  } else if (grouping === "priority") {
    filteredTickets.sort((a, b) => a.priority - b.priority);
  }

  const statusGroups = {
    Backlog: filteredTickets.filter((ticket) => ticket.status === "Backlog"),
    Todo: filteredTickets.filter((ticket) => ticket.status === "Todo"),
    "In progress": filteredTickets.filter(
      (ticket) => ticket.status === "In progress"
    ),
    Done: filteredTickets.filter((ticket) => ticket.status === "Done"),
    Cancelled: filteredTickets.filter(
      (ticket) => ticket.status === "Cancelled"
    ),
  };

  return (
    <div>
      <Navbar />
      <div className="ticket-grid">
        {Object.entries(statusGroups).map(([status, tickets]) => (
          <div className="ticket-column" key={status}>
            <div className="ticket-section">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  getUserById={getUserById}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;
