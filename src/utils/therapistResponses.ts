
interface TherapistResponse {
  text: string;
  category: 'general' | 'feelings' | 'coping' | 'exploration' | 'support';
}

export const therapistResponses: TherapistResponse[] = [
  // General responses
  { text: "How are you feeling today?", category: 'general' },
  { text: "Thank you for sharing that with me.", category: 'general' },
  { text: "I'm here to listen and support you.", category: 'general' },
  
  // Feeling-focused responses
  { text: "That sounds really challenging. Can you tell me more about how that makes you feel?", category: 'feelings' },
  { text: "It's completely normal to feel that way. Would you like to explore these feelings further?", category: 'feelings' },
  { text: "I hear how difficult this is for you. How long have you been feeling this way?", category: 'feelings' },
  
  // Coping-focused responses
  { text: "What coping strategies have you found helpful in the past?", category: 'coping' },
  { text: "Let's explore some ways to help you manage these feelings. What would feel most helpful right now?", category: 'coping' },
  { text: "Have you tried any relaxation techniques when you feel this way?", category: 'coping' },
  
  // Exploration responses
  { text: "How does this situation affect your daily life?", category: 'exploration' },
  { text: "Can you tell me more about when you first noticed this?", category: 'exploration' },
  { text: "What changes would you like to see in your life regarding this?", category: 'exploration' },
  
  // Support-focused responses
  { text: "You're taking an important step by talking about this.", category: 'support' },
  { text: "I want you to know that your feelings are valid.", category: 'support' },
  { text: "You've shown a lot of strength in sharing this.", category: 'support' }
];

export const getContextualResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for emotional keywords
  if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('unhappy')) {
    return therapistResponses.find(r => r.category === 'feelings')?.text || therapistResponses[0].text;
  }
  
  // Check for anxiety/stress keywords
  if (lowerMessage.includes('anxious') || lowerMessage.includes('stressed') || lowerMessage.includes('worried')) {
    return therapistResponses.find(r => r.category === 'coping')?.text || therapistResponses[0].text;
  }
  
  // Check for help-seeking keywords
  if (lowerMessage.includes('help') || lowerMessage.includes('advice') || lowerMessage.includes('suggestion')) {
    return therapistResponses.find(r => r.category === 'support')?.text || therapistResponses[0].text;
  }
  
  // Default to exploration or general responses
  const defaultResponses = therapistResponses.filter(r => 
    r.category === 'exploration' || r.category === 'general'
  );
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)].text;
};
