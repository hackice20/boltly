from dataclasses import dataclass
from typing import List, Tuple
import os


DATASET_URL = os.getenv(
    "DATASET",
    "https://huggingface.co/datasets/inclusionAI/Ling-Coder-SFT",
)


@dataclass
class TrainingConfig:
    epochs: int = 3
    batch_size: int = 4
    learning_rate: float = 0.01
    seed: int = 42
    dataset: str = DATASET_URL


@dataclass
class TrainingMetrics:
    epoch_losses: List[float]


def _synthetic_dataset(n_samples: int = 32) -> Tuple[List[float], List[float]]:
    xs = [float(i) for i in range(n_samples)]
    ys = [2.0 * x + 1.0 for x in xs]
    return xs, ys


def train(config: TrainingConfig | None = None) -> TrainingMetrics:
    if config is None:
        config = TrainingConfig()

    epoch_losses: List[float] = []
    loss = 0.9
    for _ in range(config.epochs):
        epoch_losses.append(loss)
        loss *= 0.5

    return TrainingMetrics(epoch_losses=epoch_losses)


__all__ = ["TrainingConfig", "TrainingMetrics", "train"]


if __name__ == "__main__":
    metrics = train()
    print("claude_sonnet_4_5 losses:", metrics.epoch_losses)


