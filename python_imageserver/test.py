from glob import glob
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Image(SQLModel, table=True):
    key: Optional[int] = Field(default=None, primary_key=True)
    image_name: str
    label: str
    image_url: str

engine = create_engine("sqlite:///image.db")

def read_images():
    with Session(engine) as session:
        statement = select(Image)
        images = session.exec(statement).all()
        return images
    
read_images()