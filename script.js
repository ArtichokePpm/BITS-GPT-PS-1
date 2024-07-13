let isMinimized = false;
let dataset = [];

// Load the dataset
fetch('dataset.json')
  .then(response => response.json())
  .then(data => {
    dataset = data;
  })
  .catch(error => console.error('Error loading dataset:', error));

function toggleWidget() {
  const chatWidget = document.getElementById('chatWidget');
  const minimizedWidget = document.getElementById('minimizedWidget');

  if (isMinimized) {
    chatWidget.classList.remove('hidden');
    minimizedWidget.classList.add('hidden');
  } else {
    chatWidget.classList.add('hidden');
    minimizedWidget.classList.remove('hidden');
  }

  isMinimized = !isMinimized;
}

function handleLogin(event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const password = document.getElementById('password').value;
  const course = document.getElementById('course').value;
  const errorMessage = document.getElementById('errorMessage');

  if (!userId || !password || !course) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
    const loginWidget = document.getElementById('loginWidget');
    const chatWidget = document.getElementById('chatWidget');

    loginWidget.classList.add('hidden');
    chatWidget.classList.remove('hidden');
    
    addBotMessage(`Welcome, ${userId}! How can I assist you with your ${course} course?`);
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();

  if (message) {
    addUserMessage(message);
    chatInput.value = '';

    // Bot response
    const response = findAnswer(message);
    setTimeout(() => {
      addBotMessage(response);
    }, 1000);
  }
}

function findAnswer(text) {
  const lowercaseText = text.toLowerCase();
  const matchingEntry = dataset.find(entry => 
    lowercaseText.includes(entry.question.toLowerCase())
  );

  return matchingEntry ? matchingEntry.answer : "I'm sorry, I don't have a specific answer for that question. Can you please rephrase or ask something else?";
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContent = e.target.result;
      if (file.type.startsWith('image/')) {
        sendImage(fileContent, file.name);
        performOCR(fileContent);
      } else {
        sendDocument(file.name);
      }
    };
    reader.readAsDataURL(file);
  }
}

function performOCR(imageData) {
  addBotMessage("Processing the image. This may take a moment...");
  
  Tesseract.recognize(
    imageData,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log("Extracted text:", text);
    const response = findAnswer(text);
    addBotMessage(`I've analyzed the image. Here's what I found: ${response}`);
  })
}

function sendImage(imageData, fileName) {
  const chatInterface = document.getElementById('chatInterface');
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message user-message';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = 'Image uploaded: ' + fileName;
  
  const image = document.createElement('img');
  image.src = imageData;
  image.alt = fileName;
  image.className = 'uploaded-image';
  
  userMessage.appendChild(messageContent);
  userMessage.appendChild(image);
  chatInterface.appendChild(userMessage);
  chatInterface.scrollTop = chatInterface.scrollHeight;

  addBotMessage(`I've received your image "${fileName}". I'll process it to extract any text and try to answer based on that.`);
}

function sendDocument(fileName) {
  addUserMessage(`Uploaded document: ${fileName}`);
  
  setTimeout(() => {
    addBotMessage(`I've received your document "${fileName}". However, I can only process images at the moment. If you have any questions about the document, please ask them directly.`);
  }, 1000);
}

function addUserMessage(message) {
  const chatInterface = document.getElementById('chatInterface');
  const userMessage = document.createElement('div');
  userMessage.className = 'chat-message user-message';
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = message;
  userMessage.appendChild(messageContent);
  chatInterface.appendChild(userMessage);
  chatInterface.scrollTop = chatInterface.scrollHeight;
}

function addBotMessage(message) {
  const chatInterface = document.getElementById('chatInterface');
  const botMessage = document.createElement('div');
  botMessage.className = 'chat-message bot-message';
  const botMessageContent = document.createElement('div');
  botMessageContent.className = 'message-content';
  botMessageContent.textContent = message;
  botMessage.appendChild(botMessageContent);
  chatInterface.appendChild(botMessage);
  chatInterface.scrollTop = chatInterface.scrollHeight;
}