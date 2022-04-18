from fastapi import APIRouter, Depends
from contract import *
from pydantic import BaseModel


class Product(BaseModel):
    name: str
    price: str
    description: str
    data: str
    
class Status(BaseModel):
    location :str
    data :str
    wid :int
    pid :int
    flag :bool
    
class Data(BaseModel):
    temp:int
    humidity:int
    heatindex:int
    pid:int

router = APIRouter(
    prefix='/product',
    tags=['product']
)



@router.get('/')
def index():
    return getProducts()

@router.get("/status/{id}")
def index(id:int):
    return getProductStatus(id)
    

@router.post('/')
def index(product: Product):
    return AddProduct(product.name, product.price, product.description, product.data)

@router.post('/status')
def index(status:Status):
    return AddStatus(status.location, status.data,status.wid,status.pid,status.flag)


@router.post('/data')
def index(data: Data):
    return AddData(data.temp,data.humidity,data.heatindex, data.pid)


@router.get("/data/{id}")
def index(id: int):
    return getProductData(id)
