// alert(window.innerHeight);
// alert(window.innerWidth);
let product_id=localStorage.getItem("product_id");
let iele=document.querySelectorAll("div i[onClick]");
let product_info;
let same_product;
// function define for the photo 
function arrayBufferToBase64(buffer)
 {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}




 async function get_product()
{
 let base64String
const response= await fetch(`http://localhost:${window.port}/product/product_id/${product_id}`)
 if(!response.ok)
    {
        throw new Error("response status not ok"+ response.statusText);
    }
 product_info=await response.json();


// here displaying the product in the page
 base64String=arrayBufferToBase64(new Uint8Array(product_info[0].image.data).buffer)
document.getElementById("img").src=`data:image/jpeg;base64,${base64String}`
document.querySelector("#about_product p").innerHTML=product_info[0].discription;
document.querySelector("#product_brand").innerHTML="brand"+": "+product_info[0].brand;
if(localStorage.getItem("discount"=="true"))
{
    document.querySelector("#product_brand").setAttribute("discount",true);
 
}
document.querySelector("#product_price").innerHTML="price"+" :"+product_info[0].price;
document.querySelector("#break_info").innerHTML= "break"+": "+product_info[0].break;
quantity_maintain(product_info);
}
document.addEventListener("DOMCON",()=>
{
 get_product();
})



// here defining the function for addition and  subtraction of the quantity
async function quantity_maintain(product_info)
{
   
let qty=0;
let add_sub=document.querySelectorAll(".qbtn");
let display_qty=document.getElementById("display_qty");
// here getting the all similar product
   const myResponse=await fetch(`http://localhost:${window.port}/product/brand/${product_info[0].brand}/type/${product_info[0].type}/discription/${product_info[0].discription}`);
    if(!myResponse.ok)
        {
            throw new Error("response status no ok"+myResponse.statusText);
        }
    same_product=await myResponse.json();


   add_sub[0].addEventListener("click",()=>
           {
               if(qty<=same_product.length-1)
                   {
              qty++;
                   }
              if(qty==0)
               {
                   display_qty.innerHTML=" ";
               }
              display_qty.innerHTML=qty;
           })

  add_sub[1].addEventListener("click",()=>
           {

               if(qty>1)
                   {
               qty--;
               display_qty.innerHTML=qty;
                   }
           })
}


async function Buy_now() {
    try {
        if(document.querySelector("#product_brand").getAttribute("discount"))
        {

            alert("you get 30 % discount");
            localStorage.setItem('discount',false);
        }
        
    
        // Get the length of the same_product array
        let length=display_qty.innerHTML;
        

        for (let i = 0; i < length; i++) {
            // Make the delete request for every product
            let response = await fetch(`http://localhost:${window.port}/product/product_id/${same_product[i].product_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }

            let data = await response.json();
        }

        // Redirect to home page after all deletions are complete
        window.location.replace("home.html");

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
document.getElementById("buy_now").addEventListener("click",Buy_now);



// rating related all the action are here
function rate_form(event)
{
  
    const targetEle=event.currentTarget;
    if(targetEle.id=="rate")
    {
    clear_start();
    document.getElementById("review").value="";
    document.querySelector(".rate_container").style.display="flex";
    document.getElementById("rate_title").innerHTML=product_info[0].brand;
    
    }
    else if(targetEle.id=="close")
    {
    document.querySelector(".rate_container").style.display="none";
    clear_start();
    }
    
}
// function to clear all the color in the star

function clear_start()
{
    for(let i=0;i<iele.length;i++)
    {
        iele[i].classList.add("fa-regular");
        iele[i].style.color="white";
        iele[i].classList.remove("fa-solid"); 
        
    }
}

function increaseStart(start_vlaue)
{
    let main_start=document.getElementById("main_start");
    let rate_us=document.getElementById("rate_us");
    switch(start_vlaue)
    {
        case 1:
            main_start.style.transform="scale(0.5,0.5)";
            rate_us.style.marginTop="0px";


            break;
        case 2:
            main_start.style.transform="scale(1,1)";
            rate_us.style.marginTop="0px";

            break;
        case 3:
            main_start.style.transform= "scale(1.5,1.5)";
            rate_us.style.marginTop="0px";

            break;
        case 4:
             main_start.style.transform="scale(2,2)";
             rate_us.style.marginTop="15px";
             break;
        case 5:
        main_start.style.transform= "scale(3,3)";
        rate_us.style.marginTop="40px";

        break;


    }
   

}
// here changing the color of start
function managetStart(start_value)
{
    let iele=document.querySelectorAll("div i[onClick]");
    for(i=start_value;i<iele.length;i++)
        {
         if(iele[i].getAttribute("class")=="fa-star fa-solid")
            {
            iele[i].classList.remove("fa-solid"); 
            iele[i].classList.add("fa-regular"); 
            iele[i].style.color="white";
            }
        
        }
    for(i=0;i<start_value;i++)
        {
            iele[i].classList.remove("fa-regular"); 
            iele[i].classList.add("fa-solid");
            iele[i].style.color="orange";
        }
    iele[start_value-1].setAttribute("status","Active");
}

function startClick(event)
{
    const startTarget=event.currentTarget;
    let iele=document.querySelectorAll("div i[onClick]");
    let i;
    let start_value=Number(startTarget.getAttribute('data'));
    // here reomove the staus property
    for(i=0;i<iele.length;i++)
        {
            iele[i].removeAttribute("status");
            
        }
        switch(Number(start_value))
        {
         case 1:
            increaseStart(start_value);
            managetStart(start_value);
         case 2:
            increaseStart(start_value);
            managetStart(start_value);
           
            break;
         case 3:
            increaseStart(start_value);
            managetStart(start_value);
               break;   
        case 4:
            increaseStart(start_value);
            managetStart(start_value);
              break;   

        case 5:
            increaseStart(start_value);
            managetStart(start_value);
               break;   
    }
}
// here finding the rate us button id

let rate=document.getElementById("rate");
let close=document.getElementById("close");
rate.addEventListener("click",(event)=>
{
    rate_form(event);
});
close.addEventListener("click",(event)=>
{
    rate_form(event)
});


class Rating
{
    constructor(product_id,user_id,rating,review)
    {
        this.product_id=product_id;
        this.user_id=user_id;
        this.rating=rating;
        this.review=review;
    }

   async store()
   {
    try{
        const response = await fetch(`http://localhost:${window.port}/addRating`,
             {
            method: 'POST',
            headers: { // Corrected from 'header' to 'headers'
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this)
        })
        .then(response=>
            {   if(!response.ok)
                    {
                        throw new Error(`http error! status: ${response.status}`);
                    }
            }
        )
        .then(data=>{
            alert(data);
        })
       
         }
    catch(err)
        {
          console.log(err);
  
        }

    }
}


