
/**
 * Wealth Predictor Logic
 * Handles interactive calculations and the custom cursor follower.
 */

const cursor = document.getElementById('cursor');
const inputs = document.querySelectorAll('input');
const display = document.getElementById('totalWealth');

// 1. Smooth Cursor Follower
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// 2. The Calculation Engine
const calculateWealth = () => {
    const P = parseFloat(document.getElementById('principal').value) || 0;
    const PMT = parseFloat(document.getElementById('monthly').value) || 0;
    const t = parseFloat(document.getElementById('years').value) || 0;
    const annualRate = (parseFloat(document.getElementById('rate').value) || 0) / 100;
    
    const r = annualRate / 12; 
    const n = t * 12; 

    let futureValue;

    if (r === 0) {
        futureValue = P + (PMT * n);
    } else {
        // Formula: P(1+r)^n + PMT * [((1+r)^n - 1) / r]
        const compoundPrincipal = P * Math.pow(1 + r, n);
        const compoundSeries = PMT * ((Math.pow(1 + r, n) - 1) / r);
        futureValue = compoundPrincipal + compoundSeries;
    }

    // Formatting as USD Currency
    display.innerText = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
    }).format(futureValue);
};

// 3. Listen for changes on all inputs
inputs.forEach(input => {
    input.addEventListener('input', calculateWealth);
});

// Run once on load to show initial value
calculateWealth();