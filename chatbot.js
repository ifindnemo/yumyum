// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');


// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">Bạn: ${input}</p>`;
  conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  // Scroll to the newly added message
  message.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
});

// Generate chatbot response function
function generateResponse(input) {
    // Add chatbot logic here
    // Convert input to lowercase
    input = input.toLowerCase();

    // Check for specific words in user input
    if (input.includes('hello') || input.includes('hi') || input.includes('xin chao') || input.includes('chao ban')|| input.includes('xin chào') || input.includes('chào bạn') || input.includes('chào') || input.includes('Konnichiwa')) {
      return "Chào bạn, mình có thể giúp gì được?"; 
    } else if (input.includes('help') || input.includes('giúp') || input.includes('giúp mình')) {
      return "Vâng, bạn muốn được hỗ trợ việc gì ạ? 🤔";
    } else if (input.includes('bye') || input.includes('tam biet') || input.includes('tạm biệt') || input.includes('goodbye') || input.includes('good bye') || input.includes('bye bye') || input.includes('byebye')){
      return "Bye Bye! Chúc bạn 1 ngày tốt lành! 👋";
    } else if (input.includes('dm') || input.includes('địt mẹ') || input.includes('địt con mẹ') || input.includes('địt mẹ mày') || input.includes('địt mẹ m')){
      return "???";
    } else if (input.includes('món nào') || input.includes('món gì') || input.includes('món ăn') || input.includes('món ăn nào') || input.includes('mon nao') || input.includes('mon gi') || input.includes('mon an') || input.includes('mon an nao') || input.includes('menu') || input.includes('thực đơn') || input.includes('thuc don')) {
      return "Bánh gạo lứt chà bông: 5K. Bánh gạo lứt rong biển: 7K. Xôi cúc: 10K. Bánh mỳ gà: 14K. Bánh mì hoa cúc: 30K.";
    } else if (input.includes('đặt hàng') || input.includes('đặt món') || input.includes('dat mon') || input.includes('dat hang')){
      return "Ok bạn! Liên hệ ngay facebook của mình nhé! https://www.facebook.com/profile.php?id=61555803241596";
    } else if (input.includes('bot ngu') || input.includes('bot ngốc') || input.includes('bot ngu vl') || input.includes('bot ga') || input.includes('bot rac')) {
      return "you stupid";
    } else {
      // If no specific word is found, return a random response
      const responses = [
        "YumYum Breakfast: I'm sorry, I didn't understand your question. Could you please rephrase it? 😕",
        "I'm here to assist you with any questions or concerns you may have. 📩",
        "I'm sorry, I'm not able to browse the internet or access external information. Is there anything else I can help with? 💻",
        "What would you like to know? 🤔",
        "I'm sorry, I'm not programmed to handle offensive or inappropriate language. Please refrain from using such language in our conversation. 🚫",
        "I'm here to assist you with any questions or problems you may have. How can I help you today? 🚀",
        "Is there anything specific you'd like to talk about? 💬",
        "I'm happy to help with any questions or concerns you may have. Just let me know how I can assist you. 😊",
        "I'm here to assist you with any questions or problems you may have. What can I help you with today? 🤗",
        "Is there anything specific you'd like to ask or talk about? I'm here to help with any questions or concerns you may have. 💬",
        "I'm here to assist you with any questions or problems you may have. How can I help you today? 💡",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
}