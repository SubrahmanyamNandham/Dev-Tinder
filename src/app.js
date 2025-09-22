const express = require("express");
const connectDB = require("./config/database");
const express = require('express');
const tasksRouter = require('./routes/tasks');
const analyticsRouter = require('./analytics');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(express.json());

const authRouter = require("./routes/auth");

app.use("/", authRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/tasks', tasksRouter);
app.use('/analytics', analyticsRouter);

// Error handler
app.use(errorHandler);


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
