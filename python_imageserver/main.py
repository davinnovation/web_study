from typing import Optional, List
from fastapi import FastAPI, File, UploadFile, Request
from sqlmodel import Field, Session, SQLModel, create_engine, select
from pydantic import BaseModel
from network import Network
import requests
from PIL import Image as ImagePIL
import torchvision as tv

app = FastAPI()
network = Network()
network.model.eval()


class Image(SQLModel, table=True):
    key: Optional[int] = Field(default=None, primary_key=True)
    image_name: str
    label: str
    image_url: str

engine = create_engine("sqlite:///image.db")

@app.get("/")
def read_images():
    with Session(engine) as session:
        statement = select(Image)
        images = session.exec(statement).all()
        return images

class Item(BaseModel):
    key: int
    label: str = ""

@app.post("/")
def update_heroes(item: Item):
    with Session(engine) as session:
        statement = select(Image).where(Image.key == item.key)
        results = session.exec(statement)
        image = results.one()
        image.label = item.label
        session.add(image)
        session.commit()

@app.get("/predict/{item}")
def predict(item: int):
    import torch
    import numpy as np
    with Session(engine) as session:
        statement = select(Image).where(Image.key == item)
        results = session.exec(statement)
        image = results.one()
        image_url = image.image_url
        img = ImagePIL.open(requests.get(image_url, stream=True).raw)
        img = tv.transforms.functional.pil_to_tensor(img).float().unsqueeze(0)
        with torch.no_grad():
            result = network.model(img)
            result = torch.nn.functional.softmax(result)
            ret = {
                '1' : float(result[0][0]), '2': float(result[0][1])
            }
            return str(ret)


@app.post("/upload_image")
async def upload_image(files: List[UploadFile]):
    # return {"filenames": [file.filename for file in files]}
    from minio import Minio
    import io
    with Session(engine) as session:
        client = Minio(
            "localhost:9001",
            secure=False,
            access_key="EXAVEJZMEVFXX0Q608ET",
            secret_key="xNWX4mrfavyKlmzw0MWoLv3E6Irt4yhz85VC+TjS"
        )

        for item in files:
            image_name = item.filename
            cont = await item.read()
            content = io.BytesIO(cont)
            length = len(content.read())
            content = io.BytesIO(cont)
            client.put_object(
                "image", image_name, content, length
            )
            image_url = f"http://localhost:9001/image/{image_name}"
            data = Image(image_name=image_name[:-4], label="", image_url=image_url)
            session.add(data)
            session.commit()