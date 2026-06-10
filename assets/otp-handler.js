document.addEventListener('DOMContentLoaded', function() {
    /**
     * NEW V1.1.0 FEATURE: Conditional Layout Engine
     * Automatically scan for any native Contact Form 7 email fields and evaluate 
     * if conditional display parameters are enabled on the target inputs.
     */
    const emailFields = document.querySelectorAll('.wpcf7-form input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailFields.forEach(function(emailInput) {
        const form = emailInput.closest('form');
        if (!form) return;

        // Locate target elements inside this specific isolated form layout
        const sendBtn = form.querySelector('.seov_cf7-send-otp-btn');
        const otpField = form.querySelector('input[name="sparrow-email-otp"]');
        
        // Skip setup if the current form does not use the sparrow OTP field element
        if (!sendBtn || !otpField) return;

        let msgContainer;

        /**
         * FIX: Check directly for the generated HTML attribute 'data-conditional="yes"'
         * on the specific field tag rather than relying on global localized variables.
         */
        if (otpField.getAttribute('data-conditional') === 'yes') {
            let otpBox = form.querySelector('.sparrow-otp-box');
            if (!otpBox) {
                // Build the container wrapper element dynamically
                otpBox = document.createElement('div');
                otpBox.className = 'sparrow-otp-box';
                
                // Set default aesthetic wrapping block styles
                otpBox.style.display = 'none';
                otpBox.style.marginTop = '15px';
                otpBox.style.padding = '15px';
                otpBox.style.border = '1px solid #e2e8f0';
                otpBox.style.borderRadius = '6px';
                otpBox.style.backgroundColor = '#f8fafc';
                
                // Configure smooth deployment hardware-accelerated transitions
                otpBox.style.opacity = '0';
                otpBox.style.transform = 'translateY(-10px)';
                otpBox.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                // Insert the wrapper box right where the target elements live
                if (otpField.closest('label')) {
                    sendBtn.parentNode.insertBefore(otpBox, otpField.closest('label'));
                } else {
                    sendBtn.parentNode.insertBefore(otpBox, otpField);
                }
                
                // V1.1.1 ORDER CORRECTION: Place the OTP Input field FIRST inside the layout box
                if (otpField.closest('label')) {
                    otpBox.appendChild(otpField.closest('label'));
                } else {
                    otpBox.appendChild(otpField);
                }
                
                // V1.1.1 ORDER CORRECTION: Place the action button SECOND (rendering right underneath)
                sendBtn.style.marginTop = '12px';
                sendBtn.style.display = 'block';
                otpBox.appendChild(sendBtn);
            }

            // Route notifications to render directly inside our custom isolated container wrapper
            msgContainer = otpBox.querySelector('.seov_cf7-otp-response');
            if (!msgContainer) {
                msgContainer = document.createElement('div');
                msgContainer.className = 'seov_cf7-otp-response';
                msgContainer.style.marginTop = '10px';
                otpBox.appendChild(msgContainer);
            }

            // Bind real-time contextual validation input tracker monitors
            emailInput.addEventListener('input', function() {
                const emailValue = emailInput.value.trim();

                if (emailRegex.test(emailValue)) {
                    // Smoothly animate the container wrapper box into active view
                    otpBox.style.display = 'block';
                    setTimeout(() => {
                        otpBox.style.opacity = '1';
                        otpBox.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Immediately pull out and hide layout elements if the address breaks or vanishes
                    otpBox.style.opacity = '0';
                    otpBox.style.transform = 'translateY(-10px)';
                    otpBox.style.display = 'none';
                    msgContainer.innerHTML = ''; 
                }
            });

        /**
         * MODE 2: CLASSIC DISPLAY LOGIC (Fallback Default)
         * Runs if shortcode attribute is completely missing. Layout remains visible on load.
         */
        } else {
            // Append default runtime inline notices right behind the standard action button node
            msgContainer = form.querySelector('.seov_cf7-otp-response');
            if (!msgContainer) {
                msgContainer = document.createElement('div');
                msgContainer.className = 'seov_cf7-otp-response';
                msgContainer.style.marginTop = '10px';
                sendBtn.parentNode.insertBefore(msgContainer, sendBtn.nextSibling);
            }
        }

        /**
         * Core AJAX Network Pipeline Request Execution Trigger
         */
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            msgContainer.innerHTML = ''; 
            
            const email = emailInput ? emailInput.value.trim() : '';

            if (!email || !email.includes('@')) {
                showOtpMsg(msgContainer, seov_cf7_obj.msg_invalid_email, 'error');
                return;
            }

            const originalText = sendBtn.innerText;
            sendBtn.innerText = seov_cf7_obj.msg_sending;
            sendBtn.disabled = true;

            const formData = new URLSearchParams();
            formData.append('action', 'seov_cf7_send_otp');
            formData.append('email', email);
            formData.append('security', seov_cf7_obj.nonce);

            fetch(seov_cf7_obj.ajax_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showOtpMsg(msgContainer, data.data, 'success');
                    startTimer(sendBtn, 60);
                } else {
                    showOtpMsg(msgContainer, data.data, 'error');
                    sendBtn.innerText = originalText;
                    sendBtn.disabled = false;
                }
            })
            .catch(() => {
                sendBtn.disabled = false;
                sendBtn.innerText = originalText;
            });
        });
    });

    function showOtpMsg(container, text, type) {
        const color = type === 'success' ? '#008a20' : '#dc3232';
        container.innerHTML = `<span style="color: ${color}; font-size: 0.9em; font-weight: bold;">${text}</span>`;
    }

    function startTimer(btn, seconds) {
        let timeLeft = seconds;
        const timer = setInterval(() => {
            timeLeft--;
            btn.innerText = `${seov_cf7_obj.msg_wait} ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                btn.innerText = seov_cf7_obj.msg_resend;
                btn.disabled = false;
            }
        }, 1000);
    }
});