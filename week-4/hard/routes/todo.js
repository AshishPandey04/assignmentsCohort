const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const {Todo}= require("../database/index")
const { isValidObjectId } = require("mongoose")
const router = Router();

// todo Routes
router.post('/',userMiddleware ,async (req, res) => {
    // Implement todo creation logic
    const {title,description,category}=req.body;
    if(title || description||category){
      return  res.status(400).json({
            msg:"title , description and category is required"
        })
    }
    const owner = req.user
    if(!user){
       return res.status(401)
        .json({
            msg:"Login to Add Todo"

        })

    }

    const todo= await Todo.create({
        title,
        description,
        category,
        owner,
    })
    if(!todo){
      return  res.status(500).json({
            msg:"Something wen wrong while creating the todo"
        })
    }
    return res.status(200).json({
        msg:"todo Created successfully",
        todo:todo

    })
});

router.put('/:id', userMiddleware, async (req, res) => {
    // Implement update todo  logic
    const {todoId}=req.params
    const {title,description,category}=req.body

    if(!isValidObjectId(todoId)){
        return res.status(400).json({
            msg:"Invalid TodoId"
        })
    }
    if(title ===""|| description===""|| category===""){
        return res.status(401).json({
            msg:"Title , description and category is required"
        })
    }

    const todo = await Todo.findById(todoId)
    if(!todo){

        return res.status(404).json({
            msg:"Todo not found"
        })
    }

    const updatedTodo= await Todo.findByIdAndUpdate(
        todoId,
        {
            $set:{
                title,
                description,
                category
            }

        },{
            new:true

        }
    )

    if(!updatedTodo){
        return res.status(500).json({
            msg:"Something went wrong while updating the Todo"
        })
    }
    return res.status(200).json({
        msg:"Successfully Updated",
        updatedTodo
    })
    

});

router.delete('/', userMiddleware, (req, res) => {
    // Implement delete todo logic
});

router.delete('/:id', userMiddleware, (req, res) => {
    // Implement delete todo by id logic
});


router.get('/', userMiddleware, (req, res) => {
    // Implement fetching all todo logic
});

router.get('/:id', userMiddleware, (req, res) => {
    // Implement fetching todo by id logic
});

module.exports = router;