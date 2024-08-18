const express = require('express');
const db = require('./db');
const cors = require('cors');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
const { ConsoleSqlOutlined, CodeSandboxCircleFilled } = require('@ant-design/icons');

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// Routes for the information of the product
app.get("/product/search/:search",(req,res)=>
{
  db.query(`select * from product where brand like "${req.params.search}%"`,(err,result)=>
  {
    if(err)
      {
        throw new Error(err);
      }
      else
      {
        res.json(result);
      }
  })
})
app.get("/product",(req,res)=>
{
  console.log("i am hiting");
  db.query("select * from product",(err,result)=>
    {
      if(err)
        {
          console.log(err);
        }
        else
        {
          console.log(result);
          res.json(result);
        }

  })
})
// here defining the routes for the special sorting product;
app.get("/product/property/:property/value/:value",(req,res)=>{
  console.log(req.params);
  db.query(`select * from product where ${req.params.property}="${req.params.value}"`,(err,result)=>
  {
    if(err)
      {
        console.log(err);
      }
    else
  
    {
      res.json(result);
    }
  })

});

// Routes for the login
app.get("/login",(req,res)=>{
  // here getting the data from the database;
  db.query("select * from signup",(err,result)=>{
    if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(result);
        res.json(result);
     
      }
  })
 
})
// routes for the seller login
app.get("/sellerLogin",(req,res)=>{
  db.query("select * from seller",(err,result)=>
    {
    if(err)
      {
        console.log(err);
      }
    else
    {
      // console.log(result);
      res.json(result);
    }
  })
})
// changing the status when the customer login or seller login
app.put("/update/login",(req,res)=>
{
let {id,phone,mode}=req.body;
db.query(`update ${mode} set status="Inactive" where id !=${id}  `,(err,result)=>
  {

    if(err)
      {
        console.log(err);
        res.status(500).json("database error"+err);
      }

      else
      {
        console.log("sucessfully inactive" );
      }
  })
db.query(`update ${mode} set status="Active" where id=${id} and phone=${phone} `,(err,result)=>
  {

    if(err)
      {
        console.log(err);
        res.status(500).json("database error"+err);
      }

      else
      {
        console.log("login succefully" );
        // return  res.json(result);
      }
  })
})

//Router for signup the new customer
app.post('/signup', (req, res) => {
    const { user_name, phone, password, gender, dob } = req.body;

    // Validate input
    if (!user_name || !phone || !password || !gender || !dob) {
        return res.status(400).json({ error: "All fields are required: user_name, phone, password, gender, dob" });
    }

    const sql = 'INSERT INTO signup (user_name, phone, password, gender, dob) VALUES (?, ?, ?, ?, ?)';
    const values = [user_name, phone, password, gender, dob];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User added successfully" });
    });
});
// router for signup the new seller
app.post('/seller', (req, res) => {
  console.log("enter");
 const { user_name, phone, password, gender, dob } = req.body;
  if (!user_name || !phone || !password || !gender || !dob) {
      return res.status(400).json({ error: "All fields are required: user_name, phone, password, gender, dob" });
  }
  const sql = 'INSERT INTO seller(user_name, phone, password, gender, dob) VALUES (?, ?, ?, ?, ?)';
  const values = [user_name, phone, password, gender, dob];
  db.query(sql, values,  (err, result) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Database error" });
      }
      console.log(result);
      res.status(201).json({ message: "User added successfully" });
  });
});

// here handling the uploading photo
const storage=multer.memoryStorage();
const upload=multer({storage:storage});

// here handling the route for the product form 
app.post("/addProduct",upload.single('image'),(req,res)=>
{
  if(!req.file)
    {
      return res.status(400).send("no file uploaded");
    }
    const product_id=req.body.product_id;
    const seller_id=req.body.seller_id;
    const brand=req.body.brand;
    const type=req.body.type;
    const frame_material=req.body.frame_material;
    const weight=req.body.weight;
    const color=req.body.color;
    const price=req.body.price;
    const warrenty_period=req.body.warrenty_period;
    const image_name=req.file.originalname;
    const image=req.file.buffer;
    const Break=req.body.Break;
    const gear=req.body.gear;
    const discription=req.body.discription;

    const sql="insert into product(product_id,seller_id,brand,type,frame_material,weight,color,price,warrenty_period,image_name,image,break,gear,discription) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sql,[product_id,seller_id,brand,type,frame_material,weight,color,price,warrenty_period,image_name,image,Break,gear,discription],(err,result)=>
    {
      if(err)
        {
          console.error("database error:",err);
          return res.status(500).json({error:"database error"});
        }
        console.log(result)
        res.status(201).json({message:"the product is added successfully"});
        });
  })


  // here creating the routing for the product detail page
  app.get("/product/product_id/:product_id",(req,res)=>
  {
    console.log(req.params);
    db.query(`select * from product where product_id=${req.params.product_id}`,(err,result)=>
    {
      if(err)
        {
          console.log("the database error",err);
          console.log(err);
           res.status(500).json((err));
         }
         console.log(result);
        res.json(result);
     
    })

  })
