import React, { useState } from 'react';
import { 
  Send, 
  AlertTriangle, 
  PlusCircle, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { playPopSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

type FormTab = 'enquiry' | 'report' | 'suggest' | 'feedback';

interface FormErrors {
  [key: string]: string;
}

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormTab>('enquiry');
  const [submittedMessage, setSubmittedMessage] = useState<{ title: string; desc: string } | null>(null);

  // General Enquiry State
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquirySubject, setEnquirySubject] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryErrors, setEnquiryErrors] = useState<FormErrors>({});

  // Report Outdated State
  const [reportOppId, setReportOppId] = useState('');
  const [reportReason, setReportReason] = useState('Deadline Expired');
  const [reportDetails, setReportDetails] = useState('');
  const [reportErrors, setReportErrors] = useState<FormErrors>({});

  // Suggest Opportunity State
  const [suggestTitle, setSuggestTitle] = useState('');
  const [suggestOrg, setSuggestOrg] = useState('');
  const [suggestUrl, setSuggestUrl] = useState('');
  const [suggestCategory, setSuggestCategory] = useState('Learnership');
  const [suggestProvince, setSuggestProvince] = useState('Gauteng');
  const [suggestErrors, setSuggestErrors] = useState<FormErrors>({});

  // Platform Feedback State
  const [feedbackRating, setFeedbackRating] = useState('5');
  const [feedbackCategory, setFeedbackCategory] = useState('Search & Filtering');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackErrors, setFeedbackErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!enquiryName.trim()) errors.name = 'Please provide your full name.';
    if (!enquiryEmail.trim() || !validateEmail(enquiryEmail)) errors.email = 'Valid email is required.';
    if (!enquirySubject.trim()) errors.subject = 'Subject cannot be empty.';
    if (!enquiryMessage.trim() || enquiryMessage.trim().length < 10) errors.message = 'Message must be at least 10 characters long.';

    setEnquiryErrors(errors);
    if (Object.keys(errors).length === 0) {
      playSuccessSound();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setSubmittedMessage({
        title: 'MESSAGE PINNED TO DESK',
        desc: `Thank you, ${enquiryName}. Our youth editorial team will reply to ${enquiryEmail} within 24 business hours.`
      });
      setEnquiryName('');
      setEnquiryEmail('');
      setEnquirySubject('');
      setEnquiryMessage('');
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!reportOppId.trim()) errors.oppId = 'Please enter the Opportunity ID or Title.';
    if (!reportDetails.trim() || reportDetails.trim().length < 8) errors.details = 'Please describe the discrepancy.';

    setReportErrors(errors);
    if (Object.keys(errors).length === 0) {
      playSuccessSound();
      setSubmittedMessage({
        title: 'REPORT RECEIVED & FLAGGED',
        desc: 'Thank you for protecting fellow job seekers. Our team will verify and remove any fraudulent or closed listing.'
      });
      setReportOppId('');
      setReportDetails('');
    }
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!suggestTitle.trim()) errors.title = 'Opportunity title is required.';
    if (!suggestOrg.trim()) errors.org = 'Organisation name is required.';
    if (!suggestUrl.trim() || !suggestUrl.startsWith('http')) errors.url = 'Valid URL starting with https:// is required.';

    setSuggestErrors(errors);
    if (Object.keys(errors).length === 0) {
      playSuccessSound();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setSubmittedMessage({
        title: 'OPPORTUNITY SUBMITTED FOR REVIEW',
        desc: 'Thank you! We verify all corporate and SETA opportunities for zero-fee authenticity before pinning them publicly.'
      });
      setSuggestTitle('');
      setSuggestOrg('');
      setSuggestUrl('');
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!feedbackText.trim() || feedbackText.trim().length < 8) {
      errors.text = 'Please share a brief comment on what we can improve.';
    }

    setFeedbackErrors(errors);
    if (Object.keys(errors).length === 0) {
      playSuccessSound();
      setSubmittedMessage({
        title: 'FEEDBACK RECEIVED',
        desc: 'Thank you for helping us make THE BOARD the cleanest and most reliable youth platform in South Africa.'
      });
      setFeedbackText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff85c0]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#80d8ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#ff85c0] text-[#0b0914] font-mono font-black text-xs uppercase rounded-md shadow-sm">
              PIN A NOTE 📝
            </span>
            <span className="text-xs font-mono text-[#a69db9] uppercase tracking-widest">
              Community & Moderation Hub
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#f3effa]">
            COMMUNITY BOARD DESK
          </h1>
          <p className="text-xs sm:text-sm text-[#a69db9] mt-2 max-w-2xl font-medium leading-relaxed">
            Send an enquiry, report an expired listing or suspicious fee, suggest a newly opened learnership, or tell us how we can make The Board better for you.
          </p>
        </div>
      </div>

      {/* Success Confirmation Card */}
      {submittedMessage && (
        <div className="p-6 bg-[#161226] text-[#f3effa] border border-[#ff85c0]/40 rounded-2xl shadow-[0_0_25px_rgba(255,133,192,0.2)] animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-[#80d8ff]" />
                <h3 className="font-heading font-black text-lg uppercase text-[#f3effa]">
                  {submittedMessage.title}
                </h3>
              </div>
              <p className="text-xs text-[#a69db9] max-w-xl">
                {submittedMessage.desc}
              </p>
            </div>
            <button
              onClick={() => setSubmittedMessage(null)}
              className="px-3.5 py-1.5 bg-[#ff85c0] text-[#0b0914] rounded-xl text-xs font-heading font-black uppercase hover:bg-[#ff85c0]/90 shrink-0 glow-pink"
            >
              Pin Another Note
            </button>
          </div>
        </div>
      )}

      {/* Form Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: 'enquiry', label: 'Send a Message', icon: <Send className="w-3.5 h-3.5 text-[#ff85c0]" /> },
          { id: 'report', label: 'Report Outdated', icon: <AlertTriangle className="w-3.5 h-3.5 text-[#b388ff]" /> },
          { id: 'suggest', label: 'Suggest Opportunity', icon: <PlusCircle className="w-3.5 h-3.5 text-[#80d8ff]" /> },
          { id: 'feedback', label: 'Give Feedback', icon: <MessageSquare className="w-3.5 h-3.5 text-[#ff85c0]" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playPopSound();
                setActiveTab(tab.id as FormTab);
              }}
              className={`p-3 text-xs font-mono font-bold uppercase rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#ff85c0] text-[#0b0914] border-[#ff85c0] font-black shadow-[0_0_15px_rgba(255,133,192,0.35)]'
                  : 'bg-[#161226]/60 text-[#a69db9] border-[rgba(255,182,217,0.15)] hover:border-[#b388ff] hover:text-[#f3effa]'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="cyber-card rounded-2xl p-6 sm:p-8">
        {activeTab === 'enquiry' && (
          <form onSubmit={handleEnquirySubmit} className="space-y-4">
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#f3effa] mb-2">
              SEND GENERAL ENQUIRY ✉️
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  placeholder="e.g. Sibusiso Ndlovu"
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#ff85c0]"
                />
                {enquiryErrors.name && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{enquiryErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={enquiryEmail}
                  onChange={(e) => setEnquiryEmail(e.target.value)}
                  placeholder="e.g. sibusiso@gmail.com"
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#ff85c0]"
                />
                {enquiryErrors.email && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{enquiryErrors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={enquirySubject}
                onChange={(e) => setEnquirySubject(e.target.value)}
                placeholder="e.g. Question about IT Learnership qualification requirements"
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#ff85c0]"
              />
              {enquiryErrors.subject && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{enquiryErrors.subject}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                value={enquiryMessage}
                onChange={(e) => setEnquiryMessage(e.target.value)}
                placeholder="Type your message or question here..."
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#ff85c0]"
              ></textarea>
              {enquiryErrors.message && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{enquiryErrors.message}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink"
            >
              Pin Message to Editorial Desk
            </button>
          </form>
        )}

        {activeTab === 'report' && (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#f3effa] mb-2">
              REPORT EXPIRED OR SUSPICIOUS LISTING ⚠️
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Opportunity Title or ID *
              </label>
              <input
                type="text"
                value={reportOppId}
                onChange={(e) => setReportOppId(e.target.value)}
                placeholder="e.g. opp-1 or 'Vodacom Youth Academy'"
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#b388ff]"
              />
              {reportErrors.oppId && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{reportErrors.oppId}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Reason for Report
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none"
              >
                <option value="Deadline Expired">Application Deadline Has Passed / Portal Closed</option>
                <option value="Demanding Money">Suspicious Agent Demanded Uniform/Courier Money</option>
                <option value="Broken Link">Application URL is 404 or Malfunctioning</option>
                <option value="Incorrect Requirements">Listed Requirements Differ from Official SETA</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Additional Details *
              </label>
              <textarea
                rows={3}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Please describe what you observed so our moderation team can verify..."
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#b388ff]"
              ></textarea>
              {reportErrors.details && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{reportErrors.details}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#b388ff] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#b388ff]/90 transition-transform active:scale-95 glow-lavender"
            >
              Submit Moderation Flag
            </button>
          </form>
        )}

        {activeTab === 'suggest' && (
          <form onSubmit={handleSuggestSubmit} className="space-y-4">
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#f3effa] mb-2">
              SUGGEST A VERIFIED YOUTH OPPORTUNITY 💡
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Opportunity Title *
                </label>
                <input
                  type="text"
                  value={suggestTitle}
                  onChange={(e) => setSuggestTitle(e.target.value)}
                  placeholder="e.g. Standard Bank Youth Learnership 2026"
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#80d8ff]"
                />
                {suggestErrors.title && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{suggestErrors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Organisation / Company *
                </label>
                <input
                  type="text"
                  value={suggestOrg}
                  onChange={(e) => setSuggestOrg(e.target.value)}
                  placeholder="e.g. Standard Bank South Africa"
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#80d8ff]"
                />
                {suggestErrors.org && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{suggestErrors.org}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Official Application URL *
              </label>
              <input
                type="url"
                value={suggestUrl}
                onChange={(e) => setSuggestUrl(e.target.value)}
                placeholder="https://..."
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#80d8ff]"
              />
              {suggestErrors.url && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{suggestErrors.url}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Category
                </label>
                <select
                  value={suggestCategory}
                  onChange={(e) => setSuggestCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none"
                >
                  <option value="Job">Job</option>
                  <option value="Learnership">Learnership</option>
                  <option value="Internship">Internship</option>
                  <option value="Bursary">Bursary</option>
                  <option value="Course">Course</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Location / Province
                </label>
                <select
                  value={suggestProvince}
                  onChange={(e) => setSuggestProvince(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none"
                >
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="Eastern Cape">Eastern Cape</option>
                  <option value="Free State">Free State</option>
                  <option value="Limpopo">Limpopo</option>
                  <option value="Mpumalanga">Mpumalanga</option>
                  <option value="North West">North West</option>
                  <option value="Northern Cape">Northern Cape</option>
                  <option value="National / Remote">National / Remote</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#80d8ff] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#80d8ff]/90 transition-transform active:scale-95 glow-cyan"
            >
              Submit for Verification & Pinning
            </button>
          </form>
        )}

        {activeTab === 'feedback' && (
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <h3 className="font-heading font-black text-xl uppercase tracking-tight text-[#f3effa] mb-2">
              PLATFORM FEEDBACK 💬
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Your Overall Experience
                </label>
                <select
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none"
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent - Super clean & fast</option>
                  <option value="4">⭐⭐⭐⭐ Good - Helped me find real roles</option>
                  <option value="3">⭐⭐⭐ Neutral - Needs more opportunities</option>
                  <option value="2">⭐⭐ Needs Improvement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                  Feature Area
                </label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none"
                >
                  <option value="Pathway Map">Pathway Map & Trajectory</option>
                  <option value="Search & Filtering">Search & Filtering</option>
                  <option value="Application Kanban">Application Kanban Tracker</option>
                  <option value="The Toolkit">The Toolkit & CV Templates</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#a69db9] mb-1">
                Your Suggestions or Notes *
              </label>
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What feature would make this portal even better for young South Africans?"
                className="w-full p-2.5 rounded-xl border border-[rgba(255,182,217,0.2)] bg-[#0b0914] text-xs text-[#f3effa] focus:outline-none focus:border-[#ff85c0]"
              ></textarea>
              {feedbackErrors.text && <p className="text-xs text-[#ff85c0] mt-1 font-mono">{feedbackErrors.text}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#ff85c0] text-[#0b0914] font-heading font-black text-xs uppercase rounded-xl hover:bg-[#ff85c0]/90 transition-transform active:scale-95 glow-pink"
            >
              Send Platform Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
