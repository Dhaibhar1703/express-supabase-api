require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API running smoothly' });
});

// GET: Retrieve all tasks from Supabase
app.get('/api/tasks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: Insert a new task into Supabase
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, is_complete: false }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ success: true, data: data[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server live on http://localhost:${PORT}`);
});