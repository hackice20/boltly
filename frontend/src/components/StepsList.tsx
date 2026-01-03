import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Step } from '../types';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="glass-container-light h-full overflow-auto">
      <h2 className="text-lg font-serif font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-3 rounded-lg cursor-pointer transition-glass ${currentStep === step.id
                ? 'bg-primary-500/10 border border-primary-500/30'
                : 'hover:bg-white/5 border border-transparent'
              }`}
            onClick={() => onStepClick(step.id)}
          >
            <div className="flex items-center gap-3">
              {step.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-primary-500" />
              ) : step.status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-primary-400 animate-pulse" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="font-medium text-gray-100 text-sm">{step.title}</h3>
            </div>
            {step.description && (
              <p className="text-xs text-gray-400 mt-2 ml-8">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}