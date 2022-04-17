from fastapi import APIRouter, Depends
from contract import *
from pydantic import BaseModel


class Worker(BaseModel):
    name: str
    


router = APIRouter(
    prefix='/worker',
    tags=['worker']
)


@router.get('/')
def index():
    return getWorkersList()


@router.post('/')
def index(worker: Worker):
    return setWorker(worker.name)
