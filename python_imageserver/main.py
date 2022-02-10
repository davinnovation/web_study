from typing import Optional
from fastapi import FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select
from pydantic import BaseModel

app = FastAPI()

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
    label: str

@app.post("/")
def update_heroes(item: Item):
    with Session(engine) as session:
        statement = select(Image).where(Image.key == item.key)
        results = session.exec(statement)
        image = results.one()
        image.label = item.label
        session.add(image)
        session.commit()