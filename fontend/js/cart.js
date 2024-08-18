


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
    this.method="Clear";
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


let count;
let total_item;
async function picture_search(product_id) {
    try {
        const response = await fetch(`http://localhost:${window.port}/photoGet/product_id/${product_id}`);
        const photo = await response.json();
        return photo;
    } catch (error) {
        console.error('Error fetching picture:', error);
    }
}



function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}



async function cart_display() {
    count=0;
    const cart_container = document.querySelector(".cart_item_container");

    try {
        // Fetch user ID
        const idResponse = await fetch(`http://localhost:${window.port}/get_id`);
        const idData = await idResponse.json();
        const userId = idData[0].id;
        console.log("the user id"+userId);

        // Fetch cart items
        const cartResponse = await fetch(`http://localhost:${window.port}/getCart/id/${userId}`);
        const cartItems = await cartResponse.json();
    console.log("the cart items are");
        console.log(cartItems);

        // Clear the cart container
        cart_container.innerHTML = '';
        total_item=cartItems.length;
        if(total_item==0)
        {
            document.querySelector(".cart_container").style.display="none";
            document.querySelector(".no_cart").style.display="flex";

        }

        for (let item of cartItems) {
            console.log("the product id"+item.product_id);
            const pictureData = await picture_search(item.product_id);
            const base64String = arrayBufferToBase64(new Uint8Array(pictureData[0].image.data).buffer);
            const cartItemHTML =await createCartItemHTML(item, base64String,item.card_id,item.product_id);
            cart_container.innerHTML += cartItemHTML;
        }
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}


async function updateCart(quantity,card_id)
{
    console.log("the quantity"+quantity);
    console.log("the quantity"+card_id);

    let updateEle={
        quantity:quantity,
        card_id:card_id
        
    }
     await fetch(`http://localhost:${window.port}/cart/quantity`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(updateEle)
    })
    .then(response=>
        {
            if(!response.ok)
            {
                console.log("there is was the network problem")
    
            }
        }
        )
}

function increment(event)
{

let ele=event.currentTarget;
let eleLength=ele.getAttribute("data");
let cart_item=document.getElementById(`display_qty${eleLength}`);
let qty=cart_item.innerHTML;
if(qty<eleLength)
{
qty++;
console.log(qty);
cart_item.innerHTML=qty;
}

updateCart(cart_item.innerHTML,ele.getAttribute("card_id"));
order_summary();
}


function decrement(event)
{
 let ele=event.currentTarget;
let eleLength=ele.getAttribute("data");
let cart_item=document.getElementById(`display_qty${eleLength}`);
let qty=cart_item.innerHTML;
if(qty>1)
{
   qty--;
    cart_item.innerHTML=qty;

}
updateCart(cart_item.innerHTML,ele.getAttribute("card_id"));
order_summary();

}



async function quantity(item) {
    try {
    const response=await  fetch(`http://localhost:${window.port}/product/brand/${item.brand}/type/${item.type}/discription/${item.discription}`);
    const  quantity= await response.json();
    return quantity;
    } catch (error) {
        console.error('Error fetching picture:', error);
    }
}

  async function createCartItemHTML(item, base64String,card_id,product_id) {
    count++;
    order_summary();
    console.log("the product id is form "+product_id);
    // here similar poduct quantity
    console.log(item);
   let len =await quantity(item);
   return `
        <div class="cart_item">
            <input type="checkbox" name="item" id="name${count}"   data=${card_id}  product_id=${product_id}  onclick="update_cart_status(event)" checked />
            <label for="name"><img src="data:image/jpeg;base64,${base64String}" class="cart_item_image"></label>
            <div class="cart_item_info">
                <p>${item.discription}</p>
                <p>brand: ${item.brand}</p>
            </div>
            <div class="cart_item_price">
                <p class="current_price">Rs ${item.price}</p>
                <p class="previous_price"><s>1000</s></p>
                <p class="discount_percent">-15%</p>
                <div>
                    <i class="fa-solid fa-trash item_delete" data=${card_id} product_id=${product_id} onclick="delete_card_item(event)"></i>
                </div>
            </div>
            <div class="button_container">
            <button class="ibtn"  card_id=${item.card_id} data=${len.length} onClick="increment(event)">+</button>
            <p id="display_qty${len.length}">1</p>
            <button class="ibtn" data=${len.length}  card_id=${item.card_id} onClick="decrement(event)" >-</button>

            </div>
        </div> 
    `; 
    
}

