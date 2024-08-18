

let product_info;
const overlay=document.getElementById("overlay");

console.log(window.port);


let table=document.getElementById("product_info");
let content=
`<tr>
<th>Product_Id</th>
<th>Seller_Id</th>
<th>Brand</th>
<th>Type</th>
<th>Frame_Material</th>
<th>Weight</th>
<th>color</th>
<th>price</th>
<th>warrenty period</th>
</tr>`;

// here getting the data from the database;
 async function Display_info()
{
let url=`http://localhost:${window.port}/product`;
try{
const response =await fetch(url);
if(!response.ok)
    {
        throw new Error("Network response was not ok:"+response.statusText);
    }
    product_info=await response.json();
    console.log(product_info);
    if(product_info)
        {
            for(let i=0;i<product_info.length;i++)
                {
                    console.log(localStorage.getItem("data"));
                    if(product_info[i].seller_id==localStorage.getItem("data"))
                        { 
                            content=content+`
                        <tr>
                        <td>${product_info[i].product_id}</td>
                        <td>${product_info[i].seller_id}</td>
                        <td>${product_info[i].brand}</td>
                        <td>${product_info[i].type}</td>
                        <td>${product_info[i].frame_material}</td>
                        <td>${product_info[i].weight}</td>
                        <td>${product_info[i].color}</td>
                        <td>${product_info[i].price}</td>
                        <td>${product_info[i].warrenty_period}</td>
                        </tr> `
                        }
                        
                    
                  }
                  
            table.innerHTML=content;
        }

}
catch(error)
{
    console.log(error);
}
}
Display_info();
// here writing the code for providing the form application
const add_item=document.getElementById("add_item");
const  product_info_wrapper=document.getElementById("product_info_wrapper");
function ShowForm()
{
    // alert("activate");
    product_info_wrapper.style.display="none";
    overlay.style.display="flex";
    document.getElementById("seller_id").value=localStorage.getItem("data");
    console.log(localStorage.getItem("data"));
}
add_item.addEventListener("click",ShowForm);

// here adding the prodcut 
const confirm=document.getElementById("confirm");


async function uploadInfo(event) {
    // alert("i am click");
    event.preventDefault();
    // Get the form elements
    // const product_id = document.getElementById("product_id").value;
    const seller_id = document.getElementById("seller_id").value;
    const brand = document.getElementById("brand").value;
    const type = document.getElementById("type").value;
    const frame_material = document.getElementById("frame_material").value;
    const weight = document.getElementById("weight").value;
    const color = document.getElementById("color").value;
    const price = document.getElementById("price").value;
    const warrenty_period = document.getElementById("warrenty_period").value;
    const image = document.getElementById("image").files[0];
    const Break=document.getElementById("Break").value;
    const gear=document.getElementById("gear").value;
    const discription=document.getElementById("discription").value;



    // Create a FormData object to handle file uploads
    const formData = new FormData();
    // formData.append('product_id', product_id);
    formData.append('seller_id', seller_id);
    formData.append('brand', brand);
    formData.append('type', type);
    formData.append('frame_material', frame_material);
    formData.append('weight', weight);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('warrenty_period', warrenty_period);
    formData.append('image', image);
    formData.append('Break',Break);
    formData.append("gear",gear);
    formData.append("discription",discription);

    try {

        const response = await fetch(`http://localhost:${window.port}/addProduct`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        overlay.style.display="none";
        window.location.replace("productListing.html");

    } catch (error) {
        console.error('Error:', error);
    }
}
confirm.addEventListener("click",uploadInfo);