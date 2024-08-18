// alert(window.innerHeight);
// alert(window.innerWidth);

let flashProduct;
function randomNumber(min,max)
{
    let number=(Math.floor(Math.random()*(max-min)+min));
    return number;
}
function navigator(event)
{

let ele=event.currentTarget;
let propertyValue=ele.getAttribute("data");
localStorage.setItem("product_id",propertyValue);
window.location.replace("detail.html")
}
let cars=[
    {
    Name:"furry",
    model:2024,
    describe:"it is the best cyle",
    img:"furry.jpg"
    },
    {
        Name:"furry",
        model:2024,
        describe:"it is the best cyle",
        img:"furry.jpg"
    },

    {
        Name:"furry",
        model:2024,
        describe:"it is the best cyle",
        img:"furry.jpg"
    },

    {
        Name:"furry",
        model:2024,
        describe:"it is the best cyle",
        img:"furry.jpg"
     },
    
     {
        Name:"furry",
        model:2024,
        describe:"it is the best cyle",
        img:"furry.jpg"
     }
]





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




async function unique_category()
{
    await fetch(`http://localhost:${window.port}/product`)
    .then(response=>
        {
            return response.json();
        }
    )
    .then(data=>
        {
            let refine_product=new Array();
            // here refine the product;
            refine_product[0]=data[0];
            let count,text,base64String;
            let category=document.getElementById("category_list");
            for(let i=0;i<data.length;i++)
                {
                    for(let k=0;k<refine_product.length;k++)
                        {
                            if(data[i].type==refine_product[k].type)
                                {
                                    count=true;
                                }
                                else
                                {
                               count=false;
                            }
                        }
                        if(count==false)
                            {
                                refine_product.push(data[i]);

                            }
                     }

            flashProduct=refine_product;
            displayFlashSale();
            
             base64String=arrayBufferToBase64(new Uint8Array(refine_product[0].image.data).buffer)
            text="";
            
            for(let i=0;i<refine_product.length;i++)
                {
                      base64String=arrayBufferToBase64(new Uint8Array(refine_product[i].image.data).buffer)
            text=text+`
                 <div class="main_container" onclick="navigator(event)" data=${refine_product[i].product_id} discount="true">
                 <div class="item_container" >
                 <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
                 
                 <p class="info_describer" style="font-weight:bold">${refine_product[i].brand}</p>
                 <h3 class="info_describer">${refine_product[i].color} </h3>
                 <p class="info_describer">${refine_product[i].discription}</p>
                 <p class="actual_price info_describer">${refine_product[i].price}</p>
                  </div>
             </div> `;

             setInterval(()=>
            {
                category.innerHTML=text; 

            },1000)
            
            
              }
            }

    )

}

// flash sale
 async function advertisementDisplay()
{ 
   let flash_sale;
    await fetch(`http://localhost:${window.port}/product`)
    .then(response=>
        {
            return response.json();
        }
    )
    .then(data=>
        {
          let refine_product=new Array();
            refine_product[0]=data[0];
            for(let i=0;i<data.length;i++)
                {
                    for(let k=0;k<refine_product.length;k++)
                        {
                            if(data[i].type==refine_product[k].type)
                                count=true;
                            else
                                count=false;
                        }
                     if(count==false)
                            
                      refine_product.push(data[i]);
                }
            flash_sale=refine_product

        });
let text=''
let hero=document.querySelector(".hero");
let i=0;
       setInterval(()=>
            {
          
                let value=randomNumber(15,20);
             
                let base64String=arrayBufferToBase64(new Uint8Array(flash_sale[i].image.data).buffer)
             text=text=  `
             <div class="imgcrousel">
                  <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
      
                     <div class="discount_wrapper">
                      <p>${value}%</p>
                      <p>discount</p>
                     </div>
                     <div class="free_deliver discount_wrapper">Free deliver</div>
                     <div class="discount_wrapper brand">${flash_sale[i].brand}</div>

               </div>
             
             `
             i++;

             hero.innerHTML=text;
             if(i==flash_sale.length-1)
             {
                i=0;
             }
            },1000)
         
       }

    function displayFlashSale()
{
    const ele=document.getElementById("flash");
 let value=randomNumber(4,flashProduct.length);
   let text="";
   for(let i=0;i<value;i++)
    {

        base64String=arrayBufferToBase64(new Uint8Array(flashProduct[i].image.data).buffer)
        text=text+
        `<div class="main_container" onClick="navigator(event)"  data=${flashProduct[i].product_id}>
        <div class="item_container" >
         <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
       
         <h3 class="info_describer">${flashProduct[i].color}</h3>
         <p class="info_describer">${flashProduct[i].discription}</p>
         <p class="actual_price info_describer">${flashProduct[i].price}</p>
          <p class="info_describer" id="discount"><s>${flashProduct[i].price*0.30}</s>-30%</p> </div>


          </div>
     </div> `
     setInterval(() => {
        
        ele.innerHTML=text;

     }, 2000);
    }
}

    
unique_category();
advertisementDisplay();


async function search_implementation() 
{
         
         const searchElement = document.getElementById("search");
         localStorage.setItem("search",searchElement.value);
         searchElement.value="";
         localStorage.setItem("searchStatus",true);
         window.location.replace(`productListing.html`);
}
document.getElementById("companyName").innerHTML=window.name;