// here hitting the server to get the similar type of the product
app.get("/product/brand/:brand/type/:type/discription/:discription",(req,res)=>
{
let cmp_prop=req.params;
console.log(cmp_prop);
db.query(`select * from product where 
  brand="${cmp_prop.brand}" 
  and type="${cmp_prop.type}" 
  and discription="${cmp_prop.discription}"`
  ,(err,result)=>
  {
    if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(result);
        res.json(result);
      }
  })


})

// here handling the delete request 
app.delete("/product/product_id/:product_id",(req,res)=>
{
  
  db.query(`delete from product where product_id=?`,[req.params.product_id],(err,result)=>
  {
    if(err)
      {
        console.log(err);
        res.json("error are generated"+err);
      }
    else
      {
        console.log("the product successfully delete")
        res.status(200).json(result);
      }
  })

})
// here handling the rating related information
app.get('/rating/id/:id',(req,res)=>
{
  console.log(req.params);
  db.query(`select * from rating where id=?`,[req.params.id],
    (err,result)=>{
      if(err)
        {
          res.json(err);
        }
        else
        {
          console.log(result);
          res.json(result);
        }

      })
  });
  app.get("/rating",(req,res)=>
  {
    db.query(`select id from signup 
      where status="Active" `,(err,result)=>
      {
        if(err)
          {
            console.log(err);
            res.json(err);
          }
          else
          {
            res.json(result);
          }
      })
  })
  app.post('/addRating',(req,res)=>
  {
    const{product_id,user_id,rating,review}=req.body;
    db.query(`insert into rating (product_id,user_id,rating,review) value(?,?,?,?)`,
      [product_id,user_id,rating,review],(err,result)=>
        {
          
          if(err)
            {
            console.log(err);
            return res.status(500).json({error:"database error"});
            }
          res.status(201).json({message:"the product is added successfully"});
         }

    )
  
  })

  app.get("/rating/data/:data/product_id/:product_id",(req,res)=>
  {
    let data=req.params.data;
    let product_id=req.params.product_id;
    
    if(data==0)
      {
        db.query(`select avg(rating) as avg_rating from rating where  product_id=${product_id}`,
          (err,result)=>
          {
            if(err)
              {
                console.log(err);
              }
              else
              {
                console.log(result);
                res.json(result); 
              }

          });
      }
      else if(data=="total")
      { 
        db.query(`select count(rating) as total_rating from rating where product_id=${product_id}`,
          (err,result)=>
          {
            if(err)
              {
                console.log(err);
              }
              else
              {
                console.log(result);
                res.json(result); 
              }

          });
        }


        else if(data==1)
          {

            db.query(`select count(user_id) as rating_${data} from rating where rating=${data} and product_id=${product_id}`,
              (err,result)=>
              {
                if(err)
                  {
                    console.log(err);
                  }
                  else
                  {
                    console.log(result);
                    res.json(result); 
                  }
    
              });

          }

        else if(data==2)
          {

            db.query(`select count(user_id) as rating_${data} from rating where rating=${data} and product_id=${product_id}`,
              (err,result)=>
              {
                if(err)
                  {
                    console.log(err);
                  }
                  else
                  {
                    console.log(result);
                    res.json(result); 
                  }
    
              });

          }
        else if(data==3)
          {

            db.query(`select count(user_id) as rating_${data} from rating where rating=${data} and product_id=${product_id}`,
              (err,result)=>
              {
                if(err)
                  {
                    console.log(err);
                  }
                  else
                  {
                    console.log(result);
                    res.json(result); 
                  }
    
              });

          }
        else if(data==4)
          {

            db.query(`select count(user_id) as rating_${data} from rating where rating=${data} and product_id=${product_id}`,
              (err,result)=>
              {
                if(err)
                  {
                    console.log(err);
                  }
                  else
                  {
                    console.log(result);
                    res.json(result); 
                  }
    
              });

          }
        else if(data==5)
        {  
          db.query(`select count(user_id) as rating_${data} from rating where rating=${data} and product_id=${product_id}`,
            (err,result)=>
            {
              if(err)
                {
                  console.log(err);
                }
                else
                {
                  console.log(result);
                  res.json(result); 
                }
  
            });

        }
  })

  // here maiking end point for displayin how much start
  app.get("/rating/data/:data",(req,res)=>
  {
    let data=req.params.data
     db.query(`select signup.user_name,rating.review,rating.created_at from signup inner Join rating on signup.id=rating.user_id where rating.rating=${data}`,(err,result)=>
    {
      if(err)
        {
          console.log(err);
        }
      else
        {
          console.log(result);
          res.json(result);
        }
    });

  })

  // here making end point for the the cart
  
  app.post('/addCart', (req, res) => {
  
    const customer_id = req.body.customer_id;
    const product_id = req.body.product_id;
    const discription = req.body.discription;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const brand=req.body.brand;
    const type=req.body.type;
  
    db.query(
      `INSERT INTO cart (customer_id, product_id, discription, quantity, price,brand,type) VALUES (?, ?, ?, ?, ?,?,?)`,
      [customer_id, product_id, discription, quantity, price,brand,type],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "database error" });
        }
  
        console.log(result);
        res.status(201).json({ message: "The product has been added to the cart successfully" });
      }
    );
  });
  

    // here taking id which status is active 
    app.get("/get_id",(req,res)=>
    {
     db.query(`select id from signup where status="Active"`,(err,result)=>
    {
      if(err)
        {
          console.log(err);
        }
        else
        {
          res.json(result);
        }
    })
    })
  
    // here working for the card 
