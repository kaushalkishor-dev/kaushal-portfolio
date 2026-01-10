// ============================================
// HIRE.JS - Contact Form & Email Functionality
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("📧 Hire.js initializing...");
  initContactForm();
  console.log("✅ Hire.js initialized");
});

// ===== CONTACT FORM =====
function initContactForm() {
  const sendBtn = document.getElementById("sendBtn");
  const contactForm = document.getElementById("contactForm");

  if (!sendBtn || !contactForm) {
    console.error("Contact form elements not found");
    return;
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Form validation
  function validateForm() {
    const emailInput = document.getElementById("senderEmail");
    const messageInput = document.getElementById("message");

    if (!emailInput || !messageInput) {
      alert("Form error. Please refresh the page.");
      return false;
    }

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Validate email
    if (!email) {
      alert("Please enter your email address");
      emailInput.focus();
      return false;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address (e.g., name@example.com)");
      emailInput.focus();
      return false;
    }

    // Validate message
    if (!message) {
      alert("Please enter your message");
      messageInput.focus();
      return false;
    }

    if (message.length < 10) {
      alert("Message should be at least 10 characters long");
      messageInput.focus();
      return false;
    }

    return true;
  }

  // Send via Gmail function
  function sendViaGmail() {
    if (!validateForm()) {
      return;
    }

    // Get form values
    const visitorEmail = document.getElementById("senderEmail").value.trim();
    const service =
      document.getElementById("service").value || "General Inquiry";
    const message = document.getElementById("message").value.trim();

    // Your email address
    const yourEmail = "kkup.06009@gmail.com";

    // Create email subject and body
    const subject = `Portfolio Inquiry: ${service}`;
    const body = `
From: ${visitorEmail}
Service: ${service}

Message:
${message}

---
Sent via Kaushal's Portfolio Contact Form
`;

    // Create Gmail compose URL
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(yourEmail)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    console.log("Opening Gmail compose window...");

    // Open Gmail in new tab
    const gmailWindow = window.open(
      gmailUrl,
      "_blank",
      "noopener,noreferrer,width=800,height=600"
    );

    // Check if window opened successfully
    if (gmailWindow && !gmailWindow.closed) {
      // Success - Gmail opened
      showSuccessMessage("gmail");

      // Clear form after delay
      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    } else {
      // Popup blocked - show alternative
      showPopupBlockedMessage(gmailUrl);
    }
  }

  // Show success message
  function showSuccessMessage(type) {
    const messages = {
      gmail: `
✅ Gmail opened in new tab!

Next steps:
1. Check for new browser tab (Gmail)
2. Email is pre-filled with your message
3. Click "Send" in Gmail to complete

💡 If you don't see Gmail:
• Check browser popup blocker
• Look behind other windows
• Try clicking the button again
`,
    };

    alert(messages[type] || "✅ Message ready to send!");
  }

  // Show popup blocked message
  function showPopupBlockedMessage(gmailUrl) {
    const message = `
❌ Popup blocked!

Please:
1. Allow popups for this site
2. Or click the link below:

${gmailUrl}

3. Or email directly to: kkup.06009@gmail.com
`;

    alert(message);

    // Optionally create a clickable link
    createManualLink(gmailUrl);
  }

  // Create manual link for popup blocked case
  function createManualLink(gmailUrl) {
    const linkDiv = document.createElement("div");
    linkDiv.id = "gmailManualLink";
    linkDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            border-left: 5px solid #007bff;
            max-width: 300px;
        `;

    linkDiv.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #333;">📧 Open Gmail</h4>
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                Click below to open Gmail compose window:
            </p>
            <a href="${gmailUrl}" target="_blank" style="
                display: block;
                background: #4285f4;
                color: white;
                padding: 10px;
                border-radius: 5px;
                text-decoration: none;
                text-align: center;
                font-weight: bold;
                margin-bottom: 10px;
            ">
                <i class="fas fa-external-link-alt"></i> Open Gmail
            </a>
            <button onclick="document.getElementById('gmailManualLink').remove()" style="
                background: #ccc;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                width: 100%;
            ">
                Close
            </button>
        `;

    document.body.appendChild(linkDiv);

    // Auto remove after 30 seconds
    setTimeout(() => {
      if (document.getElementById("gmailManualLink")) {
        document.getElementById("gmailManualLink").remove();
      }
    }, 30000);
  }

  // Event listener for send button
  sendBtn.addEventListener("click", sendViaGmail);

  // Handle Enter key in form (but not in textarea)
  contactForm.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      sendViaGmail();
    }
  });

  // Form submission prevention
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendViaGmail();
  });

  console.log("✅ Contact form ready - using Gmail compose");
}

// ===== FALLBACK MAILTO FUNCTION =====
function sendViaMailto() {
  // This is a fallback function if needed
  const email = document.getElementById("senderEmail").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!email || !message) {
    alert("Please fill all required fields");
    return;
  }

  const subject = `Portfolio Inquiry: ${service}`;
  const body = `From: ${email}\n\nService: ${service}\n\nMessage:\n${message}`;

  const mailtoLink =
    `mailto:kkup.06009@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  alert("Opening email client... Please click 'Send' to complete.");
}

// ===== UTILITY FUNCTIONS =====
function trackContactSubmission(type) {
  // Track contact form submissions
  let submissions = JSON.parse(
    localStorage.getItem("contactSubmissions") || "[]"
  );
  submissions.push({
    type: type,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
  localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

  console.log(`Contact submission tracked: ${type}`);
}

// Export for debugging
window.contactForm = {
  sendViaGmail: sendViaGmail,
  sendViaMailto: sendViaMailto,
  trackContactSubmission: trackContactSubmission,
};
