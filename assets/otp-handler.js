document.addEventListener('DOMContentLoaded', function() {
    /**
     * NEW V1.1.0 FEATURE: Dynamic Wrapper Isolation
     * Automatically search for any native Contact Form 7 email fields and set up 
     * the conditionally hidden wrapper box layout.
     */
    const emailFields = document.querySelectorAll('.wpcf7-form input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailFields.forEach(function(emailInput) {
        const form = emailInput.closest('form');
        if (!form) return;

        // Locate the elements inside this specific isolated form layout
        const sendBtn = form.querySelector('.seov_cf7-send-otp-btn');
        const otpField = form.querySelector('input[name="sparrow-email-otp"]');
        
        // Skip setup if the specific form does not use the sparrow OTP field element
        if (!sendBtn || !otpField) return;

        // Find or create the dynamic container box wrapping both elements
        let otpBox = form.querySelector('.sparrow-otp-box');
        if (!otpBox) {
            otpBox = document.createElement('div');
            otpBox.className = 'sparrow-otp-box';
            
            /**
             * Clean inline styles matching modern dashboard UI aesthetics.
             * You can customize these styles or shift them to a CSS file.
             */
            otpBox.style.display = 'none';
            otpBox.style.marginTop = '15px';
            otpBox.style.padding = '15px';
            otpBox.style.border = '1px solid #e2e8f0';
            otpBox.style.borderRadius = '6px';
            otpBox.style.backgroundColor = '#f8fafc';
            
            // Append smooth fade/slide css transition logic
            otpBox.style.opacity = '0';
            otpBox.style.transform = 'translateY(-10px)';
            otpBox.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

            // Insert the box right before the send button's parent structure 
            sendBtn.parentNode.insertBefore(otpBox, sendBtn);
            
            // Move the elements inside our clean wrapper box
            otpBox.appendChild(sendBtn);
            if (otpField.closest('label')) {
                otpBox.appendChild(otpField.closest('label'));
            } else {
                otpBox.appendChild(otpField);
            }
        }

        // Create a unique message container specifically inside this dynamic wrapper box
        let msgContainer = otpBox.querySelector('.seov_cf7-otp-response');
        if (!msgContainer) {
            msgContainer = document.createElement('div');
            msgContainer.className = 'seov_cf7-otp-response';
            msgContainer.style.marginTop = '10px';
            otpBox.appendChild(msgContainer);
        }

        /**
         * Real-time validation listener to show/hide the dynamic container box
         */
        emailInput.addEventListener('input', function() {
            const emailValue = emailInput.value.trim();

            if (emailRegex.test(emailValue)) {
                // Show the box smoothly using standard transitions
                otpBox.style.display = 'block';
                setTimeout(() => {
                    otpBox.style.opacity = '1';
                    otpBox.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Instantly hide the box if email text becomes empty or malformed
                otpBox.style.opacity = '0';
                otpBox.style.transform = 'translateY(-10px)';
                otpBox.style.display = 'none';
                
                // Flush stale backend warning strings
                msgContainer.innerHTML = ''; 
            }
        });

        /**
         * Handle the core AJAX pipeline execution request trigger
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