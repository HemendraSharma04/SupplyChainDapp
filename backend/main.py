import json
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
#from contract import *
from router import worker
from router import product

app = FastAPI()
app.include_router(worker.router)
app.include_router(product.router)



@app.get('/')
def index():
  return {'message': 'Hello world!'}


origins=['http://localhost:3000/']
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=5000)
