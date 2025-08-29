const TOKEN_ICON_BASE = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';
const PRICES_API = 'https://interview.switcheo.com/prices.json';

const appEl = document.createElement("div");
appEl.className = "app-container";
document.body.appendChild(appEl);

// --- Utility functions ---

function tokenIcon(token) {
    return `${TOKEN_ICON_BASE}${token}.svg`;
}

function makeSelect(tokens, selected, onChange) {
    const select = document.createElement('select');
    select.className = 'token-select';
    tokens.forEach(token => {
        const option = document.createElement('option');
        option.value = token;
        option.innerText = token;
        select.appendChild(option);
    });
    select.value = selected;
    select.addEventListener('change', e => onChange(e.target.value));
    return select;
}

function makeTokenSelector(tokens, selected, onChange) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '6px';

    const img = document.createElement('img');
    img.src = tokenIcon(selected);
    img.className = 'token-img';
    // Fallback to default if icon fails to load
    img.onerror = function() {
        img.src = 'https://via.placeholder.com/28?text=?';
    };
    wrapper.appendChild(img);

    const select = makeSelect(tokens, selected, t => {
        img.src = tokenIcon(t);
        onChange(t);
    });
    wrapper.appendChild(select);

    return wrapper;
}

function formatAmount(val) {
    return (Math.floor(val * 1000000) / 1000000).toLocaleString(undefined, {
        maximumFractionDigits: 6,
    });
}

// --- State ---
let tokens = [];
let prices = {};
let from = '';
let to = '';
let amount = '';
let error = '';
let loading = false;

// --- Main UI ---
function renderSwapForm() {
    appEl.innerHTML = '';
    const swapBox = document.createElement('div');
    swapBox.className = 'swap-box';

    swapBox.innerHTML = `<h2>Currency Swap</h2>`;
    // Token selectors - FROM row
    const tokenRow1 = document.createElement('div');
    tokenRow1.className = 'token-row';
    let amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.min = '0';
    amountInput.placeholder = 'Amount';
    amountInput.value = amount;
    amountInput.className = 'amount-input';

    tokenRow1.appendChild(makeTokenSelector(tokens, from, t => {
        from = t;
        if (from === to) {
            // Select next available token for 'to'
            to = tokens.find(tok => tok !== t) || t;
        }
        validate();
        renderSwapForm();
    }));
    tokenRow1.appendChild(amountInput);

    // Swap arrow
    const swapArrow = document.createElement('div');
    swapArrow.className = 'swap-arrow';
    swapArrow.innerHTML = '&#x21C5;';
    swapArrow.title = "Swap directions";
    swapArrow.addEventListener('click', () => {
        [from, to] = [to, from];
        amount = '';
        error = '';
        renderSwapForm();
    });

    // Token selectors - TO row
    const tokenRow2 = document.createElement('div');
    tokenRow2.className = 'token-row';
    const outputDiv = document.createElement('div');

    outputDiv.className = 'output-value';
    outputDiv.innerText = getOutput() ? formatAmount(getOutput()) : '--';

    tokenRow2.appendChild(makeTokenSelector(tokens, to, t => {
        to = t;
        if (from === to) {
            from = tokens.find(tok => tok !== t) || t;
        }
        validate();
        renderSwapForm();
    }));
    tokenRow2.appendChild(outputDiv);

    swapBox.appendChild(tokenRow1);
    swapBox.appendChild(swapArrow);
    swapBox.appendChild(tokenRow2);

    // Amount input event
    amountInput.addEventListener('input', (e) => {
        amount = e.target.value;
        validate();
        renderSwapForm();
    });

    // Error message
    if (error) {
        const errDiv = document.createElement('div');
        errDiv.className = 'error-message';
        errDiv.innerText = error;
        swapBox.appendChild(errDiv);
    }

    // Submit button
    const btn = document.createElement('button');
    btn.className = 'swap-btn';
    btn.innerText = loading ? 'Resetting...' : 'Reset';
    btn.disabled = !!error || !amount || loading;
    btn.addEventListener('click', () => {
        if (validate() !== true) return;
        loading = true;
        renderSwapForm();
        setTimeout(() => {
            loading = false;
            amount = '';
            renderSwapForm();
            swapBox.appendChild(successMsg('Swap Successful!'));
        }, 800 + Math.random() * 500);
    });
    swapBox.appendChild(btn);

    appEl.appendChild(swapBox);
}

// --- Business logic helpers ---

function validate() {
    error = '';
    if (!Number(amount) || Number(amount) <= 0) {
        error = 'Enter a valid amount';
    } else if (from === to) {
        error = 'Tokens must differ';
    } else if (!(from in prices) || !(to in prices)) {
        error = 'Token price unavailable';
    }
    return !error || error === '' ? true : false;
}

function getOutput() {
    if (!(from in prices) || !(to in prices)) return '';
    if (!Number(amount)) return '';
    return (Number(amount) * prices[from]) / prices[to];
}

function successMsg(text) {
    const div = document.createElement('div');
    div.style.color = '#22965f';
    div.style.textAlign = 'center';
    div.style.fontWeight = 'bold';
    div.style.marginTop = '13px';
    div.innerText = text;
    return div;
}

// --- API fetch ---
async function fetchPrices() {
    try {
        const resp = await fetch(PRICES_API);
        const result = await resp.json();
        prices = {};
        tokens = [];
        result.forEach(p => {
            if (p.price != null && p.currency) {
                prices[p.currency] = Number(p.price);
                tokens.push(p.currency);
            }
        });
        tokens.sort();
        if (tokens.length > 1) {
            from = tokens[0];
            to = tokens[1];
        }
        renderSwapForm();
    } catch (err) {
        appEl.innerHTML = '<div style="color:red;padding:2em;">Failed to load prices. Please try again later.</div>';
    }
}

fetchPrices();