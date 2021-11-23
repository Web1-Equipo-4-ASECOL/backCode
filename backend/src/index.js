const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
require('./database')
const apiRouter = require('./routes/index');


app.set('port',process.env.PORT || 4000)
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors({origen: '*'}))

app.use('/api', apiRouter)


app.listen(app.get('port'),()=>{
    console.log('Conectado al servidor: ',app.get('port'))
})