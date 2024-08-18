
    class UpdateStatus
    {
        constructor(id,mode,phone)
        {
            this.id=id;
            this.mode=mode;
            this.phone=phone;
        }
        async user_update()
        {
            const options = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json', // Headers
                },
                body: JSON.stringify(this), // The body of the request
              };
            try
            {
          await fetch(`http://localhost:${window.port}/update/login`,options)
           .then(response=>
            {
                if(!response.ok)
                    {
                        alert("there was the newtwork problem");

                    }
               return response.json();
            }

           )
           .then((data)=>{
            console.log(data);
           }
        
        )
           }
           catch(error)
           {
            console.log(error);
           }
            
           
        }
    }


    async function request() 
    {
  const up = document.getElementById("user_phone");
    const p = document.getElementById("password");
    const btn_submit = document.getElementById("btn_submit");
    const ele_user=document.getElementsByName("user");
    console.log(ele_user);
    const port = window.port;
    let user, user_info;
   for(let i=0;i<ele_user.length;i++)
        {
            if(ele_user[i].checked)
                {
                    user=ele_user[i].value;
                    console.log(user);
                    break;
                 }
        }

        const user_phone = up.value;
        const password = p.value;
        // here checking the user input field is blank or not
        if(user_phone=="")
            alert("please enter the contact information");
            
        else if(password=="")
            alert("please enter the Password information");
            
        else if(user=="")
              alert("please select user type");
        else{
            alert("user");
        
       if(user=="buyer")
         {
            alert("enter in the buyer moode");

           try {
                 const response = await fetch(`http://localhost:${window.port}/login`);
                  if (!response.ok)
                  {
                      throw new Error("Network response was not ok: " + response.statusText);
                  }
                  user_info = await response.json();
                  console.log(user_info);

                 if (user_info) 
                 {
                     let isAuthenticated = false;
     
                     for (let i = 0; i < user_info.length; i++) 
                        {
                           if (user_info[i].phone == user_phone && user_info[i].password == password)
                             {
                               alert("Login successful");
                               let update_buyer=new UpdateStatus(user_info[i].id,"signup",user_info[i].phone);
                              update_buyer.user_update();
                               window.location.replace("home.html"); 
                               isAuthenticated = true;
                               break;
                            }  
                       }
     
                      if (!isAuthenticated) 
                      {
                          alert("Enter the correct phone number and password");
                      }
                 } 
                 else 
                 {
                     alert("Unexpected response format");
                 }
            } 
           catch (error)
           {
               console.log("There was a problem with the fetch operation:", error);
           }

        }
        else
        {
            console.log("enter seller mode");
            console.log(window.port);
            try {
                const response = await fetch(`http://localhost:${window.port}/sellerLogin`);
                 if (!response.ok)
                      {
                          throw new Error("Network response was not ok: " + response.statusText);
                      }
                     user_info = await response.json();
      
                     if (user_info) 
                     {
                         let isAuthenticated = false;
        
                         for (let i = 0; i < user_info.length; i++)
                             {
                             if (user_info[i].phone == user_phone && user_info[i].password == password)
                                 {
                                 alert("Login successful");
                                   localStorage.setItem("data",user_info[i].id)
                                   let update_seller=new UpdateStatus(user_info[i].id,"seller",user_info[i].phone);
                                   update_seller.user_update();
                                  window.location.replace("seller.html");
                                 isAuthenticated = true;
                                 break;
                                 }
                             }
       
                             if (!isAuthenticated) 
                             {
                                 alert("Enter the correct phone number and password");
                             }
                     } 

                    else 
                    {
                        alert("Unexpected response format");
                    }
  
             } 
             catch (error)
              {
                 console.log("There was a problem with the fetch operation:", error);
              }
        }
      }
    }


   btn_submit.addEventListener("click",request);