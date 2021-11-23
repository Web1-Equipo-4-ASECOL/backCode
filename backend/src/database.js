const mongoose = require('mongoose')

URL=('mongodb://localhost/db_asecol')

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(db=>console.log('Estas conectado a: ',db.connection.name))

module.exports =  mongoose


