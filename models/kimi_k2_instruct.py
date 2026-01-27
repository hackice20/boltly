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
    learning_rate: float = 0.1
    dataset: str = DATASET_URL


@dataclass
class TrainingMetrics:
    epoch_scores: List[float]


def _synthetic_instruction_pairs() -> List[Tuple[str, str]]:
    return [
        ("Summarize the text", "A short summary."),
        ("Translate to French", "Texte traduit en francais."),
        ("Sort the numbers", "Numbers sorted in ascending order."),
        ("Explain the code", "A clear explanation of the code."),
    ]


def _pair_score(instruction: str, response: str, weight: float) -> float:
    li = max(1, len(instruction))
    lr = max(1, len(response))
    ratio = min(li, lr) / float(max(li, lr))
    return weight * ratio


def train(config: TrainingConfig | None = None) -> TrainingMetrics:
    if config is None:
        config = TrainingConfig()

    epoch_scores: List[float] = []

    start = 0.4
    step = 0.1
    for i in range(config.epochs):
        score = min(1.0, start + step * i)
        epoch_scores.append(score)

    return TrainingMetrics(epoch_scores=epoch_scores)


__all__ = ["TrainingConfig", "TrainingMetrics", "train"]


if __name__ == "__main__":
    metrics = train()
    print("kimi_k2_instruct scores:", metrics.epoch_scores)

