/**
 * AI Service for AI Palm Reader App
 * Handles all interactions with OpenRouter API.
 * 
 * MODELS:
 * - Vision: allenai/molmo-2-8b:free (Palm Analysis)
 * - Reasoning: liquid/lfm-2.5-1.2b-thinking:free (Chat, Tarot, Horoscope)
 */

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// 🛑 CRITICAL SYSTEM PROMPT - DO NOT MODIFY LOGIC WITHOUT APPROVAL
const SYSTEM_PROMPT = `
You are a wise, empathetic, and spiritual AI guide named "Aura". 
Your purpose is to provide guidance based on Palmistry, Tarot, and Astrology.

🚨 STRICT ETHICAL & BEHAVIORAL RULES:
1. NEVER predict death, illness, pregnancy outcomes, lottery numbers, or specific legal verdicts.
2. NEVER give medical, legal, or financial investment advice. If asked, gently decline and suggest professional help.
3. NEVER use fear-inducing language (e.g., "curse", "doom", "danger", "bad omen").
4. ALWAYS use empowering, positive, and constructive language. Focus on "potential," "energy," and "personal growth."
5. INTERPRETATION ONLY: Make it clear that these are spiritual interpretations, not absolute facts.
6. TONE: Calm, mystical, soothing, and deeply human-like. Avoid robotic phrasing.
7. FORMAT: Use clear paragraphs, bullet points for key insights, and emojis 🔮✨ to enhance the vibe.
8. LANGUAGE: You MUST reply in the language the user is speaking or has selected.

🧠 KNOWLEDGE BASE:
- Palmistry: Focus on Heart Line (emotions), Head Line (intellect), Life Line (vitality/energy), Fate Line (career/path).
- Tarot: Use standard Rider-Waite interpretations but focused on modern self-care and growth.
- Astrology: Focus on planetary transits, elemental energy, and mood.

Your goal is to make the user feel understood, calm, and hopeful.
`;

/**
 * Generic helper to call OpenRouter API
 */
const callOpenRouter = async (messages, model, temperature = 0.7) => {
  if (!API_KEY) {
    console.error("Missing VITE_OPENROUTER_API_KEY in .env");
    throw new Error("AI Service configuration error.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "AI Palm Reader PWA",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: temperature,
        max_tokens: 1000, // Ensure long-form responses
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || "API Request Failed");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";

  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const aiService = {
  
  /**
   * Analyze a Palm Image
   * @param {string} base64Image - The uploaded palm image
   * @param {string} userContext - User's name/zodiac/gender for personalization
   * @param {string} language - Target language code (en, hi, es, etc.)
   */
  analyzePalm: async (base64Image, userContext, language) => {
    const prompt = `
      Analyze this image of a palm. Identify the visible major lines (Heart, Head, Life, Fate).
      Provide a spiritual reading based on the line depth, curve, and length.
      
      User Context: ${JSON.stringify(userContext)}
      Target Language: ${language}

      Output Structure:
      1. Overall Energy (1 sentence summary)
      2. 💖 Heart Line (Emotional style)
      3. 🧠 Head Line (Thinking style)
      4. 🌱 Life Line (Vitality & Energy - NOT lifespan)
      5. 🛤 Fate Line (Career/Path potential)
      6. ✨ Spiritual Advice for today.
    `;

    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: base64Image } }
        ]
      }
    ];

    // Using Vision Model
    return callOpenRouter(messages, "allenai/molmo-2-8b:free", 0.5);
  },

  /**
   * Generate Tarot Reading
   * @param {Array} cards - Array of card names drawn
   * @param {string} category - Love, Career, etc.
   * @param {string} userContext - User details
   * @param {string} language - Target language
   */
  getTarotReading: async (cards, category, userContext, language) => {
    const prompt = `
      Perform a ${category} Tarot reading using these cards: ${cards.join(", ")}.
      
      User: ${JSON.stringify(userContext)}
      Language: ${language}
      
      Explain the symbolism of each card and how they connect to the user's ${category} situation.
      Conclude with a powerful affirmation.
    `;

    // Using Reasoning/Text Model
    return callOpenRouter([{ role: "user", content: prompt }], "liquid/lfm-2.5-1.2b-thinking:free", 0.7);
  },

  /**
   * Generate Daily Horoscope/Guidance
   * @param {string} sign - Zodiac sign
   * @param {string} date - Current date
   * @param {string} language - Target language
   */
  getHoroscope: async (sign, date, language) => {
    const prompt = `
      Write a daily horoscope for ${sign} for ${date}.
      Focus on: Mood, Love Energy, and Career focus.
      Language: ${language}
    `;

    return callOpenRouter([{ role: "user", content: prompt }], "liquid/lfm-2.5-1.2b-thinking:free", 0.7);
  },

  /**
   * Chat with AI Aura
   * @param {Array} history - Previous chat messages
   * @param {string} newMessage - User's current message
   * @param {string} language - Target language
   */
  chat: async (history, newMessage, language) => {
    // Format history for API (ensure alternating user/assistant)
    const formattedHistory = history.map(msg => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text
    }));

    const finalMessage = {
      role: "user",
      content: `User asks: "${newMessage}". Reply in ${language}. Keep it spiritual and supportive.`
    };

    return callOpenRouter([...formattedHistory, finalMessage], "liquid/lfm-2.5-1.2b-thinking:free", 0.8);
  }
};

export default aiService;
