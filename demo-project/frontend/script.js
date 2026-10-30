let currentLanguage = null;
let chatHistory = [];
let userBudget = null;
let userLocation = null;
let conversationStep = 0; // Tracks fallback progression

window.addEventListener('load', () => {
    setTimeout(() => {
        const notif = document.getElementById('notifDot');
        if(notif) notif.style.display = 'flex';
    }, 2000);
});

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const notifDot = document.getElementById('notifDot');
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && notifDot) {
        notifDot.style.display = 'none';
    }
}

function toggleLang() {
    const enElements = document.querySelectorAll('.en');
    const arElements = document.querySelectorAll('.ar');
    const langBtn = document.querySelector('.lang-btn');
    let isEnglish = enElements[0].style.display !== 'none';
    
    if (isEnglish) {
        enElements.forEach(el => el.style.display = 'none');
        arElements.forEach(el => el.style.display = 'block');
        langBtn.textContent = 'English';
        document.body.dir = 'rtl';
    } else {
        enElements.forEach(el => el.style.display = 'block');
        arElements.forEach(el => el.style.display = 'none');
        langBtn.textContent = 'عربي';
        document.body.dir = 'ltr';
    }
}

async function selectLanguage(lang) {
    currentLanguage = lang;
    const chatBody = document.getElementById('chatBody');
    
    // Show Connecting Animation
    chatBody.innerHTML = `
        <div class="connecting-state">
            <div class="spinner"></div>
            <span class="en">Connecting you to Zara...</span>
            <span class="ar" style="display:none;">جاري توصيلك بـ زارا...</span>
        </div>
    `;

    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

    // Clear connecting state and enable inputs
    chatBody.innerHTML = '';
    const inputEn = document.getElementById('chatInput');
    const inputAr = document.getElementById('chatInputAr');
    const btnEn = document.getElementById('sendBtn');
    const btnAr = document.getElementById('sendBtnAr');

    if (lang === 'en') {
        inputEn.disabled = false;
        btnEn.disabled = false;
        inputEn.focus();
        // NEW WARMER MESSAGE
        simulateBotResponse("Hey there! Welcome. I am Zara, the property manager. Delighted to connect with you. What kind of property are you looking for?");
    } else {
        inputAr.style.display = 'block';
        btnAr.style.display = 'block';
        inputEn.style.display = 'none';
        btnEn.style.display = 'none';
        inputAr.disabled = false;
        btnAr.disabled = false;
        inputAr.focus();
        // NEW WARMER ARABIC MESSAGE
        simulateBotResponse("أهلاً بك في صفقة الأعمال. أنا زارا، مديرة العقارات. سواء كنت تبحث عن منزل جديد أو استثمار، يسعدني مساعدتك. ما نوع العقار الذي تبحث عنه اليوم؟");
    }
}

function addMessage(sender, text) {
    const chatBody = document.getElementById('chatBody');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const formattedText = text.replace(/\n/g, '<br>');
    
    let metaHtml = '';
    if (sender === 'user') {
        // Single check for Sent
        metaHtml = `
            <div class="message-meta" id="meta-${Date.now()}">
                <span class="time">Just now</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
        `;
    }

    msgDiv.innerHTML = `<div class="bubble">${formattedText}</div>${metaHtml}`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    return msgDiv;
}

async function simulateBotResponse(text) {
    const chatBody = document.getElementById('chatBody');
    
    // 1. Wait 2-3 seconds to simulate Zara reading/thinking
    const thinkDelay = Math.floor(Math.random() * 1000) + 2000;
    await new Promise(resolve => setTimeout(resolve, thinkDelay));

    // 2. Show Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. Calculate typing time based on text length (approx 40ms per character)
    const typeDelay = (text.length * 40) + 800;
    await new Promise(resolve => setTimeout(resolve, typeDelay));
    
    // 4. Remove typing and show message
    document.getElementById('typing-indicator').remove();
    addMessage('bot', text);
}

