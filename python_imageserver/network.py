import torchvision as tv
import torch.nn as nn

class Network:
    def __init__(self, num_classes:int=2):
        super().__init__()
        model = tv.models.resnet18(pretrained=True)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
        self.model = model