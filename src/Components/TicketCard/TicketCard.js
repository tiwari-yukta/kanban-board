import React from "react";
import "./TicketCard.css";
import { ReactComponent as Dotdot } from "../../assets/3 dot menu.svg";
import { ReactComponent as Backlog } from "../../assets/Backlog.svg";
import { ReactComponent as Cancelled } from "../../assets/Cancelled.svg";
import { ReactComponent as Done } from "../../assets/Done.svg";
import { ReactComponent as ToDo } from "../../assets/To-do.svg";
import { ReactComponent as InProgress } from "../../assets/in-progress.svg";

function TicketCard({ ticket }) {
  // if (!ticket) {
  //   return <div className="ticketcard">No ticket data available</div>;
  // }

  const { id, title, tag = [], status } = ticket;
  const statusIcons = {
    Backlog: <Backlog />,
    Cancelled: <Cancelled />,
    Done: <Done />,
    Todo: <ToDo />,
    "In progress": <InProgress />,
  };

  return (
    <div className="ticketcard">
      <div className="ticketcard-top">{id}</div>
      <div className="ticketcard-middle">
        <div className="ticketcard-middle-left">
          {statusIcons[status] || null}
        </div>
        <div className="ticketcard-middle-right">{title}</div>
      </div>
      <div className="ticketcard-bottom">
        <div className="ticketcard-bottom-left">
          <Dotdot />
        </div>
        <div className="ticketcard-bottom-right">{tag.join(", ")}</div>
      </div>
    </div>
  );
}

export default TicketCard;
