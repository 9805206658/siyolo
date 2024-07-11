let product_list=document.getElementById("product_list");

let product_detail;
let text;
// this variable is use for the the printing the image
let base64String;


// here convertion  the image buffer into base64 image
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}



//   here defining the function which add on the click listener
function show_sortlist(event)
 {
    let ele=event.currentTarget
    let ele_value=ele.innerHTML;
    let property=ele.value;
    let sort_text;
    fetch(`http://localhost:${window.port}/product/property/${property}/value/${ele_value}`)
    .then(response=>{
      return response.json();
      })
    .then((sort_info)=>{
        base64String=arrayBufferToBase64(new Uint8Array(sort_info[0].image.data).buffer);

        console.log(sort_info);
        sort_text=` 
        <div class="main_container"  onclick="navigator(event)" data=${sort_info[0].product_id}>
         <div class="item_container">
          <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
          <h4 class="info_describer">${sort_info[0].brand}</h4>
          <h3 class="info_describer">${sort_info[0].type}</h3>
          <p class="info_describer"> ${sort_info[0].discription}</p>
         </div>
        </div>`;

        for(let i=1;i<sort_info.length;i++)
            {
                base64String=arrayBufferToBase64(new Uint8Array(sort_info[i].image.data).buffer)
              sort_text=sort_text+`
              <div class="main_container"  onclick="navigator(event)" data=${sort_info[i].product_id} >
         <div class="item_container">
         <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
          <h4 class="info_describer">${sort_info[i].brand}</h4>
          <h3 class="info_describer">${sort_info[i].type}</h3>
          <p class="info_describer"> ${sort_info[i].discription}</p>
         </div>
        </div>`;
            };
            product_list.innerHTML=sort_text;
            console.log(sort_text);
       });



localStorage.clear();
}




// here defining the function for sorting
function sorting_info(sort_property,product_detail)
{
    
      let btn_sorted;
      let sorted_info=new Array();
      sorted_info.push(product_detail[0][sort_property]);
      console.log(sorted_info);
      for(let i=0;i<product_detail.length;i++)
          {
              if(sorted_info.includes(product_detail[i][sort_property])===false)
                  {
                      sorted_info.push(product_detail[i][sort_property]);
                  }
          }
        // here displaying the sorting menus
      btn_sorted=`<button onclick="show_sortlist(event)">${sorted_info[0]}</button>`;
      for(let i=1;i<sorted_info.length;i++)
          {
              btn_sorted=btn_sorted+`<button  value=${sort_property} class="btn_sort"  onclick="show_sortlist(event)">${sorted_info[i]}</button>`
          }
       // here displaying the button in the page
      document.querySelector(`#${sort_property} .btn_list`).innerHTML=btn_sorted;

  }


  async function Product_info()
     {
        if(localStorage.getItem("search"))
            {
                
               let s_d=localStorage.getItem("search");
               await  fetch(`http://localhost:${window.port}/product/search/${s_d}`)
               .then(response=>
                {
                    return response.json();
                })
                .then(result=>
                    {
                    
                sorting_info("brand",result);
                sorting_info("price",result);
                sorting_info("color",result);
                console.log(result);
                base64String=arrayBufferToBase64(new Uint8Array(result[0].image.data).buffer)
                text=` 
              <div class="main_container"  onclick="navigator(event)" data=${result[0].product_id}>
                 <div class="item_container" value=${result[0].id}>
                   <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
                   <h4 class="info_describer">${result[0].brand}</h4>
                   <h3 class="info_describer">${result[0].type}</h3>
                   <p class="info_describer">${result[0].discription}</p>
                </div>
               </div>`


                for(let i=1;i<result.length;i++)
                {
                    base64String=arrayBufferToBase64(new Uint8Array(result[i].image.data).buffer)
                    text=text+`
                   <div class="main_container" onclick="navigator(event)" data=${result[i].product_id}>
                    <div class="item_container">
                     <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
                     <h4 class="info_describer">${result[i].brand}</h4>
                     <h3 class="info_describer">${result[i].type}</h3>
                     <p class="info_describer">${result[i].discription}</p>
                    </div>
                   </div>
              
                   `
                }
                console.log(text);
            product_list.innerHTML=text;
        })
               
          }



        else
        {
          let url=(`http://localhost:${window.port}/product`);

          try{
            const response=await fetch(url);
            if(!response.ok)
                {
                    throw new Error("Newtwork response was not ok"+response.statusText);
                }

             product_detail=await response.json();


            //  here displaying the sorting information 
            sorting_info("brand",product_detail);
            sorting_info("price",product_detail);
            sorting_info("color",product_detail);
            
            // here refining the product

            let refine = [];
            let k, l;
            
            // Assuming product_detail is an array with objects
            if (product_detail.length > 0) {
                refine.push(product_detail[0]);
            }
            
            for (k = 1; k < product_detail.length; k++) {
                let isDuplicate = false;
                for (l = 0; l < refine.length; l++) {
                    if (refine[l] && product_detail[k].brand === refine[l].brand &&
                        product_detail[k].type === refine[l].type &&
                        product_detail[k].discription === refine[l].discription) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    refine.push(product_detail[k]);
                }
            }
            
            product_detail=refine;
            console.log(product_detail);
            base64String=arrayBufferToBase64(new Uint8Array(product_detail[0].image.data).buffer)
              text=` 
            <div class="main_container"  onclick="navigator(event)" data=${product_detail[0].product_id}>
               <div class="item_container" value=${product_detail[0].id}>
                 <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
                 <h4 class="info_describer">${product_detail[0].brand}</h4>
                 <h3 class="info_describer">${product_detail[0].type}</h3>
                 <p class="info_describer">${product_detail[0].discription}</p>
              </div>
             </div>
             
             `
             for(let i=1;i<product_detail.length;i++)
                {
                    base64String=arrayBufferToBase64(new Uint8Array(product_detail[i].image.data).buffer)
                    text=text+`
                   <div class="main_container" onclick="navigator(event)" data=${product_detail[i].product_id}>
                    <div class="item_container">
                     <img src="data:image/jpeg;base64,${base64String}" alt="furry presents"/>
                     <h4 class="info_describer">${product_detail[i].brand}</h4>
                     <h3 class="info_describer">${product_detail[i].type}</h3>
                     <p class="info_describer">${product_detail[i].discription}</p>
                    </div>
                   </div>
              
                   `
                }
                console.log(text);
            product_list.innerHTML=text;
        
     }
        
    catch(error)
    {
        console.log(error);
    }
 }
}
Product_info()   ;


// here making funtion for navigate to the next page
function navigator(event)
{

let ele=event.currentTarget;
// console.log(ele);
let propertyValue=ele.getAttribute("data");
localStorage.setItem("product_id",propertyValue);
window.location.replace("http://127.0.0.1:5501/fontend/detail.html")
}