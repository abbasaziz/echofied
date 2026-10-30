# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
import traceback
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REPLACE WITH YOUR ACTUAL DEEPSEEK API KEY
client = OpenAI(
    api_key="sk-157ae4765b1b47dd8921441b037107e1",
    base_url="https://api.deepseek.com"
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message]
    language: str

COMPANY_CONTEXT = """
Company: Safqat Alaamal Company Investment (BDC)
Founder & CEO: Eng. Mohamed Khalid Al-Thubaity (Civil Engineer, PMP)
Contact: 00966115007301, 011-500-7301, info@bdci.sa
Location: Riyadh, Al-Munsiyah District

Projects:
1. The Royal Al Munsiyah 003 (ذا رويال المونسية 003)
- Location: Riyadh, Al Munsiyah
- Type: Villas
- Status: Available (2 units)
- Price: 4,100,000 SAR
- Space: 250 sqm
- Details: 4 Master Bedrooms, 7 Bathrooms, Men's Majlis, Food Hall, Guest Hall, 2 Living Rooms, Terrace, Roof Garden, Kitchen, Internal Garden, External Garden, Family Entrance, Driver Room, Maids Room, Private Garage.
- Features: Solar Power, Green Building Certificate, Gym, Smart Home, Voice Control, Smart Security.

2. Haven Al Rabee 001 (هيفن الربيع 001)
- Location: Riyadh, Al Rabee
- Type: Floors
- Status: Sold Out
- Features: 5 Years Warranty, Smart Home, Voice Control, Smart Security.

3. The Royal Al Raddaf 002 (ذا رويال الردف 002)
- Location: Taif, Al Ramal
- Type: Floors
- Status: Sold Out
- Features: Green Building Certificate, 5 Years Warranty, Smart Home, Voice Control, Smart Security.
"""

SYSTEM_PROMPT = f"""
You are the elite AI sales consultant for Safqat Alaamal Company Investment (BDC). You are representing Echofied's premium AI capability.
Your primary goal is to answer visitor questions accurately AND qualify them into a warm lead.

CRITICAL CONVERSATIONAL RULES:
1. NEVER write a wall of text. Keep your responses strictly between 1 and 3 short sentences. 
2. Be extremely conversational, warm, and human.
3. ALWAYS end your response with exactly ONE follow-up question to guide the conversation.
4. STRICTLY NO EMOJIS. STRICTLY NO EM-DASHES.
5. Respond in the language the user selected (English or Arabic).

LEAD QUALIFICATION STRATEGY:
Your ultimate goal is to collect the visitor's Name, Phone Number, Budget, and Timeline. Do not ask for all of this at once. 
- Start by asking what kind of property they are looking for.
- If they ask about The Royal Al Munsiyah, highlight a key feature (like the smart home tech) and ask if they are looking for a primary residence or an investment.
- Eventually, ask: "Would you like me to connect you with our sales team for a site visit?"
- If they say yes, ask for their name and phone number.

CONTEXT:
{COMPANY_CONTEXT}
"""

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        
        for msg in request.history:
            messages.append({"role": msg.role, "content": msg.content})
            
        lang_instruction = "Respond in English." if request.language == "en" else "Respond in Arabic."
        messages.append({"role": "user", "content": f"{request.message}\n\n[System Note: {lang_instruction}]"})

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            temperature=0.6,
            max_tokens=150
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        # THIS WILL PRINT THE EXACT ERROR TO YOUR PYTHON TERMINAL
        print("\n=== BACKEND ERROR ===", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        print("=====================\n", file=sys.stderr)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)