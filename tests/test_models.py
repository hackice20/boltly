from models.claude_sonnet_4_5 import TrainingConfig as ClaudeConfig, train as train_claude
from models.llama3_70b import TrainingConfig as LlamaConfig, train as train_llama
from models.gpt_5_2 import TrainingConfig as GptConfig, train as train_gpt
from models.gemini_2_5_pro import TrainingConfig as GeminiConfig, train as train_gemini
from models.kimi_k2_instruct import TrainingConfig as KimiConfig, train as train_kimi


def _is_strictly_decreasing(seq):
    return all(a > b for a, b in zip(seq, seq[1:]))


def _is_non_decreasing(seq):
    return all(a <= b for a, b in zip(seq, seq[1:]))


def test_claude_training_losses_decrease():
    config = ClaudeConfig(epochs=3, batch_size=4, learning_rate=0.01)
    metrics = train_claude(config)
    assert len(metrics.epoch_losses) == config.epochs
    assert _is_strictly_decreasing(metrics.epoch_losses)


def test_llama_training_accuracy_increases():
    config = LlamaConfig(epochs=4, batch_size=8, learning_rate=0.05)
    metrics = train_llama(config)
    assert len(metrics.epoch_accuracies) == config.epochs
    assert _is_non_decreasing(metrics.epoch_accuracies)


def test_gpt_training_harmonic_loss():
    config = GptConfig(epochs=5, learning_rate=0.2)
    metrics = train_gpt(config)
    assert len(metrics.epoch_losses) == config.epochs
    assert metrics.epoch_losses[0] > metrics.epoch_losses[-1]


def test_gemini_training_cosine_increases():
    config = GeminiConfig(epochs=4, learning_rate=0.05)
    metrics = train_gemini(config)
    assert len(metrics.epoch_cosine_sim) == config.epochs
    assert _is_non_decreasing(metrics.epoch_cosine_sim)


def test_kimi_training_scores_increase():
    config = KimiConfig(epochs=3, learning_rate=0.1)
    metrics = train_kimi(config)
    assert len(metrics.epoch_scores) == config.epochs
    assert _is_non_decreasing(metrics.epoch_scores)


