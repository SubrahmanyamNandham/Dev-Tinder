const express = require("express");
const connectDB = require("./config/database");
const app = express();

app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/", authRouter);

connectDB()
.then(()=>{
    console.log("db Connected")
    app.listen(5000, ()=>{
        console.log('server running')
    })
})
.catch((err) => {
    console.log("error")  
}
)
