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
      const audio = new Audio('audio/hello1.wav');
      audio.play();
      return "Chào bạn, mình có thể giúp gì được?"; 
    } else if (input.includes('help') || input.includes('giúp') || input.includes('giúp mình')) {
      const audio = new Audio('audio/help1.wav');
      audio.play();
      return "Vâng, bạn muốn được hỗ trợ việc gì ạ? 🤔";
    } else if (input.includes('bye') || input.includes('tam biet') || input.includes('tạm biệt') || input.includes('goodbye') || input.includes('good bye') || input.includes('bye bye') || input.includes('byebye')){
      const audio = new Audio('audio/bye1.wav');
      audio.play();
      return "Bye Bye! Gặp lại bạn sau nhé! 👋";
    } else if (input.includes('dm') || input.includes('địt mẹ') || input.includes('địt con mẹ') || input.includes('địt mẹ mày') || input.includes('địt mẹ m')){
      const randomAudio = Math.random() < 0.5 ? 'audio/what1.wav' : 'audio/what2.wav';
      const audio = new Audio(randomAudio);
      audio.play();
      return "???";
    } else if (input.includes('món nào') || input.includes('món gì') || input.includes('món ăn') || input.includes('món ăn nào') || input.includes('mon nao') || input.includes('mon gi') || input.includes('mon an') || input.includes('mon an nao') || input.includes('menu') || input.includes('thực đơn') || input.includes('thuc don')) {
      const audio = new Audio('audio/menu1.wav');
      audio.play();
      return "Vâng, đây là Menu của YumYum Breakfast 🤗 \nBánh gạo lứt chà bông: 5K.\nBánh gạo lứt rong biển: 7K.\nXôi cúc: 10K.\nBánh mỳ gà: 14K.\nBánh mì hoa cúc: 30K.";
    } else if (input.includes('đặt hàng') || input.includes('đặt món') || input.includes('dat mon') || input.includes('dat hang')){
      const audio = new Audio('audio/contact1.wav');
      audio.play();
      return "Ok bạn! Liên hệ ngay facebook của mình nhé! https://www.facebook.com/profile.php?id=61555803241596";
    } else if (input.includes('bot ngu') || input.includes('bot ngốc') || input.includes('bot ngu vl') || input.includes('bot ga') || input.includes('bot rac')) {
      
      return "Mình xin lỗi ><";
    } else {
      // If no specific word is found, return a random response
      const responses = [
        "Xin lỗi, mình không hiểu câu hỏi của bạn. Bạn có thể vui lòng hỏi lại được không ạ? 😕",
        "Xin lỗi, mình không thể duyệt internet hoặc truy cập thông tin bên ngoài. Mình có thể giúp gì khác không? 💻",
        "Mình sẵn lòng trợ giúp nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào. Chỉ cần cho mình biết làm thế nào để có thể hỗ trợ bạn. 😊"
      ];
      frandom=responses[Math.floor(Math.random() * responses.length)]
      final=frandom
      if (frandom == "Xin lỗi, mình không hiểu câu hỏi của bạn. Bạn có thể vui lòng hỏi lại được không ạ? 😕"){
        const audio = new Audio('audio/else1.wav');
        audio.play();
      }
      if (frandom == "Xin lỗi, mình không thể duyệt internet hoặc truy cập thông tin bên ngoài. Mình có thể giúp gì khác không? 💻"){
        const audio = new Audio('audio/else2.wav');
        audio.play();
      }
      if (frandom == "Mình sẵn lòng trợ giúp nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào. Chỉ cần cho mình biết làm thế nào để có thể hỗ trợ bạn. 😊"){
        const audio = new Audio('audio/else3.wav');
        audio.play();
      }
      return final;
    }
}