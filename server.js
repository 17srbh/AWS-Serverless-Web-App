const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const serverless = require('serverless-http'); // Add this

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure AWS SDK for DynamoDB
AWS.config.update({
  region: "eu-north-1", // Change this to your AWS region
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Todos";

// Fetch all tasks
app.get('/todos', async (req, res) => {
  const params = { TableName: TABLE_NAME };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Could not retrieve tasks" });
  }
});

// Add a new task
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  const newTask = {
    id: uuidv4(),
    task: task,
  };

  const params = { TableName: TABLE_NAME, Item: newTask };
  try {
    await dynamoDB.put(params).promise();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Could not add task" });
  }
});

// Delete a task
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const params = { TableName: TABLE_NAME, Key: { id } };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Could not delete task" });
  }
});

// Export for Lambda
exports.handler = async (event, context) => {
  console.log("Event:", JSON.stringify(event));

  return await serverless(app)(event, context);
};
