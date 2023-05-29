const htmlTemplate = `
<html>
  <head>
    <title>Cancel Message</title>
    <style>
      body {
        background-color: black;
      }

      .cancel-message {
        position: absolute;
        top: 33%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 400px;
        background-color: #007bff;
        color: white;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }

      .cancel-message h2 {
        font-family: fantasy, Arial, sans-serif;
        font-size: 1.5rem;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="cancel-message">
      <h2>Your Appointment has been Canceled!</h2>
    </div>
  </body>
</html>
`;

module.exports = () => htmlTemplate;
