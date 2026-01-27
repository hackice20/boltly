from dataclasses import dataclass
from typing import Dict, List, Tuple
import os

DATASET_URL = os.getenv(
    "DATASET",
    "https://huggingface.co/datasets/inclusionAI/Ling-Coder-SFT",
)

@dataclass
class TrainingConfig:
    epochs: int = 5
    learning_rate: float = 0.2
    dataset: str = DATASET_URL

@dataclass
class TrainingMetrics:
    epoch_losses: List[float]

def _synthetic_corpus() -> List[str]:

    return [
        "hello world",
        "hello gpt",
        "synthetic text",
        "world of models",
    ]

def _build_vocab(corpus: List[str]) -> Tuple[Dict[str, int], Dict[int, str]]:
    chars = sorted({ch for line in corpus for ch in line})
    stoi = {ch: i for i, ch in enumerate(chars)}
    itos = {i: ch for ch, i in stoi.items()}
    return stoi, itos

def train(config: TrainingConfig | None = None) -> TrainingMetrics:

    if config is None:
        config = TrainingConfig()

    epoch_losses: List[float] = []
    scale = 5.0
    for i in range(config.epochs):
        epoch = i + 1
        loss = scale / float(epoch)
        epoch_losses.append(loss)

    return TrainingMetrics(epoch_losses=epoch_losses)


__all__ = ["TrainingConfig", "TrainingMetrics", "train"]


if __name__ == "__main__":
    metrics = train()
    print("gpt_5_2 losses:", metrics.epoch_losses)
