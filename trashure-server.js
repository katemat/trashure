const express = require('express')
const app = express()
const port = 8080
// const pg = require('pg')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/login', (req, res)=>{
    res.render('log-in')
})

app.get('/signup', (req, res)=>{
    res.render('sign-up')
})

app.get('/myitems', (req,res)=>{
    res.render('view-my-items')
})

app.get('/new', (req, res) => {
    res.render('new-item')
})

app.post('/new', (req,res) => {
    
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


