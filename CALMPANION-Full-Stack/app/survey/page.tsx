'use client';

import React, { useState } from 'react';
import { ClipboardList, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const quizTypes = {
  general: {
    name: 'General Mental Health',
    questions: [
      {
        id: 1,
        question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        id: 2,
        question: "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      }
    ]
  },
  adhd: {
    name: 'ADHD Assessment',
    questions: [
      {
        id: 1,
        question: "How often do you have difficulty organizing tasks and activities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "How often do you feel restless or have trouble sitting still?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      }
    ]
  },
  bipolar: {
    name: 'Bipolar Disorder Screening',
    questions: [
      {
        id: 1,
        question: "Have you experienced periods of elevated mood or increased energy lasting several days?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "During these periods, did you need much less sleep than usual?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      }
    ]
  },
  dyslexia: {
    name: 'Dyslexia Screening',
    questions: [
      {
        id: 1,
        question: "Do you find it challenging to read aloud or follow written instructions?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        id: 2,
        question: "Do you often reverse the order of letters or numbers when reading or writing?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      }
    ]
  }
};

export default function Survey() {
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleQuizSelect = (quizType: string) => {
    setSelectedQuiz(quizType);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answer: string) => {
    if (!selectedQuiz) return;
    
    setAnswers(prev => ({
      ...prev,
      [quizTypes[selectedQuiz as keyof typeof quizTypes].questions[currentQuestion].id]: answer
    }));
  };

  const handleNext = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestion < quizTypes[selectedQuiz as keyof typeof quizTypes].questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Quiz answers:', { type: selectedQuiz, answers });
    alert('Assessment submitted successfully! (Demo only)');
    setSelectedQuiz('');
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <ClipboardList className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">
              Mental Health Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take our confidential assessments to help us understand your mental health needs better.
            </p>
          </div>
        </section>

        {/* Quiz Selection */}
        {!selectedQuiz && (
          <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(quizTypes).map(([type, quiz]) => (
                  <button
                    key={type}
                    onClick={() => handleQuizSelect(type)}
                    className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-left"
                  >
                    <h3 className="text-xl font-bold mb-2">{quiz.name}</h3>
                    <p className="text-muted-foreground">
                      Take this assessment to understand more about your {quiz.name.toLowerCase()} symptoms.
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Survey Section */}
        {selectedQuiz && (
          <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card p-8 rounded-2xl shadow-lg">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((currentQuestion + 1) / quizTypes[selectedQuiz as keyof typeof quizTypes].questions.length) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Question {currentQuestion + 1} of {quizTypes[selectedQuiz as keyof typeof quizTypes].questions.length}
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">
                    {quizTypes[selectedQuiz as keyof typeof quizTypes].questions[currentQuestion].question}
                  </h2>
                  <div className="space-y-4">
                    {quizTypes[selectedQuiz as keyof typeof quizTypes].questions[currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition
                          ${answers[quizTypes[selectedQuiz as keyof typeof quizTypes].questions[currentQuestion].id] === option
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                            : 'border-border hover:border-orange-500'
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 dark:hover:bg-orange-950 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  
                  {currentQuestion === quizTypes[selectedQuiz as keyof typeof quizTypes].questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                    >
                      Submit <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={!answers[quizTypes[selectedQuiz as keyof typeof quizTypes].questions[currentQuestion].id]}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}