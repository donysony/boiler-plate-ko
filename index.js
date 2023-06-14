const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kyeongseon:abcd1234@cluster0.xlsumgg.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology:true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! node 실행~')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})