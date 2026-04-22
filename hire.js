// ===== HIRE.JS - Contact Form (Returns to Portfolio + Clears Form) =====
document.addEventListener("DOMContentLoaded", function () {
    console.log("📧 Contact form initializing...");
    initContactForm();
});

function initContactForm() {
    const sendBtn = document.getElementById("sendBtn");
    const contactForm = document.getElementById("contactForm");
    
    if (!sendBtn || !contactForm) {
        console.error("Contact form elements missing");
        return;
    }

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Form validation
    function validateForm() {
        const email = document.getElementById("senderEmail").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (!email) {
            alert("Please enter your email address");
            document.getElementById("senderEmail").focus();
            return false;
        }
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address (e.g., name@example.com)");
            document.getElementById("senderEmail").focus();
            return false;
        }
        if (!message) {
            alert("Please enter your message");
            document.getElementById("message").focus();
            return false;
        }
        if (message.length < 10) {
            alert("Message should be at least 10 characters long");
            document.getElementById("message").focus();
            return false;
        }
        return true;
    }

    // Clear form function
    function clearForm() {
        document.getElementById("senderEmail").value = "";
        document.getElementById("service").selectedIndex = 0;
        document.getElementById("message").value = "";
    }

    // Main send function - opens email in NEW TAB, clears form, stays on portfolio
    function sendMessage() {
        if (!validateForm()) return;

        // Get form values
        const email = document.getElementById("senderEmail").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();
        const yourEmail = "kkup.06009@gmail.com";
        
        const subject = `Portfolio Inquiry: ${service}`;
        const body = `From: ${email}\n\nService: ${service}\n\nMessage:\n${message}\n\n---\nSent from Kaushal's Portfolio`;

        // Create email links
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(yourEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Clear form FIRST (so user sees it's empty)
        clearForm();

        // Try to open email in NEW TAB (portfolio stays open)
        let emailOpened = false;
        
        // Method 1: Gmail in new tab (works on click - usually allowed)
        try {
            const newTab = window.open(gmailUrl, '_blank');
            if (newTab && !newTab.closed) {
                emailOpened = true;
                alert("✅ Gmail opened in new tab!\n\nPlease complete and send your email there.\n\nYour portfolio page is still open.");
            } else {
                throw new Error("Popup blocked");
            }
        } catch (e) {
            console.log("Gmail new tab failed, trying mailto");
        }

        // Method 2: mailto: in new tab (fallback)
        if (!emailOpened) {
            try {
                const newTab = window.open(mailtoLink, '_blank');
                if (newTab && !newTab.closed) {
                    emailOpened = true;
                    alert("✅ Email client opened in new tab/window!\n\nPlease send your email there.\n\nYour portfolio page is still open.");
                } else {
                    throw new Error("Popup blocked");
                }
            } catch (e) {
                // Final fallback: open in same tab (but portfolio will be replaced)
                window.location.href = mailtoLink;
                alert("📧 Opening email client...\n\nAfter sending, please return to portfolio tab.");
            }
        }

        // If popup was blocked, show manual instruction
        if (!emailOpened) {
            alert("❌ Popup blocked!\n\nPlease allow popups for this site or copy the link below:\n\n" + gmailUrl);
        }

        // Optional: Track submission
        let count = parseInt(localStorage.getItem('contactSubmissions')) || 0;
        localStorage.setItem('contactSubmissions', count + 1);
        console.log(`Contact submission #${count + 1}`);
    }

    // Event listener
    sendBtn.addEventListener("click", sendMessage);
    
    // Prevent form from submitting (no page reload)
    contactForm.addEventListener("submit", (e) => e.preventDefault());
    
    // Handle Enter key (but not in textarea)
    contactForm.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            sendMessage();
        }
    });
    
    console.log("✅ Contact form ready - email opens in new tab, form clears automatically");
}