async function start_submit()
{
let rate;
let user_id;
let exist;
for(let x of iele)
    {
        if(x.getAttribute("status")=="Active")
            { rate=x.getAttribute("data");
            }
     }

let review=document.getElementById("review").value;

await fetch(`http://localhost:${window.port}/rating`)
.then(response=>
    {
    return response.json();
    })
.then(data=>
    {
       user_id=data[0].id ;
    })

if(rate==null)
    {
        alert("please select rating");
    }
else if(user_id=="")
    {
        alert("please login your id");
    }
else if(review=="")
    {
        alert("please write your review");
    }
else
{
    await fetch(`http://localhost:${window.port}/rating/get_id`)
    .then(response=>
    {
        return response.json();
    })
    .then(data=>
    {
       
       for(let i=0;i<data.length;i++)
       {
        if(data[i].user_id==user_id)
        {
            exist=true;
        }
       }
        // if(exist)
        // {
        // alert("you already rate");
        // document.querySelector(".rate_container").style.display="none";
        // }
       

            let cust_rate=new Rating(product_info[0].product_id,user_id,rate,review)
            cust_rate.store();
            document.querySelector(".rate_container").style.display="none";
       
    }
    )
    
    
}

}

  
// here displaying total rating and average rating

async function display_start_number(n)
{

   let progress=document.getElementById(`progress${n}`);
   
    let rating_number=document.querySelectorAll(".rating_number");
    console.log("the product id is");
    console.log(product_info[0].product_id);
    await fetch(`http://localhost:${window.port}/rating/data/${n}/product_id/${product_info[0].product_id}`)
        .then(response=>
            {
                return response.json();
            })
        .then(data=>

            {
                 rating_number[rating_number.length-n].innerHTML=data[0][`rating_${n}`];
                 progress.style.width=(data[0][`rating_${n}`]*10)+"%";
                 progress.style.height="10px";


            }   
            )
 
}



async function display_tot_avg()
{


    let rating_status=document.querySelector(".rating_status");
    let  avg_rating=document.getElementById("avg_rating");
    let  total_rating=document.querySelector("#total_rating");

    // here fetch data for avg_rating
  if(product_info)
    {
    await fetch(`http://localhost:${window.port}/rating/data/0/product_id/${product_info[0].product_id}`)
    .then(response=>
        {
            
            return response.json();
        })
    .then(data=> {

        if(Math.round(data[0].avg_rating)==0)
            {

                document.getElementById("rating_information").style.display="none";
                document.getElementById("start_button").style.display="none";
            }
        else
        {
                  avg_rating.innerHTML= data[0].avg_rating;
                 
                   if(data[0].avg_rating>=0&& data[0].avg_rating<1.5)
                      {
                          rating_status.innerHTML="worse";
                      }
                    else if(data[0].avg_rating>1.5 && data[0].avg_rating<2.5)
                      {
                      rating_status.innerHTML=" good"; 
                  }
 
                  else if(data[0].avg_rating>2.5 && data[0].avg_rating<3.5)
                      {
                          rating_status.innerHTML=" best"; 
                      }
                  
                  else
                  {
                      rating_status.innerHTML="excellent";  
                  }
        }
        
        })
    
    await fetch(`http://localhost:${window.port}/rating/data/total/product_id/${product_info[0].product_id}`)
    .then(response=>
        {
            return response.json();
        })
    .then(data=>
        {
             total_rating.innerHTML=data[0].total_rating;
        }
        )

       display_start_number(1);
       display_start_number(2);
       display_start_number(3);
       display_start_number(4);
       display_start_number(5);
    }  
}


