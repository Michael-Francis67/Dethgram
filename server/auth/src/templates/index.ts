export const VERIFICATION_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Dethgram - Verify your email</title>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <style>
          body, table, td, p, a {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            vertical-align: baseline;
          }
          body {
            background-color: #d4e6ff;
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
          }
          table {
            border-collapse: collapse !important;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          td {
            vertical-align: top;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          @media screen and (max-width: 600px) {
            .stack-cell {
              display: block !important;
              width: 100% !important;
            }
            .code-box {
              font-size: 32px !important;
              letter-spacing: 6px !important;
            }
            .compact-pad {
              padding: 10px 16px !important;
            }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#d4e6ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

      <!--[if (gte mso 9)|(IE)]>
        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
      <![endif]-->

      <!-- MAIN TABLE: width 560px, minimal vertical spacing -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px; width:100%; margin:0 auto; background-color:#d4e6ff;">
        <tr>
          <td style="padding:12px 0 16px 0;">

            <!-- CARD: white base, compact padding -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff; border-radius:20px; box-shadow:0 12px 24px -8px rgba(0,55,120,0.2); border:1px solid #bdd6ff;">
              
              <!-- HEADER: Dethgram with verification context -->
              <tr>
                <td style="background: linear-gradient(145deg, #0a4da4, #1f6ed9); border-radius:20px 20px 0 0; padding:14px 20px 12px 20px; text-align:center;">
                  <h1 style="font-size:32px; font-weight:700; margin:0; letter-spacing:-0.3px; color:#FFFFFF; text-shadow:0 2px 3px rgba(0,20,50,0.3);">DETHGRAM</h1>
                  <p style="font-size:13px; margin:4px 0 0 0; color:#cbe4fe;">verify your email</p>
                </td>
              </tr>

              <!-- HERO: verification icon (blue lock) + message -->
              <tr>
                <td style="padding:0 16px; text-align:center;">
                  <div style="background-color:#e3f0ff; border-radius:16px; margin:12px 0 0 0; padding:16px 10px; border:1px dashed #7fb6ff;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#0a4da4; width:56px; height:56px; border-radius:28px; text-align:center; vertical-align:middle; box-shadow:0 5px 8px -3px #2f6ab0;">
                          <span style="font-size:30px; line-height:1; color:white;">🔐</span>
                        </td>
                      </tr>
                    </table>
                    <p style="font-size:20px; font-weight:600; color:#0b3f7a; margin:8px 0 0 0;">Verification required</p>
                    <p style="font-size:14px; color:#2f578b; margin:4px 0 0 0;">almost there!</p>
                  </div>
                </td>
              </tr>

              <!-- MESSAGE: short and friendly -->
              <tr>
                <td style="padding:14px 20px 8px 20px;">
                  <h2 style="font-size:18px; font-weight:600; color:#074099; margin:0 0 6px 0; border-left:4px solid #1f6ed9; padding-left:14px;">Hi {{name}},</h2>
                  <p style="font-size:14px; line-height:1.5; color:#1d3a5c; margin:0 0 8px 0;">Please verify your email address using the code below. This helps keep your Dethgram account secure.</p>
                </td>
              </tr>

              <!-- VERIFICATION CODE (big blue box) - this is the core replacement -->
              <tr>
                <td style="padding:4px 24px 12px 24px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:340px; margin:0 auto;">
                    <tr>
                      <td style="background:linear-gradient(145deg, #e1efff, #d0e6ff); border:2px solid #1f6ed9; border-radius:18px; padding:18px 12px; text-align:center; box-shadow:inset 0 2px 5px rgba(255,255,255,0.8), 0 6px 12px -6px #0a4da4;">
                        <span style="font-size:40px; font-weight:800; letter-spacing:8px; color:#0a4da4; text-shadow:0 1px 2px white; display:inline-block; word-break:break-all;">{{code}}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- HINT: copy/paste note -->
              <tr>
                <td style="padding:0 20px 8px 20px;">
                  <p style="font-size:13px; color:#2f5a8c; text-align:center; margin:0;">Enter this code on the verification screen. It expires in 15 minutes.</p>
                </td>
              </tr>

              <!-- SMALL CTA (secondary, but kept minimal) -->
              <tr>
                <td style="padding:0 20px 14px 20px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="background:#ffffff; border:1px solid #1f6ed9; border-radius:40px;">
                        <a href="#" style="display:inline-block; padding:8px 24px; font-size:14px; font-weight:500; color:#0a4da4; text-decoration:none; border-radius:40px;">open app to verify</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- DIVIDER: thin -->
              <tr>
                <td style="padding:0 20px;">
                  <div style="height:1px; background:linear-gradient(90deg, transparent, #9ac0f5, transparent);"></div>
                </td>
              </tr>

              <!-- TIPS: quick help (two columns) but super compact -->
              <tr>
                <td style="padding:16px 16px 8px 16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:50%; padding:0 6px 0 0; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:10px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:24px; padding-bottom:2px;">⏱️</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:13px;">15 min expiry</td></tr>
                          <tr><td align="center" style="font-size:11px; color:#4b6c9e;">don't wait too long</td></tr>
                        </table>
                      </td>
                      <td style="width:50%; padding:0 0 0 6px; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:10px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:24px; padding-bottom:2px;">🔄</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:13px;">Wrong email?</td></tr>
                          <tr><td align="center" style="font-size:11px; color:#4b6c9e;">update in settings</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- SINGLE HIGHLIGHT: support contact -->
              <tr>
                <td style="padding:0 20px 16px 20px;">
                  <table width="100%" style="background:#f3f9ff; border-radius:24px; padding:10px 16px;" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="32" style="vertical-align:middle; font-size:22px;">💬</td>
                      <td style="vertical-align:middle; font-size:13px; color:#164579;">Need help? <a href="#" style="color:#0a4da4; text-decoration:underline;">Contact support</a></td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- FOOTER: exactly as compact version -->
              <tr>
                <td style="background:#c3dcff; border-radius:0 0 20px 20px; padding:16px 18px 14px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding-bottom:6px;">
                        <table cellpadding="0" cellspacing="0" align="center">
                          <tr>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">f</span></td>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">📷</span></td>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">🐦</span></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:12px; color:#174582; line-height:1.4;">
                        <p style="margin:0 0 2px 0;">&copy; 2025 Dethgram, Inc.</p>
                        <p style="margin:0 0 2px 0;">123 Deth Street, San Francisco, CA 94103</p>
                        <p style="margin:6px 0 0 0;">
                          <a href="#" style="color:#082b5a; font-size:11px;">Unsubscribe</a> · 
                          <a href="#" style="color:#082b5a; font-size:11px;">Privacy</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- tiny extra note -->
            <table align="center" width="100%" style="max-width:560px; margin-top:8px;">
              <tr>
                <td style="text-align:center; font-size:11px; color:#4f6f9e;">🔵 Dethgram</td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

      <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
      <![endif]-->

      </body>
    </html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
  <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Dethgram - Welcome compact</title>
        <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <style>
          body, table, td, p, a {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            vertical-align: baseline;
          }
          body {
            background-color: #d4e6ff;
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
          }
          table {
            border-collapse: collapse !important;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          td {
            vertical-align: top;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }
          @media screen and (max-width: 600px) {
            .stack-cell {
              display: block !important;
              width: 100% !important;
            }
            .btn-inner {
              display: block !important;
              width: 100% !important;
            }
            .hero-compact {
              padding: 15px 15px 10px 15px !important;
            }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#d4e6ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

      <!--[if (gte mso 9)|(IE)]>
        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
      <![endif]-->

      <!-- MAIN TABLE: width 560px, reduced vertical spacing -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px; width:100%; margin:0 auto; background-color:#d4e6ff;">
        <tr>
          <td style="padding:12px 0 16px 0;">

            <!-- CARD: white base, tighter padding everywhere -->
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff; border-radius:20px; box-shadow:0 12px 24px -8px rgba(0,55,120,0.2); border:1px solid #bdd6ff;">
              
              <!-- HEADER: smaller text & padding -->
              <tr>
                <td style="background: linear-gradient(145deg, #0a4da4, #1f6ed9); border-radius:20px 20px 0 0; padding:14px 20px 12px 20px; text-align:center;">
                  <h1 style="font-size:32px; font-weight:700; margin:0; letter-spacing:-0.3px; color:#FFFFFF; text-shadow:0 2px 3px rgba(0,20,50,0.3);">DETHGRAM</h1>
                  <p style="font-size:13px; margin:4px 0 0 0; color:#cbe4fe;">welcome to the blue side</p>
                </td>
              </tr>

              <!-- HERO: compact greeting icon + reduced padding -->
              <tr>
                <td style="padding:0 16px; text-align:center;">
                  <div style="background-color:#e3f0ff; border-radius:16px; margin:12px 0 0 0; padding:16px 10px; border:1px dashed #7fb6ff;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#0a4da4; width:56px; height:56px; border-radius:28px; text-align:center; vertical-align:middle; box-shadow:0 5px 8px -3px #2f6ab0;">
                          <span style="font-size:30px; line-height:1; color:white;">👋</span>
                        </td>
                      </tr>
                    </table>
                    <p style="font-size:20px; font-weight:600; color:#0b3f7a; margin:8px 0 0 0;">Welcome aboard!</p>
                    <p style="font-size:14px; color:#2f578b; margin:4px 0 0 0;">You're in the family</p>
                  </div>
                </td>
              </tr>

              <!-- GREETING: compact spacing -->
              <tr>
                <td style="padding:12px 20px 6px 20px;">
                  <h2 style="font-size:18px; font-weight:600; color:#074099; margin:0 0 6px 0; border-left:4px solid #1f6ed9; padding-left:14px;">Hello {{name}},</h2>
                  <p style="font-size:14px; line-height:1.5; color:#1d3a5c; margin:0 0 12px 0;">Thanks for joining <strong style="color:#0a4da4;">Dethgram</strong>. We're excited to have you.</p>
                </td>
              </tr>

              <!-- CTA BUTTON: compact size -->
              <tr>
                <td style="padding:0 20px 8px 20px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                    <tr>
                      <td align="center" bgcolor="#1f6ed9" style="background: linear-gradient(135deg, #2272dc, #0a4da4); border-radius:40px; box-shadow:0 4px 8px -3px #1f5090;">
                        <a href="{{link}}" style="display:inline-block; padding:10px 28px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; border-radius:40px; border:1px solid #78b3ff; cursor:pointer;">🌟 START EXPLORING</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- DIVIDER: thinner -->
              <tr>
                <td style="padding:0 20px;">
                  <div style="height:1px; background:linear-gradient(90deg, transparent, #9ac0f5, transparent);"></div>
                </td>
              </tr>

              <!-- TIPS GRID: two rows of two columns, smaller font/padding -->
              <tr>
                <td style="padding:14px 16px 4px 16px;">
                  <!-- first row of tips -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:50%; padding:0 6px 0 0; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:12px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:26px; padding-bottom:2px;">🖼️</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:14px;">Profile</td></tr>
                          <tr><td align="center" style="font-size:12px; color:#4b6c9e; line-height:1.3;">Add photo & bio</td></tr>
                        </table>
                      </td>
                      <td style="width:50%; padding:0 0 0 6px; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:12px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:26px; padding-bottom:2px;">🔔</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:14px;">Notifications</td></tr>
                          <tr><td align="center" style="font-size:12px; color:#4b6c9e; line-height:1.3;">Stay in the loop</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 16px 10px 16px;">
                  <!-- second row of tips -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="width:50%; padding:0 6px 0 0; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:12px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:26px; padding-bottom:2px;">👥</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:14px;">Find friends</td></tr>
                          <tr><td align="center" style="font-size:12px; color:#4b6c9e; line-height:1.3;">Connect instantly</td></tr>
                        </table>
                      </td>
                      <td style="width:50%; padding:0 0 0 6px; vertical-align:top;" class="stack-cell">
                        <table width="100%" style="background:#eef5ff; border-radius:14px; padding:12px 6px;" cellpadding="0" cellspacing="0">
                          <tr><td align="center" style="font-size:26px; padding-bottom:2px;">🎨</td></tr>
                          <tr><td align="center" style="font-weight:600; color:#0a3f86; font-size:14px;">Blue filters</td></tr>
                          <tr><td align="center" style="font-size:12px; color:#4b6c9e; line-height:1.3;">Exclusive tones</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- SINGLE HIGHLIGHT: compact -->
              <tr>
                <td style="padding:0 20px 14px 20px;">
                  <table width="100%" style="background:#f3f9ff; border-radius:24px; padding:10px 16px;" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="32" style="vertical-align:middle; font-size:24px;">📘</td>
                      <td style="vertical-align:middle; font-size:13px; color:#164579;"><strong>Dethgram 101</strong> — quick guide</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- FOOTER: smaller padding, compact social icons -->
              <tr>
                <td style="background:#c3dcff; border-radius:0 0 20px 20px; padding:16px 18px 14px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding-bottom:6px;">
                        <table cellpadding="0" cellspacing="0" align="center">
                          <tr>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">f</span></td>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">📷</span></td>
                            <td style="padding:0 4px;"><span style="display:inline-block; width:30px; height:30px; background:#0f438c; border-radius:15px; color:white; line-height:30px; text-align:center; font-size:16px;">🐦</span></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:12px; color:#174582; line-height:1.4;">
                        <p style="margin:0 0 2px 0;">&copy; 2025 Dethgram, Inc.</p>
                        <p style="margin:0 0 2px 0;">123 Deth Street, San Francisco, CA 94103</p>
                        <p style="margin:6px 0 0 0;">
                          <a href="#" style="color:#082b5a; font-size:11px;">Unsubscribe</a> · 
                          <a href="#" style="color:#082b5a; font-size:11px;">Privacy</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- extra tiny note -->
            <table align="center" width="100%" style="max-width:560px; margin-top:8px;">
              <tr>
                <td style="text-align:center; font-size:11px; color:#4f6f9e;">💙 make every moment worth it.</td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

      <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
      <![endif]-->

      </body>
    </html>
`;
