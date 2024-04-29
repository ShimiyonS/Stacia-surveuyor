import React from "react";

export default function CustomAgendaView({ events }) {
  return (
    <div>
      <h2>Custom Agenda View</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}