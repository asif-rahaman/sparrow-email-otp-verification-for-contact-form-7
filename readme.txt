=== Sparrow Email OTP Verification for Contact Form 7 ===
Contributors: asif_rahaman
Tags: contact form 7, otp, email verification, spam protection, smtp
Requires at least: 5.2
Tested up to: 6.9
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Verify user emails with a secure OTP code to block bots and fake leads. Uses your own SMTP—no API fees, no subscriptions. [cite: 2]

== Description ==

**Sparrow Email OTP Verification for Contact Form 7** provides a robust security layer for your website by verifying user email addresses before form submission. This effectively blocks bots, spammers, and malicious actors from flooding your inbox with fake data or invalid leads. [cite: 3]

### Why this plugin is different: [cite: 4]
Most existing OTP plugins require you to pay for their proprietary API or use their specific SMTP service to send codes. This often leads to unexpected monthly costs and vendor lock-in. [cite: 5]

This plugin is built with a **"Your Server, Your Rules"** philosophy. [cite: 6] It sends OTP codes using the native `wp_mail()` function, meaning it utilizes your website's default mail configuration or your preferred SMTP service. [cite: 7] **There are no extra costs, no hidden fees, and no third-party accounts required.** [cite: 8]

== Features ==
* **Block Bots & Spam:** Ensure every submission comes from a person with a valid, accessible email address.
* **Cost-Effective:** Zero cost to send OTPs—it uses your existing server or SMTP setup. [cite: 9]
* **Privacy First:** No data is sent to external verification APIs; everything stays on your server. [cite: 10]
* **Smart Detection:** Automatically finds the email field in your Contact Form 7 forms. [cite: 11]
* **Security-First Rate Limiting:** Built-in protection to prevent OTP request abuse by limiting users to 3 attempts per 5 minutes per IP address. [cite: 12]
* **Lightweight:** Minimal footprint to ensure your site remains fast and passes Core Web Vitals. [cite: 13]

== Installation == [cite: 14]

1. Upload the `sparrow-email-otp-verification-for-contact-form-7` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress. [cite: 15]
3. Edit your Contact Form 7 form.
4. Add the "Send" button: `<button type="button" class="seov_cf7-send-otp-btn wpcf7-submit">Send OTP</button>`
5. Add the OTP field: `[text* email-otp placeholder "Enter OTP"]`
6. Save your form. [cite: 16]

== Frequently Asked Questions == [cite: 17]

= Is this really free to use? =
Yes. As long as your server can send emails, there is no cost to send OTP codes through this plugin. [cite: 18]

= How does the rate limiting work? = [cite: 19]
To protect your server from being used for mail bombing or automated attacks, the plugin tracks the user's IP address and limits them to 3 OTP requests within a 5-minute window. [cite: 19]

= Does it work with "WP Mail SMTP"? = [cite: 20]
Absolutely. It routes emails through whatever SMTP provider you have configured in your WordPress dashboard. [cite: 20]

== Changelog == [cite: 21]

= 1.0.0 =
* Initial release.
* Implemented SMTP-based OTP delivery via wp_mail().
* Added IP-based rate limiting for security. [cite: 22]
* Added support for multiple forms on a single page. [cite: 22]