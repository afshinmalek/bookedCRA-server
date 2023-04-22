import React from "react";

function AppointmentConfirmation({ appointment }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Appointment Confirmation</title>
        <style>{/* Add your CSS styles here */}</style>
      </head>
      <body>
        <div className="container">
          <h1 className="title">Appointment Confirmation</h1>
          <p className="message">Your appointment has been confirmed!</p>
          <a href="#" className="button">
            View Appointment
          </a>
        </div>
      </body>
    </html>
  );
}

export default AppointmentConfirmation;
