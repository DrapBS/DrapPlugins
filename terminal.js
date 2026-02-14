// Terminal Animation Script
const terminalScreen = document.getElementById('terminal-screen');
const commandElement = document.getElementById('terminal-command');
const outputElement = document.getElementById('terminal-output');
const mainContent = document.getElementById('main-content');

const command = 'Show Current Plugins';
let charIndex = 0;

// Type command character by character
function typeCommand() {
    if (charIndex < command.length) {
        commandElement.textContent += command[charIndex];
        charIndex++;
        setTimeout(typeCommand, 80); // سرعة الكتابة
    } else {
        // إخفاء الكيرسور بعد انتهاء الكتابة
        document.querySelector('.cursor').style.display = 'none';
        setTimeout(showExecuted, 500);
    }
}

// Show "Executed" message
function showExecuted() {
    outputElement.innerHTML = '<div class="output-line executed">✓ Executed</div>';
    setTimeout(showLoading, 800);
}

// Show "Loading Plugins..." with animated dots
function showLoading() {
    outputElement.innerHTML = '<div class="output-line loading">Loading Plugins<span class="dots"></span></div>';
    
    // أنيميشن النقاط
    const dotsElement = document.querySelector('.dots');
    let dots = '';
    const dotsInterval = setInterval(() => {
        dots += '.';
        if (dots.length > 3) dots = '';
        dotsElement.textContent = dots;
    }, 400);

    // بعد 2 ثانية، إخفاء التيرمينال وإظهار الموقع
    setTimeout(() => {
        clearInterval(dotsInterval);
        terminalScreen.style.animation = 'fadeOut 0.6s ease-out forwards';
        setTimeout(() => {
            terminalScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.animation = 'fadeIn 0.8s ease-out';
        }, 600);
    }, 2000);
}

// Start the animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeCommand, 500); // تأخير بسيط قبل بدء الكتابة
});

// Start the animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeCommand, 500); // تأخير بسيط قبل بدء الكتابة
});
