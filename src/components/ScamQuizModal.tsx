import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { playPopSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ScamQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  scenario: string;
  isScam: boolean;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: "An 'HR Recruiter' sends a WhatsApp text stating: 'Congratulations! You are shortlisted for the Woolworths Admin Learnership. Deposit R250 via PEP Paxi for uniform processing and medical clearance before the interview.'",
    isScam: true,
    explanation: "SCAM! Legitimate employers like Woolworths, Capitec, or government SETAs NEVER charge candidates for uniforms, admin badges, medicals, or interview slots."
  },
  {
    id: 2,
    scenario: "You receive an email from 'careers@standardbank.co.za' directing you to their official corporate career portal to complete a 20-minute numerical reasoning and problem-solving assessment.",
    isScam: false,
    explanation: "LEGITIMATE! Standard Bank and corporate employers use official company domain email addresses and standardized psychometric/cognitive tests with zero fees."
  },
  {
    id: 3,
    scenario: "A recruiter on Facebook offers an immediate R12,000/mo remote data entry job, but requires you to send your online banking password and SMS OTP so their payroll department can 'configure direct deposit.'",
    isScam: true,
    explanation: "CRITICAL SCAM! Employers only require your official Bank Confirmation Letter or stamped statement. Never share an OTP, PIN, or password with anyone."
  },
  {
    id: 4,
    scenario: "An agency contacts you about an accredited SETA learnership on a free 0800 toll-free number and asks you to bring certified copies of your Smart ID and Matric statement of results to an official corporate training campus.",
    isScam: false,
    explanation: "LEGITIMATE! Official SETA and corporate programmes require verified SAPS-certified identification copies and conduct interviews at verified physical locations."
  }
];

export const ScamQuizModal: React.FC<ScamQuizModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[currentIndex];

  const handleAnswer = (answer: boolean) => {
    if (isAnswered) return;
    playPopSound();
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQ.isScam) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      playSuccessSound();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="w-full max-w-xl border border-[rgba(255,182,217,0.25)] rounded-2xl overflow-hidden shadow-2xl bg-[#0b0914] text-[#f3effa]"
        role="dialog"
        aria-modal="true"
        aria-label="Spot The Recruitment Scam Quiz"
      >
        {/* Header */}
        <div className="p-5 border-b border-[rgba(255,182,217,0.18)] bg-[#161226]/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ff85c0] text-[#0b0914] flex items-center justify-center font-bold glow-pink">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg uppercase tracking-tight leading-none text-[#f3effa]">
                SPOT THE SCAM QUIZ
              </h3>
              <span className="text-[10px] font-mono text-[#a69db9] uppercase">
                60-Second Recruitment Fraud Test
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[rgba(255,182,217,0.2)] text-[#a69db9] hover:text-[#f3effa] hover:border-[#ff85c0]"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#a69db9]">
                <span>Question {currentIndex + 1} of {QUESTIONS.length}</span>
                <span className="text-[#80d8ff] font-bold">Score: {score}/{currentIndex}</span>
              </div>

              {/* Scenario Box */}
              <div className="p-4 rounded-xl bg-[#161226] border border-[rgba(255,182,217,0.15)] text-sm leading-relaxed text-[#f3effa]">
                "{currentQ.scenario}"
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={isAnswered}
                  className={`p-3 rounded-xl border font-heading font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                    isAnswered && currentQ.isScam
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : selectedAnswer === true && !currentQ.isScam
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-400 opacity-50'
                      : 'bg-[#161226] text-[#ff85c0] border-[#ff85c0]/40 hover:bg-[#ff85c0]/20'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>It's a Scam!</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  disabled={isAnswered}
                  className={`p-3 rounded-xl border font-heading font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                    isAnswered && !currentQ.isScam
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : selectedAnswer === false && currentQ.isScam
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-400 opacity-50'
                      : 'bg-[#161226] text-[#80d8ff] border-[#80d8ff]/40 hover:bg-[#80d8ff]/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Legitimate</span>
                </button>
              </div>

              {/* Feedback Explanation */}
              {isAnswered && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                  selectedAnswer === currentQ.isScam 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                    : 'bg-red-950/40 border-red-500/50 text-red-200'
                }`}>
                  <strong className="block mb-1 uppercase font-mono">
                    {selectedAnswer === currentQ.isScam ? '🎯 Correct!' : '⚠️ Watch Out!'}
                  </strong>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="pt-2 text-right">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink"
                  >
                    {currentIndex < QUESTIONS.length - 1 ? 'Next Question →' : 'View Results 🏆'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff85c0] to-[#b388ff] text-[#0b0914] mx-auto flex items-center justify-center glow-pink">
                <Trophy className="w-8 h-8" />
              </div>

              <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-[#f3effa]">
                QUIZ COMPLETED!
              </h4>

              <p className="text-sm font-mono text-[#80d8ff]">
                You scored {score} out of {QUESTIONS.length}
              </p>

              <p className="text-xs text-[#a69db9] max-w-sm mx-auto leading-relaxed">
                {score === QUESTIONS.length
                  ? "Outstanding! You possess sharp scam-detection skills and know your rights as a South African jobseeker."
                  : "Good effort! Remember: legitimate employers NEVER charge application, uniform, medical or interview fees."}
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[rgba(255,182,217,0.3)] bg-[#161226] text-[#f3effa] text-xs font-mono font-bold uppercase hover:border-[#ff85c0]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#80d8ff] text-[#0b0914] font-heading font-black text-xs uppercase hover:bg-[#80d8ff]/90 glow-cyan"
                >
                  Got It, Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
