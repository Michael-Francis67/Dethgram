export const VERIFICATION_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dethgram - Verify Email</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            background-color: #f5f5f5;
            overflow: hidden;
          }

          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: 500px;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            position: relative;
          }

          .card-header {
            margin-bottom: 20px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: auto;
            width: 100%;
            text-align: center;
            border-radius: 10px 10px 0 0;
            color: #fff;
            background: linear-gradient(135deg, #4f4ff1 0%, #8484fa 100%);
            padding: 10px 0;
          }

          .card-content {
            text-align: center;
            color: #333;
            margin-top: 80px;
            width: 100%;
            height: 100%;
          }

          .card-content h2 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #4f4ff1;
          }

          .card-content p {
            text-align: left;
            font-size: 16px;
            line-height: 1.5;
          }

          .card-content .code {
            background-color: #4f4ff1;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 20px;
            width: 280px;
            text-align: center;
            height: 50px;
            cursor: pointer;
          }

          .card-content .code:hover {
            background-color: #3e3ed1;
          }

          footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h1>Dethgram</h1>
            </div>

            <div class="card-content">
              <h2>Verify Your Email</h2>

              <p>Hi, {{name}}!</p>

              <p>Please verify your email address using the code below. This helps keep your Dethgram account secure.</p>

              <button class="code">{{code}}</button>

              <p>Please do not share this code with anyone and also this code expires in exactly 15 minutes time.</p>

              <p>Thank you for using Dethgram!, Best Regards</p>

              <footer>
                <span>&copy; 2025 Dethgram, Inc.</span>
                <span>123 Washington Street, Suite 400 · San Francisco, CA 94105</span>
                <span><a href="#">Unsubscribe</a> · <a href="#">Privacy</a></span>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dethgram - Welcome Email</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            background-color: #f5f5f5;
            overflow: auto;
            padding: 30px;
          }

          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }

          .card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            height: auto;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            position: relative;
          }

          .card-header {
            margin-bottom: 20px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: auto;
            width: 100%;
            text-align: center;
            border-radius: 10px 10px 0 0;
            color: #fff;
            background: linear-gradient(135deg, #4f4ff1 0%, #8484fa 100%);
            padding: 10px 0;
          }

          .card-content {
            text-align: center;
            color: #333;
            margin-top: 80px;
            width: 100%;
            height: 100%;
          }

          .card-content h2 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #4f4ff1;
          }

          .card-content p {
            text-align: left;
            font-size: 16px;
            line-height: 1.5;
          }

          .card-content .link-container {
            margin-top: 40px;
            margin-bottom: 20px;
          }

          .card-content .link-container .code {
            background-color: #4f4ff1;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            width: 280px;
            text-align: center;
            text-decoration: none;
            height: 50px;
            cursor: pointer;
          }

          .card-content .code:hover {
            background-color: #3e3ed1;
          }

          .card-content ul {
            text-align: left;
            margin-left: 20px;
            font-size: 16px;
            line-height: 1.5;
          }

          .card-content .greetings {
            margin-top: 40px;
            text-align: left;
            font-size: 16px;
            line-height: 1.5;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h1>Dethgram</h1>
            </div>

            <div class="card-content">
              <h2>Welcome to Dethgram!</h2>

              <p>Hi, {{name}}!</p>

              <p>Thank you for joining Dethgram! We're excited to have you on board.</p>

              <p>Get started by exploring our features and connecting with your community.</p>

              <div class="link-container">
                <a href="{{cta_link}}" target="_blank" class="code">🌟 START EXPLORING</a>
              </div>

              <p>Next steps:</p>

              <ul>
                <li>Complete your profile.</li>
                <li>Chat with your friends and families.</li>
                <li>Trust your device in the settings.</li>
              </ul>

              <div class="greetings">
                <p>Best regards,</p>
                <p>The Dethgram Team</p>
              </div>

              <footer>
                <span>&copy; 2025 Dethgram, Inc.</span>
                <span>123 Washington Street, Suite 400 · San Francisco, CA 94105</span>
                <span><a href="#">Unsubscribe</a> · <a href="#">Privacy</a></span>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
`;
