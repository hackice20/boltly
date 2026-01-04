import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Step } from '../types';

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
  isDarkMode: boolean;
}

export function StepsList({ steps, currentStep, onStepClick, isDarkMode }: StepsListProps) {
  const colors = {
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#a1a1aa' : '#71717a',
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
    cardBg: isDarkMode ? '#27272a' : '#f4f4f5',
    cardBgHover: isDarkMode ? '#3f3f46' : '#e4e4e7',
    border: isDarkMode ? '#3f3f46' : '#d4d4d8',
    iconBg: isDarkMode ? '#27272a' : '#e4e4e7',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {steps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: colors.textDim, fontSize: '12px' }}>No steps yet...</p>
        </div>
      ) : (
        steps.map((step) => (
          <div
            key={step.id}
            onClick={() => onStepClick(step.id)}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: currentStep === step.id ? colors.cardBg : 'transparent',
              border: currentStep === step.id
                ? `1px solid ${colors.border}`
                : '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (currentStep !== step.id) {
                e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== step.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.iconBg,
                  flexShrink: 0,
                }}
              >
                {step.status === 'completed' ? (
                  <CheckCircle style={{ width: '12px', height: '12px', color: colors.text }} />
                ) : step.status === 'in-progress' ? (
                  <Clock style={{ width: '12px', height: '12px', color: colors.textMuted }} />
                ) : (
                  <Circle style={{ width: '12px', height: '12px', color: colors.textDim }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontWeight: 500,
                    color: step.status === 'completed' ? colors.text : colors.textMuted,
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {step.title}
                </h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}