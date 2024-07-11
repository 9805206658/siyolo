const url = 'http://localhost:7000/users';

// Data to be sent in the POST request
const data = {
   user_id:5,
   user_name:"Bikal shrestha",
   user_password:"bikal"
};

// Options for the fetch request
const options = {
    method: 'POST', // Specify the request method
    body: JSON.stringify(data), // Convert the data to a JSON string
    headers: {
        'Content-Type': 'application/json' // Set the request headers
    }
};

// Make the POST request using fetch
fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
    })
    .then(data => {
        console.log('Success:', data); // Log the response data
    })
    .catch(error => {
        console.log('Error:', error); // Log any errors
    });