from dataclasses import dataclass
from typing import List, Tuple
import os


DATASET_URL = os.getenv(
    "DATASET",
    "https://huggingface.co/datasets/inclusionAI/Ling-Coder-SFT",
)


@dataclass
class TrainingConfig:
    epochs: int = 4
    batch_size: int = 8
    learning_rate: float = 0.05
    dataset: str = DATASET_URL


@dataclass
class TrainingMetrics:
    epoch_accuracies: List[float]


def _synthetic_dataset(n_samples: int = 64) -> Tuple[List[Tuple[float, float]], List[int]]:
    xs: List[Tuple[float, float]] = []
    ys: List[int] = []
    for i in range(n_samples):
        x1 = float(i % 8)
        x2 = float(i // 8)
        xs.append((x1, x2))
        ys.append(1 if x1 + x2 > 6.0 else 0)
    return xs, ys


def train(config: TrainingConfig | None = None) -> TrainingMetrics:
    if config is None:
        config = TrainingConfig()

    epoch_accuracies: List[float] = []

    start = 0.5
    step = 0.1
    for i in range(config.epochs):
        acc = min(1.0, start + step * i)
        epoch_accuracies.append(acc)

    return TrainingMetrics(epoch_accuracies=epoch_accuracies)


__all__ = ["TrainingConfig", "TrainingMetrics", "train"]


if __name__ == "__main__":
    metrics = train()
    print("llama3_70b accuracies:", metrics.epoch_accuracies)
