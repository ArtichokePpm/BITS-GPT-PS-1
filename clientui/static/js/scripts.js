function toggleWidget() {
    const widget = document.getElementById('widget');
    widget.classList.toggle('minimized');
    const minimizeBtn = document.getElementById('minimize-btn');
    minimizeBtn.innerHTML = widget.classList.contains('minimized') ? '&#43;' : '&#8722;';
}

function goToLoginPage() {
    window.location.href = '/login'; // Navigate to the login route
}

function goToChatPage() {
    
    fetch('/add_user_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/chat'; // Redirect to /chat on success
        } else {
            console.error('Error:', data.message);
            alert('Failed to add user data: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Server error occurred: ' + error.message);
    });
}



function validateAndSubmit() {
    console.log("validateAndSubmit called");
    var userId = document.getElementById("user-id").value;
    var password = document.getElementById("password").value;

    if (userId === "" || password === "") {
        console.log("Empty fields detected");
        document.getElementById("warning-message").textContent = "Please fill in all fields!";
        document.getElementById("warning-message").style.display = "block";
        setTimeout(() => {
            document.getElementById("warning-message").style.display = "none";
        }, 2000); // Hide warning message after 2 seconds
        return;
    }

    console.log("Sending fetch request to /validate_password with user_id:", userId);
    fetch('/validate_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Fetch response data:", data);
        if (data.status === 'success') {
            window.location.href = '/course';
        } else {
            document.getElementById("warning-message").textContent = data.message;
            document.getElementById("warning-message").style.display = "block";
            document.getElementById("user-id").value = ""; // Clear the user ID field
            document.getElementById("password").value = ""; // Clear the password field
            setTimeout(() => {
                document.getElementById("warning-message").style.display = "none";
            }, 2000); // Hide warning message after 2 seconds
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("warning-message").textContent = "An error occurred. Please try again later.";
        document.getElementById("warning-message").style.display = "block";
        document.getElementById("user-id").value = ""; // Clear the user ID field
        document.getElementById("password").value = ""; // Clear the password field
        setTimeout(() => {
            document.getElementById("warning-message").style.display = "none";
        }, 2000); // Hide warning message after 2 seconds
    });
}

let selectedCourse = 'General';

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Select a course from dropdown
function selectCourse(courseName) {
    document.getElementById("selectedCourse").textContent = courseName;
    document.getElementById("selectedCourseInput").value = courseName;
    toggleDropdown(); // Hide dropdown after selection (optional)
}

function goToChatPageWithSelectedCourse() {
    const selectedCourse = document.getElementById('selectedCourseInput').value;

    fetch('/add_user_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chosen_course: selectedCourse
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/chat';
        } else {
            console.error('Failed to add course:', data.message);
            alert('Failed to add course: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Server error occurred: ' + error.message);
    });
}


window.onclick = function(event) {
    if (!event.target.matches('.custom-dropdown')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function sendMessage() {
    const textField = document.getElementById('upload-text-field');
    const message = textField.value.trim();
    if (message === '') return;

    // Add user message to chat
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = message;
    document.getElementById('chat-container').appendChild(userMessage);

    // Scroll to the bottom of the chat container
    document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;

    // Clear the text field
    textField.value = '';

    // Fetch bot response from Flask endpoint
    fetch('/get_bot_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_message=${encodeURIComponent(message)}`
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = data.bot_response;
        document.getElementById('chat-container').appendChild(botMessage);

        // Scroll to the bottom of the chat container after bot response
        document.getElementById('chat-container').scrollTop = document.getElementById('chat-container').scrollHeight;
    })
    .catch(error => {
        console.error('Error fetching bot response:', error);
    });
}