document.addEventListener("DOMContentLoaded",(event)=>
{
get_product();
})
window.addEventListener("scroll",(event)=>
{
let scroll=window.scrollY;
console.log(scroll);
if(scroll>50&&scroll<200)
    {
        display_tot_avg();
    }
})



// here displaying rating user information 
function timeConverter(createTime)
{
    let currentTime=new Date();
    let oldTime=new Date(createTime);
    let diffMilliseconds=currentTime.getTime()-oldTime.getTime();
    let millisecondsInADay = 24 * 60 * 60 * 1000;
    let daysInMonths=30.4;
    let totalDays=diffMilliseconds/millisecondsInADay;
    let totalMonth=totalDays/daysInMonths;
    let totalYear=totalMonth/12;
    if(totalYear<1&& totalMonth>1)
        {
            return Math.round(totalMonth)+" "+"Month";

        }
    else if(totalMonth<1 && totalDays>1 )
        {
            return Math.round(totalDays)+" "+"Day";
            
        }
    else
    {
        return Math.round(totalYear)+" "+"Year";
    }
    
}
async function rating_user_info(event)
{
    let btnStart=(event.currentTarget);
    let review_info=null;
    let value=btnStart.querySelector(".btn_rate span").innerHTML;
    let display=document.querySelector(".display");
    let url=`http://localhost:${window.port}/rating/data/${value}`;
    await fetch(url)
    .then(response=>
        {
            return response.json();
        })
        .then(data=>
            {
                console.log("the length "+" "+data.length);
               if(data.length==0)
               {
                display.style.display="none";
               }
              else
                {
                    display.style.display="flex";

                    console.log(data);
        
                      review_info= "";
                     for(let i=0;i<data.length;i++)
                      {
                          review_info=review_info+` 
                          <div class="rating_container">
                           <p class="rating_time" >${timeConverter(data[i].created_at)}</p>
                            <div class="customer_name"> ${data[i].user_name}</div>
                            <div class="review">${data[i].review}</div>
                          </div>
                            `; 
                       }
                       display.innerHTML=review_info;
             }
            
            

            }
        )
}


// here add cart operation are performed
let add_cart=document.getElementById("add_cart");

class StatusController
{
constructor(id,method="reserved")
{
    this.id=id;
    this.method=method
}
 async update_status()
{
    this.method="reserved";
    await fetch(`http://localhost:${window.port}/update/product`,{
        method:"PUT",
        headers:{
           'Content-Type':'application/json'
        },
        body:JSON.stringify(this)
    })
    .then(response=>
    {
        if(!response.ok)
        {
            console.log("there is was the network problem")

        }
    }
    )
    alert("successfully clear status");     
}

async clear_status()
{
    this.method="clear";
    await fetch(`http://localhost:${window.port}/update/product`,{
        method:"PUT",
        headers:{
           'Content-Type':'application/json'
        },
        body:JSON.stringify(this)
    })
    .then(response=>
    {
        if(!response.ok)
        {
            console.log("there is was the network problem")
l
        }
    }
    )
}


async get_status()
{
    this.method="get"
    try
    {
const response=await  fetch(`http://localhost:${window.port}/update/product`,{
        method:"PUT",
        headers:{
           'Content-Type':'application/json'
        },
        body:JSON.stringify(this)
    })
const result=await response.json();
return result;
    }
catch(error)
{
console.error("Error fetching picture:",error);
}
}


}


async function add_to_cart()
{
    
    let quantity=document.querySelector("#display_qty");
    let customer_id;
    let qty=quantity.innerHTML;
    if(qty=="")
        {
            qty=1;
        }

// here getting the active customer id
    await fetch(`http://localhost:${window.port}/get_id`)
    .then(response=>
        {
            return response.json();
        }
    )
    .then(data=>
        {
            console.log(data);
            customer_id=data;

        }
    )

    // here reserve the status of the product

    let sq=new StatusController(product_info[0].product_id);
    let status= await sq.get_status();

if( status[0].status=="Clear")
{
    sq.update_status();
    const cart={
        customer_id:customer_id[0].id,
        product_id:product_info[0].product_id,
        discription:product_info[0].discription,
        quantity:qty,
        price:product_info[0].price,
        brand:product_info[0].brand,
        type:product_info[0].type,

              }
 fetch(`http://localhost:${window.port}/addCart`,{
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart)
})
 .then(response=>
    {
        if(!response.ok)
            {
                throw new Error(`http error! status: ${response.status}`);
            }
    }
)
alert("succssfully add to the cart");
}
else
{
    alert("this product is alreday in the reserved");
}
}
add_cart.addEventListener("click",add_to_cart);

