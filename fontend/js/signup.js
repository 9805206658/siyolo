// Get elements by ID and name
console.log(window.port);
const ele_name = document.getElementById("full_name");
const ele_phone = document.getElementById("phone");
const ele_password = document.getElementById("password");
const confirm_password=document.getElementById("confirm_password");
const ele_genders = document.getElementsByName("gender");
const ele_user=document.getElementsByName("user");
const ele_dob = document.getElementById("dob");
const btn_signup = document.getElementById("btn_signup");
const terms_condition=document.getElementById("terms_condition");



// Function to collect signup information
function collectSignup() {
    alert("collect the information");
    const user_name = ele_name.value;
    const phone = ele_phone.value;
    const password = ele_password.value;
    const con_pasword=confirm_password.value;
    let gender;
    let user;
    for(let i=0;i<ele_user.length; i++) 
        {
            if(ele_user[i].checked)
                {
                    user=ele_user[i].value;
                    break;
                }
         }
    
    for (let i = 0; i < ele_genders.length; i++) {
        if (ele_genders[i].checked) {
            gender = ele_genders[i].value;
            break; // Exit loop once gender is found
        }
    }
    const dob = ele_dob.value;
// here checking null value
if(user_name=='')
    {
        alert("please enter the user name");
        ele_name.value='';
    }
else if(phone=='')
    {
        alert("please enter the contact details");
        ele_phone.value='';
    }
else if(password=='')
    {
        alert("please enter the password");
        ele_password.value='';
    }
else if(gender=='')
    {
        alert("pelase enter your gender");
        ele_genders.value='';
    }
    else if(dob==''){
        alert("please enter the data of the birth");
    }
    else if(con_pasword!=password)
        {
            alert("confrim password and password are not match");
            confirm_password.value='';
            password.value='';
        }
    else if(!terms_condition.checked)
    {
        alert("please accept the terms and 3coditon");

    }
    else{
        console.log(user);

    if(user=="buyer")
        {
        alert("succefully create your account buyer account");
 // Sending collected data to the server
    fetch(`http://localhost:${window.port}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_name: user_name,
            phone: phone,
            password: password,
            gender: gender,
            dob: dob
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
window.location.replace("login.html")
}
else
{
    alert("succefully create seller account");
    // Sending collected data to the server
       fetch(`http://localhost:${window.port}/seller`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               user_name: user_name,
               phone: phone,
               password: password,
               gender: gender,
               dob: dob
           })
       })
       .then(response => {
           if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
           }
           return response.json();
       })
       .then(data => console.log(data))
       .catch(error => console.error("Error:", error));
   window.location.replace("login.html")
}

}
}
// Add event listener to the signup button
btn_signup.addEventListener("click", collectSignup);
