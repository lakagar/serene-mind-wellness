interface TherapistResponse {
  text: string;
  category: 'general' | 'feelings' | 'coping' | 'exploration' | 'support' | 'mental-health-info' | 'exercises';
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
  { text: "You've shown a lot of strength in sharing this.", category: 'support' },
  
  // Mental Health Information
  {
    text: "Common mental health conditions include depression, anxiety, bipolar disorder, and PTSD. Would you like to learn more about any specific condition?",
    category: 'mental-health-info'
  },
  {
    text: "Depression symptoms often include persistent sadness, loss of interest in activities, changes in sleep patterns, and difficulty concentrating. If you're experiencing these, please consider speaking with a mental health professional.",
    category: 'mental-health-info'
  },
  {
    text: "Anxiety symptoms can include excessive worry, restlessness, rapid heartbeat, and difficulty sleeping. There are many effective treatments available, including therapy and medication.",
    category: 'mental-health-info'
  },
  {
    text: "PTSD may develop after traumatic experiences and can involve flashbacks, nightmares, and severe anxiety. Professional help is available and effective for managing these symptoms.",
    category: 'mental-health-info'
  },
  {
    text: "Bipolar disorder involves episodes of depression and mania. Symptoms can include extreme mood swings, changes in energy levels, and sleep patterns. Treatment typically includes medication and therapy.",
    category: 'mental-health-info'
  },
  
  // Coping Strategies and Self-Help
  {
    text: "Here are some effective coping strategies: 1) Practice mindfulness and meditation, 2) Maintain a regular sleep schedule, 3) Exercise regularly, 4) Stay connected with supportive people, 5) Set realistic goals and boundaries.",
    category: 'coping'
  },
  {
    text: "Creating a daily routine can help manage mental health. Try to include regular meals, exercise, relaxation time, and social interactions in your schedule.",
    category: 'coping'
  },
  
  // Exercise and Wellness Guidance
  {
    text: "Simple exercises for mental wellness: 1) Deep breathing - inhale for 4 counts, hold for 4, exhale for 4, 2) Progressive muscle relaxation - tense and relax each muscle group, 3) Gentle stretching or yoga, 4) 10-minute walks in nature.",
    category: 'exercises'
  },
  {
    text: "Regular physical activity can significantly improve mental health. Even 15-30 minutes of walking, cycling, or dancing daily can make a difference. Would you like some simple exercise suggestions?",
    category: 'exercises'
  },
  {
    text: "Mindfulness exercise: Take 5 minutes to sit quietly. Focus on your breath. Notice thoughts without judgment and let them pass like clouds in the sky. This can help reduce anxiety and improve focus.",
    category: 'exercises'
  }
];

export const getContextualResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for mental health condition keywords
  if (lowerMessage.includes('depression') || lowerMessage.includes('depressed') || lowerMessage.includes('sad')) {
    return therapistResponses.find(r => 
      r.category === 'mental-health-info' && r.text.toLowerCase().includes('depression')
    )?.text || therapistResponses[0].text;
  }
  
  // Check for anxiety keywords
  if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('panic')) {
    return therapistResponses.find(r => 
      r.category === 'mental-health-info' && r.text.toLowerCase().includes('anxiety')
    )?.text || therapistResponses[0].text;
  }
  
  // Check for exercise/wellness keywords
  if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('physical activity')) {
    return therapistResponses.find(r => r.category === 'exercises')?.text || therapistResponses[0].text;
  }
  
  // Check for coping/self-help keywords
  if (lowerMessage.includes('cope') || lowerMessage.includes('help') || lowerMessage.includes('manage')) {
    return therapistResponses.find(r => r.category === 'coping')?.text || therapistResponses[0].text;
  }
  
  // Check for information seeking keywords
  if (lowerMessage.includes('what is') || lowerMessage.includes('symptoms') || lowerMessage.includes('tell me about')) {
    return therapistResponses.find(r => r.category === 'mental-health-info')?.text || therapistResponses[0].text;
  }
  
  // Default to exploration or general responses
  const defaultResponses = therapistResponses.filter(r => 
    r.category === 'exploration' || r.category === 'general'
  );
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)].text;
};
