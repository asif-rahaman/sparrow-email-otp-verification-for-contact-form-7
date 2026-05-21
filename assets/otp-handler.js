document.addEventListener('DOMContentLoaded', function() {
    const sendButtons = document.querySelectorAll('.seov_cf7-send-otp-btn');
    
    sendButtons.forEach(function(sendBtn) {
        // Create a unique message container for this specific button
        const msgContainer = document.createElement('div');
        msgContainer.className = 'seov_cf7-otp-response';
        msgContainer.style.marginTop = '10px';
        sendBtn.parentNode.insertBefore(msgContainer, sendBtn.nextSibling);

        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            msgContainer.innerHTML = ''; 
            
            // Scope the search to the current form only
            const form = sendBtn.closest('form');
            const emailField = form.querySelector('input[type=\"email\"]');
            const email = emailField ? emailField.value : '';

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