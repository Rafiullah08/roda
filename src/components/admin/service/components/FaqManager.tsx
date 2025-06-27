
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";
import { 
  countWords, 
  FAQ_QUESTION_MIN_WORDS, 
  FAQ_QUESTION_MAX_WORDS, 
  FAQ_ANSWER_MIN_WORDS, 
  FAQ_ANSWER_MAX_WORDS 
} from "@/hooks/service/useServiceForm";

export interface FAQ {
  question: string;
  answer: string;
}

interface FaqManagerProps {
  initialFaqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
  questionMinWords?: number;
  questionMaxWords?: number;
  answerMinWords?: number;
  answerMaxWords?: number;
}

const FaqManager: React.FC<FaqManagerProps> = ({ 
  initialFaqs = [], 
  onChange,
  questionMinWords = FAQ_QUESTION_MIN_WORDS,
  questionMaxWords = FAQ_QUESTION_MAX_WORDS,
  answerMinWords = FAQ_ANSWER_MIN_WORDS,
  answerMaxWords = FAQ_ANSWER_MAX_WORDS
}) => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [questionWordCount, setQuestionWordCount] = useState(0);
  const [answerWordCount, setAnswerWordCount] = useState(0);
  
  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    
    const newFaq: FAQ = {
      question: newQuestion.trim(),
      answer: newAnswer.trim()
    };
    
    const updatedFaqs = [...faqs, newFaq];
    setFaqs(updatedFaqs);
    setNewQuestion("");
    setNewAnswer("");
    setQuestionWordCount(0);
    setAnswerWordCount(0);
    onChange(updatedFaqs);
  };

  const handleRemoveFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
    onChange(updatedFaqs);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewQuestion(value);
    setQuestionWordCount(countWords(value));
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewAnswer(value);
    setAnswerWordCount(countWords(value));
  };

  const isValidQuestion = questionWordCount >= questionMinWords && questionWordCount <= questionMaxWords;
  const isValidAnswer = answerWordCount >= answerMinWords && answerWordCount <= answerMaxWords;
  const canAddFaq = newQuestion.trim() && newAnswer.trim() && isValidQuestion && isValidAnswer;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Frequently Asked Questions</h3>
      <p className="text-sm text-gray-500">
        Add FAQs for your service. Questions should be {questionMinWords}-{questionMaxWords} words and answers {answerMinWords}-{answerMaxWords} words.
      </p>
      
      {faqs.length > 0 ? (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveFaq(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              
              <div className="space-y-3 pr-8">
                <div>
                  <label className="text-sm font-medium mb-1 block">Question</label>
                  <Input value={faq.question} disabled />
                  <div className="text-xs text-gray-500 mt-1">
                    {countWords(faq.question)} words
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Answer</label>
                  <Textarea value={faq.answer} disabled className="min-h-20" />
                  <div className="text-xs text-gray-500 mt-1">
                    {countWords(faq.answer)} words
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No FAQs added yet.</p>
      )}

      <div className="pt-4 border-t">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">New Question</label>
            <div className="flex items-center gap-2">
              <Input
                value={newQuestion}
                onChange={handleQuestionChange}
                placeholder="Enter a frequently asked question"
              />
              <div className={`text-xs min-w-24 ${
                newQuestion && !isValidQuestion ? "text-red-500" : "text-gray-500"
              }`}>
                {questionWordCount} / {questionMinWords}-{questionMaxWords}
              </div>
            </div>
            {newQuestion && !isValidQuestion && (
              <p className="text-xs text-red-500 mt-1">
                Question must be between {questionMinWords} and {questionMaxWords} words
              </p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">New Answer</label>
            <div className="flex gap-2">
              <div className="flex-grow">
                <Textarea
                  value={newAnswer}
                  onChange={handleAnswerChange}
                  placeholder="Enter the answer to the question"
                  className="min-h-20"
                />
                <div className={`text-xs mt-1 ${
                  newAnswer && !isValidAnswer ? "text-red-500" : "text-gray-500"
                }`}>
                  {answerWordCount} / {answerMinWords}-{answerMaxWords} words
                </div>
              </div>
            </div>
            {newAnswer && !isValidAnswer && (
              <p className="text-xs text-red-500 mt-1">
                Answer must be between {answerMinWords} and {answerMaxWords} words
              </p>
            )}
          </div>
          
          <Button
            type="button"
            onClick={handleAddFaq}
            disabled={!canAddFaq}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaqManager;
