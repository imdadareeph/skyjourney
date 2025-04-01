import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface Step {
  name: string;
  status: StepStatus;
  path?: string; // Optional path to navigate to
}

interface StepIndicatorProps {
  steps: Step[];
  className?: string;
  onStepClick?: (index: number, path?: string) => void;
}

const StepIndicator = ({ steps, className, onStepClick }: StepIndicatorProps) => {
  return (
    <div className={cn("border-b", className)}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center">
            {steps.map((step, stepIdx) => (
              <li 
                key={step.name} 
                className="relative flex items-center"
              >
                {/* Step circle with icon/number */}
                <div 
                  className={cn(
                    "flex items-center",
                    step.status !== 'upcoming' && "cursor-pointer"
                  )}
                  onClick={() => {
                    if (step.status !== 'upcoming' && onStepClick) {
                      onStepClick(stepIdx, step.path);
                    }
                  }}
                >
                  {step.status === 'complete' ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0078D2] flex"
                    >
                      <Check className="h-5 w-5 text-white" />
                    </motion.div>
                  ) : step.status === 'current' ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-[#0078D2] bg-white relative"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0078D2]" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0078D2] opacity-30"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0078D2]"></span>
                      </span>
                    </motion.div>
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-gray-300">
                      <span className="text-sm text-gray-500">{stepIdx + 1}</span>
                    </div>
                  )}
                  
                  {/* Step name */}
                  <span 
                    className={cn(
                      "ml-4 text-sm font-medium",
                      step.status === 'complete' && "text-[#0078D2]",
                      step.status === 'current' && "text-[#0078D2]",
                      step.status === 'upcoming' && "text-gray-500",
                      step.status !== 'upcoming' && "cursor-pointer"
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                
                {/* Connector line */}
                {stepIdx < steps.length - 1 && (
                  <div className="flex items-center ml-4 mr-4">
                    <div 
                      className={cn(
                        "h-0.5 w-16",
                        step.status === 'complete' ? "bg-[#0078D2]" : "bg-gray-300"
                      )}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default StepIndicator; 