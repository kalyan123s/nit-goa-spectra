// app.js

// Function to send a user message and update the chat container
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    
    if (userInput.trim() === '') {
        return; // Ignore empty messages
    }

    // Append the user message to the chat container
    appendMessage('You', userInput, 'bg-blue-500', 'text-white');

    // TODO: Send the user input to the server, process it, and get a bot response
    // Simulating a bot response for now
    setTimeout(() => {
        const botResponse = 'I received your message: ' + userInput;
        appendMessage('Bot', botResponse, 'bg-green-500', 'text-blue');
    }, 500);
    
    // Clear the user input field
    document.getElementById('user-input').value = '';
}

// Function to append a message to the chat container
function appendMessage(sender, message, bgColor, textColor) {
    const chatContainer = document.getElementById('chat-container');

    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-4 animate__animated animate__fadeIn`;
    
    const senderDiv = document.createElement('div');
    senderDiv.className = 'flex items-center';

    const senderBadge = document.createElement('div');
    senderBadge.className = `rounded-full ${bgColor} ${textColor} p-3`;
    senderBadge.textContent = sender;

    const messageText = document.createElement('div');
    messageText.className = `ml-3`;
    messageText.textContent = message;

    senderDiv.appendChild(senderBadge);
    senderDiv.appendChild(messageText);
    messageDiv.appendChild(senderDiv);

    chatContainer.appendChild(messageDiv);

    // Scroll to the bottom of the chat container to show the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Example: You can call this function to simulate an initial message from the bot
function simulateBotGreeting() {
    const botGreeting = "Hello! I'm your friendly chat bot. How can I help you today?";
    appendMessage('Bot', botGreeting, 'bg-green-500', 'text-white');
}

// Simulate an initial greeting from the bot when the page loads
simulateBotGreeting();