async function sendMessage() {
    const input = currentLanguage === 'en' ? document.getElementById('chatInput') : document.getElementById('chatInputAr');
    const text = input.value.trim();
    
    if (!text || !currentLanguage) return;
    
    input.value = '';
    
    // Add user message
    const userMsgNode = addMessage('user', text);
    const metaNode = userMsgNode.querySelector('.message-meta svg');

    // Simulate Zara reading the message after 1.5 seconds
    setTimeout(() => {
        if (metaNode) {
            metaNode.classList.add('read-mark');
            // Change to double check for Read
            metaNode.innerHTML = `<polyline points="18 6 7 17 2 12"></polyline><polyline points="22 6 11 17 6 12"></polyline>`;
        }
    }, 1500);

    if (text.match(/\d+/)) userBudget = text;
    if (text.toLowerCase().includes('riyadh') || text.includes('الرياض')) userLocation = 'Riyadh';

    try {
        console.log("Attempting to connect to backend...");
        const response = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                history: chatHistory,
                language: currentLanguage
            })
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        
        if (data.reply) {
            await simulateBotResponse(data.reply);
            chatHistory.push({ role: 'user', content: text });
            chatHistory.push({ role: 'assistant', content: data.reply });
            if (chatHistory.length > 12) chatHistory = chatHistory.slice(-12);
        }

    } catch (error) {
        console.log("Backend offline. Using exact transcript fallback.");
        
        // Exact conversation flow provided by user
        const fallbacksEn = [
            "I'd be glad to help. Are you looking for a villa or a floor, and which area of Riyadh interests you most?",
            "Great choice. We currently have two villas available at The Royal Al Munsiyah in Riyadh, priced at 4,100,000 SAR with smart home and solar power features. Is this for your primary residence or an investment?",
            "Excellent, Al Munsiyah is a strong rental area. Would you like me to connect you with our sales team to discuss the investment potential and arrange a site visit?",
            "Perfect. Could I get your name and phone number so our sales team can reach out to you?",
            "Thank you. Our sales team will contact you shortly to arrange your site visit to The Royal Al Munsiyah. Is there a preferred day or time that works best for you?",
            "Noted. Our team will confirm the appointment with you. Is there anything else I can help you with before then?",
            "Thank you. We look forward to seeing you. Have a wonderful day."
        ];

        const fallbacksAr = [
            "سأكون سعيداً بمساعدتك. هل تبحث عن فيلا أم دور، وفي أي منطقة من الرياض يهمك؟",
            "خيار رائع. لدينا حالياً فيلتان متاحتان في ذا رويال المونسية بالرياض، بسعر 4,100,000 ريال مع ميزات المنزل الذكي والطاقة الشمسية. هل هذا لسكنك الأساسي أم للاستثمار؟",
            "ممتاز، المونسية منطقة قوية للإيجار. هل ترغب في توصيلك بفريق المبيعات لدينا لمناقشة إمكانات الاستثمار وترتيب زيارة للموقع؟",
            "ممتاز. هل يمكنني الحصول على اسمك ورقم هاتفك حتى يتمكن فريق المبيعات لدينا من التواصل معك؟",
            "شكراً لك. سيتواصل فريق المبيعات لدينا معك قريباً لترتيب زيارتك للموقع في ذا رويال المونسية. هل هناك يوم أو وقت مفضل يناسبك؟",
            "تم الملاحظة. سيؤكد فريقنا الموعد معك. هل هناك أي شيء آخر يمكنني مساعدتك به قبل ذلك؟",
            "شكراً لك. نتطلع لرؤيتك. أتمنى لك يوماً رائعاً."
        ];

        // Prevent step from going out of bounds
        if (conversationStep >= fallbacksEn.length) {
            conversationStep = fallbacksEn.length - 1;
        }

        const reply = currentLanguage === 'en' ? fallbacksEn[conversationStep] : fallbacksAr[conversationStep];
        conversationStep++; // Move to next step for the next message

        await simulateBotResponse(reply);
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: reply });
    }
}

document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});
document.getElementById('chatInputAr').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});