
// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Email modal functionality
    const emailIcon = document.getElementById('email-icon');
    const emailModal = document.getElementById('email-modal');
    const closeModal = document.getElementById('close-modal');
    const copyEmail = document.getElementById('copy-email');
    
    emailIcon.addEventListener('click', function(e) {
        e.preventDefault();
        emailModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add typing effect to email modal
        const emailCodeLines = emailModal.querySelectorAll('.code-line');
        emailCodeLines.forEach(line => line.style.opacity = '0');
        
        let emailLineIndex = 0;
        const typeEmailLine = () => {
            if (emailLineIndex < emailCodeLines.length) {
                emailCodeLines[emailLineIndex].style.opacity = '1';
                emailCodeLines[emailLineIndex].style.animation = 'fadeInUp 0.3s ease forwards';
                emailLineIndex++;
                setTimeout(typeEmailLine, 150);
            }
        };
        
        setTimeout(typeEmailLine, 200);
    });
    
    closeModal.addEventListener('click', function() {
        emailModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    emailModal.addEventListener('click', function(e) {
        if (e.target === emailModal) {
            emailModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    copyEmail.addEventListener('click', function() {
        const emailText = document.getElementById('email-address').textContent.replace(/"/g, '');
        navigator.clipboard.writeText(emailText).then(function() {
            // Show copy notification
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'Email copied to clipboard!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2500);
        }).catch(function() {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'Email copied to clipboard!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2500);
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (emailModal.style.display === 'block') {
                emailModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
        }
    });
    // Add typing effect to the name
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
    
    // Add typing effect to code editor
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        codeLines.forEach(line => line.style.opacity = '0');
        
        let lineIndex = 0;
        const typeCodeLine = () => {
            if (lineIndex < codeLines.length) {
                codeLines[lineIndex].style.opacity = '1';
                codeLines[lineIndex].style.animation = 'fadeInUp 0.5s ease forwards';
                lineIndex++;
                setTimeout(typeCodeLine, 300);
            }
        };
        
        setTimeout(typeCodeLine, 2000);
    }
    
    // Add glowing effect on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Matrix effect background
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
