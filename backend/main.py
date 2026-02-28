from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from planner.dosha_mapper import map_dosha_phases
from planner.task_scheduler import schedule_tasks
from planner.interventions import detect_and_inject

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    name: str
    type: str

from typing import Optional

class PlannerRequest(BaseModel):
    wake_time: str
    sleep_time: str
    work_hours: Optional[list] = []
    stress_level: Optional[str] = "Medium"
    tasks: Optional[list] = []

@app.post("/generate-planner")
def generate_planner(data: PlannerRequest):

    # Default values if frontend doesn't send them
    work_hours = data.work_hours or [["09:00", "17:00"]]
    stress = data.stress_level or "Medium"
    tasks = data.tasks or [
        {"name": "Deep Work Block", "type": "Deep Work"},
        {"name": "Creative Session", "type": "Creative"},
        {"name": "Light Admin", "type": "Light Work"}
    ]

    phases = map_dosha_phases(data.wake_time, data.sleep_time)

    schedule = schedule_tasks(
        tasks,
        phases,
        stress,
        work_hours
    )

    enriched_schedule, intervention_log = detect_and_inject(schedule)

    return {
        "phases": phases,
        "schedule": enriched_schedule,
        "interventions": intervention_log
    }