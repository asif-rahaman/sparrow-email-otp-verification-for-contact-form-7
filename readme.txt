=== Sparrow Email OTP Verification for Contact Form 7 ===
Contributors: asif_rahaman
Tags: contact form 7, otp, email verification, spam protection, smtp
Requires at least: 5.2
Tested up to: 7.0
Stable tag: 1.1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Verify user emails with a secure OTP code to block bots and fake leads. Uses your own SMTP—no API fees, no subscriptions.

== Description ==

**Sparrow Email OTP Verification for Contact Form 7** provides a robust security layer for your website by verifying user email addresses before form submission. This effectively blocks bots, spammers, and malicious actors from flooding your inbox with fake data or invalid leads.

### Why this plugin is different:
Most existing OTP plugins require you to pay for their proprietary API or use their specific SMTP service to send codes. This often leads to unexpected monthly costs and vendor lock-in.

This plugin is built with a **"Your Server, Your Rules"** philosophy. It sends OTP codes using the native `wp_mail()` function, meaning it utilizes your website's default mail configuration or your preferred SMTP service. **There are no extra costs, no hidden fees, and no third-party accounts required.**

== Features ==
* **Block Bots & Spam:** Ensure every submission comes from a person with a valid, accessible email address.
* **Conditional Display (New v1.1.0):** Dynamically hide verification elements inside an elegant wrapper box until an email string is typed.
* **Cost-Effective:** Zero cost to send OTPs—it uses your existing server or SMTP setup.
* **Privacy First:** No data is sent to external verification APIs; everything stays on your server.
* **Smart Detection:** Automatically finds the email field in your Contact Form 7 forms.
* **Security-First Rate Limiting:** Built-in protection to prevent OTP request abuse by limiting users to 3 attempts per 5 minutes per IP address.
* **Lightweight:** Minimal footprint to ensure your site remains fast and passes Core Web Vitals.

== Installation ==

1. Upload the `sparrow-email-otp-verification-for-contact-form-7` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Edit your Contact Form 7 form.
4. Add the "Send" button: `<button type="button" class="seov_cf7-send-otp-btn wpcf7-submit">Send OTP</button>`
5. Add your choice of OTP verification tag field layout:
   * For the classic open layout: `[text* sparrow-email-otp placeholder "Enter OTP"]`
   * For the new conditional hidden layout: `[text* sparrow-email-otp conditional_display:yes placeholder "Enter OTP"]`
6. Save your form.

== Frequently Asked Questions ==

= Is this really free to use? =
Yes. As long as your server can send emails, there is no cost to send OTP codes through this plugin.

= How does the rate limiting work? =
To protect your server from being used for mail bombing or automated attacks, the plugin tracks the user's IP address and limits them to 3 OTP requests within a 5-minute window.

= Does it work with "WP Mail SMTP"? =
Absolutely. It routes emails through whatever SMTP provider you have configured in your WordPress dashboard.

== Screenshots ==
1. Admin Setup (Conditional Mode) - How to configure the sparrow-email-otp shortcode tag using the 'conditional_display:yes' attribute in the Contact Form 7 editor.
2. Hidden Initial State - The entire OTP verification layout container remains completely hidden from view when the email field is empty or incomplete.
3. Dynamic Reveal Effect - The OTP input field and action button smoothly animate into view the exact moment a structurally valid email address pattern is typed.
4. Successful OTP Dispatch - A clear, real-time success notice is printed inside the container box immediately after a verification code is sent.
5. Built-In Resend Timer - After sending an OTP, a 60-second cooldown period activates on the action button before transforming into a functional 'Resend OTP' trigger.
6. Backend Error Handling - The validation engine catches incorrect or expired verification codes and prints localized inline error notices beautifully.
7. Anti-Spam Rate Limiting - Built-in security matrices temporarily block excessive requests based on strict client IP transient evaluations if a user abuses the button.
8. Standard Layout Setup - Configuration setup in the admin dashboard for rendering the OTP fields traditionally without the conditional display attribute wrapper.
9. Classic Open Interface - The OTP verification field and button render fully visible directly on the form from initial page load when conditional display is disabled.


== Changelog ==

= 1.1.0 =
* Added dynamic "conditional_display:yes" layout feature parameters.
* Fixed automated box injection structure render hierarchies.
* Isolated multi-form selectors to scale reliably via custom tag filtering pipelines.

= 1.0.0 =
* Initial release.
* Implemented SMTP-based OTP delivery via wp_mail().
* Added IP-based rate limiting for security.
* Added support for multiple forms on a single page.