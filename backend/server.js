const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000; 
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes')
const {errorHandler}= require('./middleware/errorMiddleware');
const connectDB =require('./config/db')
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

