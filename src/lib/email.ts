import nodemailer from "nodemailer";

export async function sendOrderReceiptEmail(order: any) {
  try {
    // Note: You must add these to your .env file
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP credentials missing. Skipping email send.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const trackingLink = `https://dhinakarpharma.in/track?orderId=${order.id}&email=${encodeURIComponent(order.customerEmail)}`;

    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; background-color: white; padding: 30px; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #1B3F8B; margin: 0;">Dhinakar Pharma</h1>
        </div>
        <h2 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Payment Successful!</h2>
        <p style="font-size: 16px; line-height: 1.5;">Dear <strong>${order.customerName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">Thank you for your purchase from Dhinakar Pharma. Your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> has been securely processed and confirmed.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #334155;">Order Summary</h3>
          <p style="margin: 0; font-size: 15px;"><strong>Total Paid:</strong> <span style="color: #1B3F8B; font-weight: bold; font-size: 18px;">₹${order.totalAmount}</span></p>
          <p style="margin: 10px 0 0 0; font-size: 15px; line-height: 1.5;"><strong>Shipping To:</strong><br> ${order.shippingAddress}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.5;">You can track the live status of your shipment using our secure tracking portal by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${trackingLink}" style="display: inline-block; background-color: #1B3F8B; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">Track Your Order</a>
        </div>
        
        <p style="margin-top: 40px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; line-height: 1.5;">
          If you have any questions, please reply to this email or contact <a href="mailto:info@dhinakarpharma.in" style="color: #1B3F8B;">info@dhinakarpharma.in</a><br>
          © ${new Date().getFullYear()} Dhinakar Pharma. All rights reserved.
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Dhinakar Pharma" <${smtpUser}>`, // sender address
      to: order.customerEmail, // list of receivers
      subject: `Order Receipt & Tracking Link - #${order.id.slice(-8).toUpperCase()}`,
      html: htmlContent,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
