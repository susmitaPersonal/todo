const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require("./db");
const cors = require('cors')
const app = express();
const expressJson = express.json();

app.use(expressJson);

/**
 * expected request body shoud have title and description
 */
app.post("/todo", async (req, res)=>{
    console.log("req ::: ", res.statusCode, req.body)
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs"
        });
        return;
    };
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
});


app.get("/todos", async(req, res)=>{
    const todos = await todo.find({});
    console.log("to do s ::::::::::::::: ", todos);
    res.json({
        todos
    })
});


/**
 * expected request body shoud have todo id
 */
app.put("/completed", async(req, res)=>{
    const createPaylaod = req.body;
    const parsedPayload = updateTodo.safeParse(createPaylaod);
    if(!parsedPayload.success){
        req.status(411).json({
            msg : "You sent the wrong inputs"
        });
        return;
    };
    await todo.updateOne({
        _id: req.body.id
    }, {$set:{
        completed: true
    }})
    res.json({
        msg: "Todo marked as completed"
    })
});

app.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    const parsedPayload = updateTodo.safeParse({id});
    if(!parsedPayload.success){
        req.status(411).json({
            msg : "You sent the wrong inputs"
        });
        return;
    };
    await todo.deleteOne({"_id" : id})
    res.json({
        msg: "Todo item has deleted"
    })
});

app.listen(5000, (msg) => {
    console.log("Port hasbeen started")
})