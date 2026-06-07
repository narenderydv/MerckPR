import React, { useState, useEffect } from 'react';
import { Application } from '../../types';
import { Badge } from '../ui/Badge';
import { PR_QUESTIONS, PRQuestion, ReviewerComment } from '../../constants/prQuestions';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import {
  ArrowLeft, Bot, Edit3, RefreshCw, MessageSquare, Paperclip,
  BookOpen, ChevronDown, ChevronUp, Save, Send, FileDown,
  CheckCircle2, Clock, Sparkles, X, Plus, Users
} from 'lucide-react';

interface QuestionState {
  answer: string;
  status: 'pending' | 'generating' | 'ai-generated' | 'edited' | 'reviewed';
  userComment: string;
  attachments: string[];
  reviewerComments: ReviewerComment[];
  additionalPrompt: string;
  isEditing: boolean;
  showRerunInput: boolean;
  showReviewerInput: boolean;
  newReviewerComment: string;
}

interface Props {
  application: Application;
  onBack: () => void;
}

const INSTRUCTIONS = [
  'Review each AI-generated answer carefully against current system documentation.',
  'Edit answers where necessary to reflect actual system state.',
  'Attach supporting evidence (SOPs, reports, screenshots) to relevant questions.',
  'Add comments to provide additional context or flag concerns.',
  'Use "Re-run Agent" to regenerate answers with additional context if needed.',
  'Submit for review only when all checklist questions have been addressed.',
];