document.addEventListener("DOMContentLoaded", cart_display);

async function check_all()
{
   let check_all=document.getElementById("select_all");
   let check_ele;
   
   if(check_all.checked)
    {
        for(let i=1;i<=total_item;i++)
            {
                check_ele=document.getElementById(`name${i}`)
                check_ele.checked=true;
                let id=check_ele.getAttribute("data");
                let uca=new UpdateCart(id);
                uca.setActive();
       
    }
 } 
 else
 {
    for(let i=1;i<=total_item;i++)
        {
            check_ele=document.getElementById(`name${i}`)
            check_ele.checked=false;
            let id=check_ele.getAttribute("data");
            let uci=new UpdateCart(id);
            uci.setInactive();
           
        }
 }
 order_summary();
}




class UpdateCart
{
   constructor(card_id,status="Active")
   {
    this.card_id=card_id
    this.status=status;
   }
   async setActive()
   {
    this.status="Active";
    const response=await fetch(`http://localhost:${window.port}/update/cart`,
        {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this)
        });
    const info=await response.json()
    console.log(info);
    }

   async setInactive()
   {

    this.status="Inactive";
    const response=await fetch(`http://localhost:${window.port}/update/cart`,
        {
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this)
        });
    const info=await response.json();
    console.log(info);

   }
   async delete_cart()
   {
   let response=await fetch(`http://localhost:${window.port}/cart/deleteItem/card_id/${this.card_id}`,
    {
    method:"DELETE",
    headers:
    {
        'Content-Type': 'application/json'  
    } 
    }
)
    if(!response.ok){
        throw new Error("Newtwork response was not ok:"+response.statusText);
    }
   }
}



function update_cart_status(event)
{
    let ele=event.currentTarget;
    let cart_id=ele.getAttribute("data");
    let uc=new UpdateCart(cart_id);
    console.log(ele.checked);
    if(ele.checked==false)
    {
        uc.setInactive();
    }
    else
    {
        uc.setActive();
    }
    order_summary();
}

async function order_summary()
{
    let subtotal=document.getElementById("subtotal");
    let shipping_fee=document.getElementById("shipping_fee");
    let total_price=document.getElementById("total_price");

    await fetch(`http://localhost:${window.port}/cart/getTotal`)
    .then(response=>
    {
        return response.json();
    })
    .then(data=>
    {
       console.log(data[0].total_price);
       subtotal.innerHTML=data[0].total_price;
       shipping_fee.innerHTML=175;
       total_price.innerHTML=data[0].total_price+175;

    }
    )
}


 function delete_card_item(event)
{
    let ele=event.currentTarget;
    console.log("the element information ");
    console.log(ele);
   if(ele.getAttribute("data")=="all")
   {
    for(let i=1;i<=total_item;i++)
        {
            let check_ele=document.getElementById(`name${i}`)
            console.log(check_ele);
        let id=check_ele.getAttribute("product_id");
            console.log("the product id is "+id);
            let uca=new UpdateCart(check_ele.getAttribute("data"));
            let sc=new StatusController(check_ele.getAttribute("product_id"));
            sc.clear_status();
           uca.delete_cart();
        }
    }
   else
   {
    console.log(ele.getAttribute("data"));
    let uca=new UpdateCart(ele.getAttribute("data"));
    let sc=new StatusController(ele.getAttribute("product_id"));
    sc.clear_status();
    uca.delete_cart();

   }
   cart_display();

}
function continue_shop()
{
    window.location.replace(`productListing.html`);
}


