// alert(window.innerHeight);
// alert(window.innerWidth);
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


let text=`<div class="main_container">
            <div class="item_container">
             <img src="${cars[0].img}" alt="furry presents"/>
             <h4 class="info_describer">${cars[0].Home}</h4>
             <h3 class="info_describer">${cars[0].model}</h3>
             <p class="info_describer">${cars[0].describe}</p>
             <button class="buy_now">Buy Now</button>
            </div>
         </div>`;
let hero=document.querySelector(".hero");
for(let i=1;i<cars.length;i++)
    {
       text= text+`
       <div class="main_container">
            <div class="item_container">
             <img src="${cars[i].img}" alt="furry presents"/>
             <h4 class="info_describer">${cars[i].Home}</h4>
             <h3 class="info_describer">${cars[i].model}</h3>
             <p class="info_describer">${cars[i].describe}</p>
             <button class="buy_now">Buy Now</button>
            </div>
         </div>
       `
    }
hero.innerHTML=text;

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
            console.log(data);
            let refine_prduct=new Array();
            // here refine the product;
            refine_prduct[0]=data[0];
            let count,text,base64String;
            let flash_sale=document.getElementById("category_list");
            for(let i=0;i<data.length;i++)
                {
                    for(let k=0;k<refine_prduct.length;k++)
                        {
                            if(data[i].type==refine_prduct[k].type)
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
                                refine_prduct.push(data[i]);

                            }

                }
                console.log(refine_prduct);
                base64String=arrayBufferToBase64(new Uint8Array(refine_prduct[0].image.data).buffer)
            text=`<div class="main_container">
                <div class="item_container" >
                 <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
               
                 <h3 class="info_describer">${refine_prduct[0].color} ccc</h3>
                 <p class="info_describer">${refine_prduct[0].discription}</p>
                 <p class="actual_price info_describer">${refine_prduct[0].price}</p>
                  </div>
             </div> `
            
            for(let i=1;i<refine_prduct.length;i++)
                {
                      base64String=arrayBufferToBase64(new Uint8Array(refine_prduct[i].image.data).buffer)
            text=text+`<div class="main_container">
                <div class="item_container" >
                 <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
               
                 <h3 class="info_describer">${refine_prduct[i].color} ccc</h3>
                 <p class="info_describer">${refine_prduct[i].discription}</p>
                 <p class="actual_price info_describer">${refine_prduct[i].price}</p>
                  </div>
             </div> `
              }
              flash_sale.innerHTML=text; 
            }
    )

}

unique_category();
async function search_implementation() 
{
const searchElement = document.getElementById("search");

  
            localStorage.setItem("search",searchElement.value);
           searchElement.value="";
           window.location.replace(`http://127.0.0.1:5501/fontend/productListing.html`);
           
   
}