app.get("/getCart/id/:id",(req,res)=>
{
  db.query(`select * from cart where customer_id=${req.params.id}`,
    (err,result)=>
      {
        if(err)
        {
          console.log(err)
        }
        else
        {
          res.json(result);
        }

     }
)
    
})

app.get("/photoGet/product_id/:product_id",(req,res)=>
  {

    db.query(`select image from product where product_id=${req.params.product_id}`,
      (err,result)=>
        {
          if(err)
          {
            console.log(err)
          }
          else
          {
            res.json(result);
          } 
  
       }
  )
      
  })

// here making the end point for  updting the status of the product
app.put("/update/product",(req,res)=>
{
   
 if(req.body.method=="reserved")
 { 
  db.query(`update product 
    set status="reserved" 
    where product_id=${req.body.id}`,
    (err,result)=>
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(result);
      }
    })
  }

  else if(req.body.method=="Clear")
  {
    
console.log("clear the status");
    db.query(`update product 
      set status="Clear" 
      where product_id=${req.body.id}`,
      (err,result)=>
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log(result);
        }
      })
  }

  else
  {

    db.query(`select status from product 
       where product_id=${req.body.id}`,
      (err,result)=>
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          console.log(result);
           res.json(result);
        }
      })
  }

})

// here updating the staus of the 
app.put("/update/cart",(req,res)=>
{
  let status=req.body.status;
  console.log(status);
  console.log(req.body.card_id);
  if(status=="Active")
  {
    db.query(`update cart 
      set status="Active"
      where card_id=${req.body.card_id}
      `,(err,result)=>
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
           res.json("the product status is succefully Active");
        }
      }
      )
  }
  else
  {
    db.query(`update cart 
      set status="Inactive"
      where card_id=${req.body.card_id}
      `,(err,result)=>
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
           res.json("the product status is succefully Inactive");
        }
      }
      )
  }

});

app.get("/cart/getTotal",(req,res)=>
{
  console.log("enter");
  db.query(`select sum(total_price) as total_price from cart where status="Active" `,(err,result)=>
  {
    if(err)
    {
      console.log(err);
      throw new Error(err);

    }
    else
    {
      console.log(result);
      res.json(result);

    }

  }
)
})
app.delete("/cart/deleteItem/card_id/:card_id",(req,res)=>
{
  console.log(req.params);
 db.query(`delete from cart where card_id=${req.params.card_id}`,(err,result)=>
{
  if(err)
  {
    console.log(err);
  }
  else
  {
    res.json(result);
  }
})
})

// here getting the customer_id from the rating table
app.get("/rating/get_id",(req,res)=>
{
  db.query("select user_id from rating",(err,result)=>
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.json(result);
    }
  })
})

app.put("/cart/quantity",(req,res)=>
{

  console.log("enter");
  console.log(req.body);
  db.query(`
    update cart 
    set quantity=${req.body.quantity}
    where card_id=${req.body.card_id}
    `,(err,result)=>
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(result);
      }
    })
});

// Start the server
const PORT =  8000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
