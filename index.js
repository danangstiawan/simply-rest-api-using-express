import express from "express";

const app = express()
const PORT = 5009;

app.use(express.json())

// Sample data
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a REST API', completed: false }
  ];
  
  // Get all todos
  app.get('/todos', (req, res) => {
    // console.log(req)
    res.json(todos);
  });
  
  // Get a single todo
  app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  });
  
  // Create a new todo
  app.post('/todos', (req, res) => {
    const { title } = req.body;
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });
  
  // Update a todo
  app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.title = title || todo.title;
      todo.completed = completed || todo.completed;
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  });
  
  // Delete a todo
  app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1);
      res.json(deletedTodo[0]);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  });
app.listen(PORT, () => console.log(`Server Running on port http://localhost${PORT}`))