export const InitiatePeriodicReview = ({ application, onBack }: Props) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [generatingAll, setGeneratingAll] = useState(true);
  const [currentGenerating, setCurrentGenerating] = useState(0);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questions, setQuestions] = useState<Record<string, QuestionState>>(() => {
    const init: Record<string, QuestionState> = {};
    PR_QUESTIONS.forEach(q => {
      init[q.id] = {
        answer: '', status: 'pending', userComment: '', attachments: [],
        reviewerComments: [], additionalPrompt: '', isEditing: false,
        showRerunInput: false, showReviewerInput: false, newReviewerComment: ''
      };
    });
    return init;
  });

  // Simulate sequential AI generation on mount
  useEffect(() => {
    if (!generatingAll) return;
    const timer = setTimeout(() => {
      if (currentGenerating < PR_QUESTIONS.length) {
        const q = PR_QUESTIONS[currentGenerating];
        setQuestions(prev => ({
          ...prev,
          [q.id]: { ...prev[q.id], answer: q.aiAnswer, status: 'ai-generated' }
        }));
        setCurrentGenerating(c => c + 1);
      } else {
        setGeneratingAll(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [generatingAll, currentGenerating]);

  const updateQ = (id: string, patch: Partial<QuestionState>) => {
    setQuestions(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const handleRerun = (q: PRQuestion) => {
    const state = questions[q.id];
    updateQ(q.id, { status: 'generating', showRerunInput: false });
    setTimeout(() => {
      const extra = state.additionalPrompt ? `\n\n[Additional context incorporated: ${state.additionalPrompt}] — Answer has been refreshed with the latest available data and additional context provided.` : '\n\n[Answer refreshed with latest available data.]';
      updateQ(q.id, { answer: q.aiAnswer + extra, status: 'ai-generated', additionalPrompt: '' });
    }, 1500);
  };

  const handleAddAttachment = (id: string) => {
    const name = `Evidence_${id}_${Date.now().toString(36)}.pdf`;
    updateQ(id, { attachments: [...questions[id].attachments, name] });
  };

  const handleAddReviewerComment = (id: string) => {
    const s = questions[id];
    if (!s.newReviewerComment.trim()) return;
    const rc: ReviewerComment = {
      id: `RC-${Date.now()}`, reviewer: 'QA Reviewer',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      comment: s.newReviewerComment
    };
    updateQ(id, {
      reviewerComments: [...s.reviewerComments, rc],
      newReviewerComment: '', status: 'reviewed'
    });
  };

  const totalQuestions = PR_QUESTIONS.length;
  const progress = PR_QUESTIONS.filter(q => questions[q.id].status !== 'pending').length;
  const reviewed = PR_QUESTIONS.filter(q => questions[q.id].status === 'reviewed').length;

  const statusColor = (s: string) => {
    if (s === 'reviewed') return 'text-merck-green bg-merck-green/10 border-merck-green/20';
    if (s === 'edited') return 'text-merck-cyan bg-merck-cyan/10 border-merck-cyan/20';
    if (s === 'ai-generated') return 'text-merck-indigo bg-merck-indigo/10 border-merck-indigo/20';
    if (s === 'generating') return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-slate-400 bg-slate-50 border-slate-200';
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Periodic Review — {application.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              <span className="font-mono">ID: {application.id}</span> · <span className="font-mono">RDID: {application.rdid}</span> · Owner: {application.owner} · Division: {application.division}
            </p>
          </div>
        </div>
        <Badge variant={
          application.prStatus === 'Completed' ? 'success' :
          application.prStatus === 'In Progress' ? 'info' :
          application.prStatus === 'In Review' ? 'warning' :
          application.prStatus === 'To be Initiated' ? 'neutral' :
          'danger'
        }>
          {application.prStatus}
        </Badge>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Review Progress</p>
          <p className="text-xs font-bold text-slate-700">{progress}/{totalQuestions} Generated · {reviewed}/{totalQuestions} Reviewed</p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-gradient-to-r from-merck-indigo to-merck-cyan h-2 rounded-full transition-all duration-500" style={{ width: `${(progress / totalQuestions) * 100}%` }} />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <button onClick={() => setShowInstructions(!showInstructions)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-merck-indigo" />
            <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Standard Review Instructions</span>
          </div>
          {showInstructions ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {showInstructions && (
          <div className="px-6 pb-5 border-t border-slate-100 pt-4">
            <ol className="space-y-2">
              {INSTRUCTIONS.map((inst, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs text-slate-600">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-merck-indigo/10 text-merck-indigo text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {PR_QUESTIONS.map((q) => {
          const s = questions[q.id];
          const isExpanded = expandedQ === q.id;
          return (
            <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Question header */}
              <button onClick={() => setExpandedQ(isExpanded ? null : q.id)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">{q.number}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-snug">{q.question}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[9px] font-bold text-merck-indigo bg-merck-indigo/5 px-2 py-0.5 rounded border border-merck-indigo/10 uppercase tracking-wider">{q.category}</span>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", statusColor(s.status))}>{s.status}</span>
                      <span title={`Reviewer: ${q.reviewerType}`} className="inline-flex max-w-full items-center gap-1 whitespace-normal text-left text-[9px] font-bold text-merck-green bg-merck-green/5 px-2 py-0.5 rounded border border-merck-green/10 uppercase tracking-wider leading-snug">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        <span>Reviewer: {q.reviewerType}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />}
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100">
                  {/* AI Answer */}
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-merck-indigo" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GenAI Response</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQ(q.id, { isEditing: !s.isEditing })} className="flex items-center space-x-1 px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all uppercase tracking-wider">
                          <Edit3 className="w-3 h-3" /><span>{s.isEditing ? 'Save' : 'Edit'}</span>
                        </button>
                        <button onClick={() => updateQ(q.id, { showRerunInput: !s.showRerunInput })} className="flex items-center space-x-1 px-3 py-1.5 text-[10px] font-bold text-merck-indigo bg-merck-indigo/5 rounded-lg border border-merck-indigo/10 hover:bg-merck-indigo/10 transition-all uppercase tracking-wider">
                          <RefreshCw className={cn("w-3 h-3", s.status === 'generating' && 'animate-spin')} /><span>Re-run Agent</span>
                        </button>
                      </div>
                    </div>

                    {s.status === 'generating' ? (
                      <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                        <p className="text-xs text-amber-700 font-medium">GenAI agent is processing this question...</p>
                      </div>
                    ) : s.status === 'pending' ? (
                      <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <Clock className="w-5 h-5 text-slate-300" />
                        <p className="text-xs text-slate-400 font-medium">Waiting for AI generation...</p>
                      </div>
                    ) : s.isEditing ? (
                      <textarea value={s.answer} onChange={e => updateQ(q.id, { answer: e.target.value, status: 'edited' })}
                        className="w-full p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 min-h-[120px] resize-y" rows={5} />
                    ) : (
                      <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{s.answer}</p>
                      </div>
                    )}

                    {/* Re-run input */}
                    {s.showRerunInput && (
                      <div className="mt-3 p-4 bg-merck-indigo/[0.02] rounded-lg border border-merck-indigo/10">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Additional context for AI (optional)</p>
                        <textarea value={s.additionalPrompt} onChange={e => updateQ(q.id, { additionalPrompt: e.target.value })}
                          placeholder="Provide additional context or specific instructions for the AI agent..."
                          className="w-full p-3 bg-white rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 resize-y" rows={2} />
                        <button onClick={() => handleRerun(q)} className="mt-2 px-4 py-2 text-[10px] font-bold text-white bg-merck-indigo rounded-lg hover:bg-merck-indigo/90 transition-all uppercase tracking-wider">
                          <span className="flex items-center space-x-1"><RefreshCw className="w-3 h-3" /><span>Generate</span></span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Citations */}
                  <div className="px-6 py-3 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Citations & References</p>
                    <div className="flex flex-wrap gap-2">
                      {q.citations.map(c => (
                        <span key={c.id} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-cyan/5 text-merck-cyan text-[10px] font-bold border border-merck-cyan/10">
                          📄 {c.source}{c.section ? ` — ${c.section}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div className="px-6 py-3 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attachments</p>
                      <button onClick={() => handleAddAttachment(q.id)} className="flex items-center space-x-1 text-[10px] font-bold text-merck-indigo hover:underline">
                        <Paperclip className="w-3 h-3" /><span>Add File</span>
                      </button>
                    </div>
                    {s.attachments.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {s.attachments.map((a, i) => (
                          <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold border border-slate-200">
                            📎 {a}
                            <button onClick={() => updateQ(q.id, { attachments: s.attachments.filter((_, j) => j !== i) })} className="ml-1.5 text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                          </span>
                        ))}
                      </div>
                    ) : <p className="text-[10px] text-slate-300">No attachments</p>}
                  </div>

                  {/* User Comment */}
                  <div className="px-6 py-3 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Comments</p>
                    <textarea value={s.userComment} onChange={e => updateQ(q.id, { userComment: e.target.value })}
                      placeholder="Add your comments or observations..."
                      className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 resize-y" rows={2} />
                  </div>

                  {/* Reviewer Comments */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-merck-green" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviewer Comments</p>
                      </div>
                      <button onClick={() => updateQ(q.id, { showReviewerInput: !s.showReviewerInput })} className="flex items-center space-x-1 text-[10px] font-bold text-merck-green hover:underline">
                        <Plus className="w-3 h-3" /><span>Add Review</span>
                      </button>
                    </div>
                    {s.reviewerComments.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {s.reviewerComments.map(rc => (
                          <div key={rc.id} className="p-3 bg-white rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-merck-green uppercase">{rc.reviewer}</span>
                              <span className="text-[10px] text-slate-400">{rc.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-700">{rc.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.showReviewerInput && (
                      <div className="flex space-x-2">
                        <textarea value={s.newReviewerComment} onChange={e => updateQ(q.id, { newReviewerComment: e.target.value })}
                          placeholder="Enter reviewer comment..."
                          className="flex-1 p-3 bg-white rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-merck-green/20 resize-y" rows={2} />
                        <button onClick={() => handleAddReviewerComment(q.id)} className="px-4 py-2 bg-merck-green text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-merck-green/90 transition-all self-end">
                          Submit
                        </button>
                      </div>
                    )}
                    {s.reviewerComments.length === 0 && !s.showReviewerInput && (
                      <p className="text-[10px] text-slate-300">No reviewer comments yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{progress}/{totalQuestions} Complete · {reviewed}/{totalQuestions} Reviewed</p>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
            <Save className="w-3.5 h-3.5" /><span>Save Draft</span>
          </button>
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">
            <FileDown className="w-3.5 h-3.5" /><span>Export PDF</span>
          </button>
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-merck-indigo to-merck-indigo/90 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-merck-indigo/20 transition-all duration-300"
          >
            <Send className="w-3.5 h-3.5" /><span>Submit for Review</span>
          </button>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 w-full max-w-md border border-slate-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-display">Assign Reviewer</h3>
              <button onClick={() => setShowSubmitModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Reviewer Name</label>
                <input 
                  type="text" 
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Chen"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                The assigned reviewer will be notified to review the AI-generated answers and evidence for this Periodic Review.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={!reviewerName.trim() || isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    setShowSubmitModal(false);
                    onBack();
                  }, 1500);
                }}
                className={cn(
                  "flex-1 px-4 py-2.5 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center",
                  reviewerName.trim() && !isSubmitting ? "bg-gradient-to-r from-merck-indigo to-merck-indigo/90 hover:shadow-lg hover:shadow-merck-indigo/20" : "bg-slate-300 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Confirm & Submit</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
