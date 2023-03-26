const express = require("express")
const uuid = require("uuid")

const app = express()
const port = 3000

app.use(express.json())

const clientId = (request , response , next) =>{
    const {id} = request.params
    const index = orderList.findIndex(user => user.id === id)
        if(index < 0) {
            return response.status(201).json({Error : "Order not found"})
        }
    request.clientIndex = index
    
    next()
}

const methodAndUrl = (request , response , next) => {
    console.log(request.method , request.url)
        
    next()
}

const orderList = []

app.post('/order' , methodAndUrl , (request , response) => {
    const {order , clientName , price} = request.body
    const client = {id:uuid.v4() , order , clientName , price , status:"Em andamento"}

        orderList.push(client)

    return response.status(201).json(client)
})

app.get('/order' , methodAndUrl , (request , response) => {
    return response.json(orderList)
})

app.get('/order/:id' , clientId , methodAndUrl , (request , response) => {
    const {id} = request.params
    const index = request.clientIndex
    const {order , clientName , price , status} = orderList[index]
    console.log(orderList[index])
    
    return response.json({id , order , clientName , price , status})
})

app.put('/order/:id' , clientId , methodAndUrl , (request , response) => {
    const {id} = request.params
    const {order , clientName , price , status} = request.body
    const index = request.clientIndex
    const clientUpdate = {id , order , clientName , price , status}

        orderList[index] = clientUpdate

    return response.json(clientUpdate)
})

app.delete('/order/:id' , clientId , methodAndUrl , (request , response) => {
    const index = request.clientIndex
        
        orderList.splice(index , 1)
    
    return response.status(204).json()
})

app.patch('/order/:id' , clientId , methodAndUrl , (request , response) => {
    const {id} = request.params
    const index = request.clientIndex
    const {order , clientName , price} = orderList[index]

    return response.json({id , order , clientName , price , status:"Pronto"})
})

app.listen(port , () => {
    console.log(`Port: ${port}`)
})