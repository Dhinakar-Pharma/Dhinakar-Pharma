import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderReceiptEmail(order: any) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log("Resend API Key missing. Skipping email.");
      return;
    }

    const trackingLink = `https://dhinakarpharma.in/track?orderId=${order.id}&email=${encodeURIComponent(order.customerEmail)}`;

    const { data, error } = await resend.emails.send({
      from: 'Dhinakar Pharma <marketing@dhinakarpharma.in>',
      to: [order.customerEmail],
      subject: `Order Confirmed - #${order.id.slice(-6).toUpperCase()}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1B3F8B; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">DHINAKAR PHARMA</h1>
            <p style="color: #cbd5e1; margin-top: 10px; font-size: 14px;">Scientific Excellence in Healthcare</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-top: 0;">Order Confirmed!</h2>
            <p style="color: #475569; line-height: 1.6;">Hello ${order.customerName},</p>
            <p style="color: #475569; line-height: 1.6;">Thank you for choosing Dhinakar Pharma. Your order has been successfully placed and is now being processed by our clinical team.</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Order Number</p>
              <p style="margin: 5px 0 15px 0; font-weight: bold; color: #1e293b; font-size: 18px;">#${order.id.toUpperCase()}</p>
              
              <p style="margin: 0; font-size: 14px; color: #64748b;">Total Amount Paid</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #1B3F8B; font-size: 18px;">₹${order.totalAmount.toLocaleString('en-IN')}</p>
            </div>

            <div style="margin: 30px 0; text-align: center;">
              <a href="${trackingLink}" style="background-color: #1B3F8B; color: white; padding: 16px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">Track Your Order</a>
            </div>

            <p style="color: #475569; line-height: 1.6;">Shipping to:<br>
            <strong style="color: #1e293b;">${order.shippingAddress}</strong></p>
          </div>
          
          <p style="margin: 0; padding: 20px 30px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; line-height: 1.5; background-color: #f8fafc;">
            If you have any questions, please reply to this email or contact <a href="mailto:marketing@dhinakarpharma.in" style="color: #1B3F8B;">marketing@dhinakarpharma.in</a><br>
            © ${new Date().getFullYear()} Dhinakar Pharma. All rights reserved.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return;
    }

    console.log("Email sent successfully via Resend:", data?.id);
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
  }
}

export async function sendOrderStatusUpdateEmail(order: any) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) return;

    const status = order.fulfillmentStatus;
    let subject = "";
    let headline = "";
    let message = "";

    if (status === "SHIPPED") {
      subject = `Order Shipped - #${order.id.slice(-6).toUpperCase()}`;
      headline = "On Its Way!";
      message = "Your Dhinakar Pharma order has been dispatched and is currently in transit to your location.";
    } else if (status === "DELIVERED") {
      subject = `Order Delivered - #${order.id.slice(-6).toUpperCase()}`;
      headline = "Successfully Delivered!";
      message = "Your Dhinakar Pharma order has been successfully delivered. We hope our products meet your clinical expectations.";
    } else {
      return;
    }

    const trackingLink = `https://dhinakarpharma.in/track?orderId=${order.id}&email=${encodeURIComponent(order.customerEmail)}`;

    await resend.emails.send({
      from: 'Dhinakar Pharma <marketing@dhinakarpharma.in>',
      to: [order.customerEmail],
      subject: subject,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1B3F8B; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">DHINAKAR PHARMA</h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-top: 0;">${headline}</h2>
            <p style="color: #475569; line-height: 1.6;">Hello ${order.customerName},</p>
            <p style="color: #475569; line-height: 1.6;">${message}</p>
            
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Order Number</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #1e293b; font-size: 18px;">#${order.id.toUpperCase()}</p>
            </div>

            <div style="margin: 30px 0; text-align: center;">
              <a href="${trackingLink}" style="background-color: #1B3F8B; color: white; padding: 16px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">View Order Status</a>
            </div>
          </div>
          
          <p style="margin: 0; padding: 20px 30px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; line-height: 1.5; background-color: #f8fafc;">
            If you have any questions, please reply to this email or contact <a href="mailto:marketing@dhinakarpharma.in" style="color: #1B3F8B;">marketing@dhinakarpharma.in</a>
          </p>
        </div>
      `,
    });

    console.log(`Status update email (${status}) sent for order:`, order.id);
  } catch (error) {
    console.error("Failed to send status update email:", error);
  }
}

