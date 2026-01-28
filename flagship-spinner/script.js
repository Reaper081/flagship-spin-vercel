const agents = {
    "JOKER": { img: "assets/JOKER (1).png", color: "#a855f7", spec: "VOLATILITY TRADING" },
    "SINGULARITY": { img: "assets/SINGULARITY (1).png", color: "#00d2ff", spec: "AI INFRASTRUCTURE" },
    "DEFI": { img: "assets/DEFI (1).png", color: "#22c55e", spec: "YIELD FARMING" },
    "BASE": { img: "assets/BASE(1).png", color: "#2563eb", spec: "BASE ECOSYSTEM" }
};

const questions = [
    { q: "MARKET STRATEGY?", opts: [{ t: "Ride the Chaos & Memes", a: "JOKER" }, { t: "Data-Driven & AI", a: "SINGULARITY" }, { t: "Staking & Yields", a: "DEFI" }, { t: "Onchain Exploration", a: "BASE" }]},
    { q: "RISK APPETITE?", opts: [{ t: "All or Nothing (100x)", a: "JOKER" }, { t: "Calculated Tech Bet", a: "SINGULARITY" }, { t: "Low Risk, High TVL", a: "DEFI" }, { t: "Early Adopter Alpha", a: "BASE" }]},
    { q: "PREFERRED TOOL?", opts: [{ t: "Telegram Snipers", a: "JOKER" }, { t: "Neural Networks", a: "SINGULARITY" }, { t: "Liquidity Pools", a: "DEFI" }, { t: "Layer 2 Bridges", a: "BASE" }]},
    { q: "END GOAL?", opts: [{ t: "Retire Overnight", a: "JOKER" }, { t: "The Singularity", a: "SINGULARITY" }, { t: "Passive Income", a: "DEFI" }, { t: "Mass Adoption", a: "BASE" }]},
    { q: "SOCIAL SIGNAL?", opts: [{ t: "Trending on X", a: "JOKER" }, { t: "GitHub Commits", a: "SINGULARITY" }, { t: "Protocol Revenue", a: "DEFI" }, { t: "Mint Numbers", a: "BASE" }]}
];

let step = 0;
let score = { JOKER: 0, SINGULARITY: 0, DEFI: 0, BASE: 0 };
let userHandle = "";

function startQuiz() {
    const inputField = document.getElementById("username");
    const errorMsg = document.getElementById("error-msg");
    let rawInput = inputField.value.trim();
    if (rawInput.startsWith("@")) rawInput = rawInput.substring(1);
    
    if (!rawInput) {
        alert("SYSTEM ERROR: Handle required.");
        return;
    }

    const storageKey = "flagship_vFinal_Pro_Locked_" + rawInput; 
    if (localStorage.getItem(storageKey)) {
        inputField.classList.add("input-error");
        errorMsg.innerText = `ERROR: @${rawInput} ALREADY MINTED.`;
        errorMsg.classList.remove("hidden");
        return;
    }

    userHandle = rawInput;
    inputField.classList.remove("input-error");
    errorMsg.classList.add("hidden");
    showView("view-quiz");
    loadQuestion();
}

function loadQuestion() {
    const q = questions[step];
    document.getElementById("q-text").innerText = q.q;
    document.getElementById("step-num").innerText = step + 1;
    const pct = ((step + 1) / questions.length) * 100;
    document.getElementById("progress-fill").style.width = `${pct}%`;
    const grid = document.getElementById("q-options");
    grid.innerHTML = ""; 
    
    q.opts.forEach((opt) => {
        const btn = document.createElement("div");
        btn.className = "opt-btn";
        btn.innerHTML = `<span class="bracket">[</span> ${opt.t} <span class="bracket">]</span>`;
        btn.onclick = () => { 
            btn.classList.add("selected");
            setTimeout(() => { score[opt.a]++; nextStep(); }, 200);
        };
        grid.appendChild(btn);
    });
}

function nextStep() {
    step++;
    if (step < questions.length) loadQuestion();
    else triggerSlotMachine();
}

async function triggerSlotMachine() {
    showView("view-spin");
    const slotText = document.getElementById("slot-text");
    const agentNames = Object.keys(agents);
    const spinInterval = setInterval(() => {
        slotText.innerText = agentNames[Math.floor(Math.random() * agentNames.length)];
    }, 50);

    let globalId = Math.floor(Math.random() * 8888 + 1111).toString();

    setTimeout(() => {
        clearInterval(spinInterval);
        const winner = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
        slotText.innerText = winner;
        slotText.style.color = agents[winner].color;
        
        localStorage.setItem("flagship_vFinal_Pro_Locked_" + userHandle, "true");
        setTimeout(() => renderCard(winner, globalId), 800);
    }, 2500);
}

function renderCard(agentKey, id) {
    showView("view-card");
    const data = agents[agentKey];
    
    document.getElementById("card-id").innerText = `#${id}`;
    document.getElementById("card-agent-name").innerText = agentKey;
    document.getElementById("card-agent-name").style.color = data.color;
    document.getElementById("card-img").src = data.img;
    document.getElementById("card-user").innerText = `@${userHandle}`;
    document.getElementById("card-spec").innerText = data.spec;

    const bioTemplates = {
        "JOKER": "Subject exhibits chaotic trading patterns. High probability of meme-coin leverage and social-driven entry points.",
        "SINGULARITY": "Subject prioritizes technological fundamentals. Portfolio weighted towards AI infrastructure and compute layers.",
        "DEFI": "Subject is a yield maximizer. Capital efficiency and staking rewards are primary drivers.",
        "BASE": "Subject is an ecosystem loyalist. Heavy on-chain footprint within the Base L2 network."
    };
    document.getElementById("card-bio").innerText = bioTemplates[agentKey];

    const card = document.getElementById("final-card");
    card.style.borderColor = data.color;
    document.querySelector(".brand-tag").style.color = data.color;
}

function downloadCard() {
    const card = document.getElementById("final-card");
    const el = document.getElementById("capture-area");
    
    // Switch to clean shape mode before capture
    card.classList.add("download-mode");

    html2canvas(el, { 
        backgroundColor: null, 
        scale: 3, 
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY
    }).then(canvas => {
        const a = document.createElement("a");
        a.download = `Flagship_Agent_${userHandle}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
        
        // Return to cool browser UI mode
        card.classList.remove("download-mode");
    });
}

function showView(id) {
    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function restartSystem() {
    location.reload();
}