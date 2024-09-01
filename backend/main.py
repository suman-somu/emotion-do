from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, ValidationError
from typing import List
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import os
import json
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(dotenv_path=".env")

app = FastAPI()
sia = SentimentIntensityAnalyzer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Task(BaseModel):
    id: int
    description: str
    sentiment: str

class TaskCreate(BaseModel):
    description: str

tasks = []

def load_default_tasks():
    global tasks
    try:
        with open("backend/tasks.json", "r") as file:
            tasks = json.load(file)
    except FileNotFoundError:
        tasks = []

load_default_tasks()

@app.get("/tasks/", response_model=List[Task])
def get_tasks():
    return tasks

@app.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate = Body(..., example={
    "description": "Some task description"
})):
    try:
        task_id = len(tasks) + 1  
        sentiment_score = sia.polarity_scores(task.description)
        sentiment = "positive" if sentiment_score['compound'] >= 0.05 else "negative" if sentiment_score['compound'] <= -0.05 else "neutral"
        
        new_task = Task(id=task_id, description=task.description, sentiment=sentiment)
        tasks.append(new_task.dict())  
        return new_task
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return {"msg": "Task deleted"}, 200
