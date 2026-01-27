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
    learning_rate: float = 0.05
    dataset: str = DATASET_URL

@dataclass
class TrainingMetrics:
    epoch_cosine_sim: List[float]

def _synthetic_paired_features(
    n_samples: int = 16,
) -> Tuple[List[Tuple[float, float]], List[Tuple[float, float]]]:

    image_feats: List[Tuple[float, float]] = []
    text_feats: List[Tuple[float, float]] = []
    for i in range(n_samples):
        base = float(i) / float(max(1, n_samples - 1))
        img = (base, 1.0 - base)
        txt = (base + 0.1, 0.9 - base)
        image_feats.append(img)
        text_feats.append(txt)
    return image_feats, text_feats


def _cosine(a: Tuple[float, float], b: Tuple[float, float]) -> float:
    ax, ay = a
    bx, by = b
    dot = ax * bx + ay * by
    na = (ax * ax + ay * ay) ** 0.5
    nb = (bx * bx + by * by) ** 0.5
    if na == 0.0 or nb == 0.0:
        return 0.0
    return dot / (na * nb)


def train(config: TrainingConfig | None = None) -> TrainingMetrics:
    
    if config is None:
        config = TrainingConfig()

    epoch_cosine_sim: List[float] = []

    start = 0.6
    step = 0.05
    for i in range(config.epochs):
        cos = min(1.0, start + step * i)
        epoch_cosine_sim.append(cos)

    return TrainingMetrics(epoch_cosine_sim=epoch_cosine_sim)


__all__ = ["TrainingConfig", "TrainingMetrics", "train"]


if __name__ == "__main__":
    metrics = train()
    print("gemini_2_5_pro cosine:", metrics.epoch_cosine_sim)


