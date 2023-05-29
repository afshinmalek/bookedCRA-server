const generateConfirmationHtml = (data, link, resultHtml) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Appointment Confirmation</title>
    <style type="text/css">
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: white;
      background-color: black;
    }
    .container {
      margin: 0 auto;
      max-width: 600px;
      padding: 20px;
      background-color: black;
      border-radius: 8px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
      color: white;
    }
    .title {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
      color: white;
    }
    .message {
      margin-bottom: 30px;
      text-align: center;
      color:white;
    }
    .button {
      display: block;
      margin: 0 auto;
      margin-bottom: 5px;
      padding: 14px 28px;
      background-color: #007bff;
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      border-radius: 6px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }
    .button:hover {
      background-color: #0056b3;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
      color:white;
    }
    #button2{
      display: inline-block;
      width: 40px;
      margin:  7px;
      margin-bottom: 5px;
      padding: 14px 28px;
      background-color: #007bff;
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      border-radius: 6px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
    }
    #button2.hover{
      background-color: #0056b3;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
      color:white;
    }

    </style>
  </head>
  <body>
    <div class="container">
        <h1 class="title">Appointment Confirmation</h1>
        <p class="message">Your appointment has been confirmed!</p>
        <p class="message">Time : ${data.time}:00 - ${+data.time + 1}:00 ${
  data.time <= 11 && data.time >= 9 ? " AM" : " PM"
}</p>
        <p class="message">Date : ${data.date}</p>
        <a class="button" href=${link} >Cancel</a>

    </div>
    <div class="container2">

    ${resultHtml || ""}

    </div>

  </body>
</html>`;

module.exports = generateConfirmationHtml;
