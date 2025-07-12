const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { Todo } = require("../database/index");
const { isValidObjectId } = require("mongoose");
const router = Router();

// todo Routes
router.post("/", userMiddleware, async (req, res) => {
  // Implement todo creation logic
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({
      msg: "title , description and category is required",
    });
  }
  const owner = req.user._id;
  if (!owner) {
    return res.status(401).json({
      msg: "Login to Add Todo",
    });
  }

  const todo = await Todo.create({
    title,
    description,
    category,
    owner,
  });
  if (!todo) {
    return res.status(500).json({
      msg: "Something wen wrong while creating the todo",
    });
  }
  return res.status(200).json({
    msg: "todo Created successfully",
    todo: todo,
  });
});

router.put("/:id", userMiddleware, async (req, res) => {
  // Implement update todo  logic
  const { id: todoId } = req.params;

  const { title, description, category } = req.body;

  if (!isValidObjectId(todoId)) {
    return res.status(400).json({
      msg: "Invalid TodoId",
    });
  }
  if (!title || !description || !category) {
    return res.status(401).json({
      msg: "Title , description and category is required",
    });
  }

  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(404).json({
      msg: "Todo not found",
    });
  }
    if (todo.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "You are not authorized to view this Todo",
      });
    }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      $set: {
        title,
        description,
        category,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    return res.status(500).json({
      msg: "Something went wrong while updating the Todo",
    });
  }
  return res.status(200).json({
    msg: "Successfully Updated",
    updatedTodo,
  });
});

router.delete("/:id", userMiddleware, async (req, res) => {
  // Implement delete todo by id logic
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ msg: "Invalid Todo ID" });
  }

  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  await Todo.findByIdAndDelete(id);

  return res.status(200).json({ msg: "Todo deleted successfully" });
});

router.get("/", userMiddleware, async (req, res) => {
  // Implement fetching all todo logic
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({
      msg: "User not found",
    });
  }

  const todos = await Todo.find({ owner: userId }).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    msg: "Fetched all todos successfully",
    todos: todos,
  });
});

router.get("/:id", userMiddleware,async (req, res) => {
  // Implement fetching todo by id logic
  const {id:todoId}=req.params
   if (!isValidObjectId(todoId)) {
    return res.status(400).json({
      msg: "Invalid TodoId",
    });
  }

  const todo=await Todo.findById(todoId);
    if (!todo) {
    return res.status(404).json({
      msg: "Todo not found",
    });
  }
    if (todo.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "You are not authorized to view this Todo",
      });
    }
  return res.status(200).json({
    msg:"Fetched the todo successfully",
    todo:todo
  })


  
});

module.exports = router;
