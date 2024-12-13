const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(path.join(__dirname))); // Cargue de página form.html y form.css
app.use(express.urlencoded({extendend:true}))

mongoose.connect('mongodb://127.0.0.1:27017/referidos') //Conexión con la BD 
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection sucesfull")
})

const userSchema = new mongoose.Schema({ //Paramteros del form que se van a recoger y pasar a la BD
    name: String,
    phone: String,
    email: String,
    program: String,
    code: String
})

const Users = mongoose.model("data",userSchema)


app.get('/form', (req, res) => { //Se tiene que poner en el buscador => http://localhost:3019/form
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post',async(req,res)=>{
    const {name,phone,email,program,code} = req.body
    const user = new Users({
        name,
        phone,
        email,
        program,
        code
    })
    await user.save()
    console.log(user)
    // Redirige a la misma página pero con el parámetro 'success=true'
    res.redirect('/form?success=true');
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})
