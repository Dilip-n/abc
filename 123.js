const express = require("express");

const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT
const connUri = process.env.DBURI

// mongoose.connect(
//   `${connUri}`,
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   },
//   function (err, db) {
//     if (err) {
//       console.log("<----------------------------------------------->");
//       // logger.error("DB filed to connect : " + err.message);
//       console.log("<----------------------------------------------->");
//       return;
//     } else {
//       // logger.info(`DB Connected successfully : ${connUri}`);
//       console.log("<----------------------------------------------->");
//     }
//   }
// );

mongoose.connect(
  'mongodb://localhost:27017/abc-app',{
    useNewUrlParser: true,
     useUnifiedTopology: true 
  }, (err, db)=>{
    if(err){
      console.log("<----------------------------------------------->");
    }else {
     
          console.log("<------DB is connected ----------------------------------------->");
           }
  }
)

app.listen(5000, ()=>{
  console.log('server is up')
})

// app.listen(port, () => {
//   console.log("<----------------------------------------------->");
//   // logger.info("Server now running in " + " mode ");
//   console.log("<----------------------------------------------->");
//   // logger.info("Server lististing at port : " + port);
//   console.log("<----------------------------------------------->");
//   console.log("Server Conneted to DB = " + connUri);
// });


//  const express = require('express')
//  app = express();
//  app.get('/',(req, res)=>{
//  res.send('Hello world')
//   })
//  app.listen(5000,()=>{
//    console.log('app listening in port number 5000');
// })

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));


// const books = [ { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 }, { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 }, { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 }, { id: 4, name: 'The Fellowship of the Ring', authorId: 2 }, { id: 5, name: 'The Two Towers', authorId: 2 }, { id: 6, name: 'The Return of the King', authorId: 2 }, { id: 7, name: 'The Way of Shadows', authorId: 3 }, { id: 8, name: 'Beyond the Shadows', authorId: 3 } ]

db.books.update({"id": {$gt:8}, {"ib": 5,"name":"sadguru rally for rivers", "authorId":10},{upsert: true }})

// db.books.find()

// const promis = new Promise(function (resolve, reject) { 

//    resolve( setTimeout(console.log('Hell world'), 5000))
// })

// const abc = async (promise)=>{
//     try{
//       const abcd = await promise
//       console.log(abcd)
//     }catch(e){
//         console.log(e)
//     }
// }

    // const express = require('express')
    // const app = express()
    
    // app.get('/', function (req, res) {
    //   res.send('Hello World')
    // })
    
    // app.listen(3000)

    // const myPromise = new Promise((resolve, reject) => {
       
    //  const timeOut =   setTimeout(() => {console.log('hellow')}, 5000)
    // then((response)=>{
    //     resolve(response);
    // })
    // .catch((err)=>{
    //     reject(err)
    // })
    // })

    //   myPromise
      
      const p = new Promise((resolve,reject)=>{
      
      const a = 1+1
        if(a==2) {
            resolve(setTimeout(()=>{
                console.log('Hellow world')
            }, 5000)) 
        }

        else{
            reject('error')
        }
           
      })

            async (message)=>{
                await p
            }
