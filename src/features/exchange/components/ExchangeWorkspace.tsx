'use client';

import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Video,
  Send,
  Award,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { ExchangeService } from '../services/exchangeService';
import {
  SkillExchangeMatch,
  MentorProfile,
  SessionBooking,
  RatingReview,
  ExchangeAnalytics,
} from '../schemas';

type ActiveTabType = 'exchange' | 'mentors' | 'bookings' | 'reviews' | 'analytics';

export function ExchangeWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('exchange');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  // Mock Career Memory Data
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    skillsWanted: ['TypeScript types, Web performance chunking'],
    skillsKnown: ['React.js rendering, Tailwind styling templates'],
  };

  // 1. Skill Exchange Peer Matches State
  const [matches, setMatches] = useState<SkillExchangeMatch[]>([
    {
      matchId: '123e4567-e89b-12d3-a456-426614178011',
      peerUserId: '123e4567-e89b-12d3-a456-426614178111',
      peerName: 'Emma Watson',
      matchConfidencePercent: 94,
      skillOfferedToYou: 'TypeScript advanced generics & narrowings',
      skillRequestedFromYou: 'React state hook closure bindings',
      commonTimezone: 'GMT -5 (EST)',
      availableSlot: 'Tuesday at 4:00 PM',
    },
    {
      matchId: '123e4567-e89b-12d3-a456-426614178012',
      peerUserId: '123e4567-e89b-12d3-a456-426614178112',
      peerName: 'Daniel Radcliffe',
      matchConfidencePercent: 88,
      skillOfferedToYou: 'GIN indexing database partial filters',
      skillRequestedFromYou: 'Tailwind layouts & performance optimizations',
      commonTimezone: 'GMT +1 (GMT)',
      availableSlot: 'Wednesday at 2:00 PM',
    },
  ]);

  // 2. Mentor Marketplace Profiles State
  const [mentors, setMentors] = useState<MentorProfile[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614178201',
      name: 'Sarah Connor',
      companyAffiliation: 'Stripe',
      roleTitle: 'Principal Web Architect',
      mentorRating: 4.9,
      isVerifiedExpert: true,
      hourlyRateUSD: 0, // Free Community / Alumni mentor
      topicsCovered: ['NextJS rendering loops', 'Webpack dynamic chunking', 'GIN constraints'],
      languagesSupported: ['English', 'Spanish'],
    },
    {
      id: '123e4567-e89b-12d3-a456-426614178202',
      name: 'John Connor',
      companyAffiliation: 'Vercel',
      roleTitle: 'Senior Devops Lead',
      mentorRating: 4.8,
      isVerifiedExpert: true,
      hourlyRateUSD: 45, // Paid industry expert
      topicsCovered: ['Vercel CDN routing', 'CI/CD pipeline webhook automation'],
      languagesSupported: ['English'],
    },
  ]);

  // 3. Booked Sessions Schedulers State
  const [bookings, setBookings] = useState<SessionBooking[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614178301',
      mentorId: '123e4567-e89b-12d3-a456-426614178201',
      mentorName: 'Sarah Connor',
      dateTime: 'Friday at 11:00 AM',
      sessionType: 'mock_interview',
      status: 'scheduled',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      notes: 'Prepare explaining React hook closure bindings and Webpack chunking scopes.',
      actionItems: ['Review NextJS layouts docs', 'Optimize EventBus project cover badges'],
    },
  ]);

  // 4. Session Reviews State
  const [reviewsList, setReviewsList] = useState<RatingReview[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614178401',
      reviewerName: 'Emma Watson',
      knowledgeScore: 5,
      communicationScore: 5,
      helpfulnessScore: 4,
      professionalismScore: 5,
      punctualityScore: 5,
      overallStars: 5,
      feedbackText: 'Alex Rivera explained hook boundaries clearly. Extremely helpful for React engineering!',
      timestamp: 'Yesterday',
    },
  ]);

  const [reviewInput, setReviewInput] = useState('');
  const [reviewStars, setReviewStars] = useState(5);

  // 5. Analytics State
  const [analytics, setAnalytics] = useState<ExchangeAnalytics | null>({
    totalSessionsCompleted: 8,
    totalLearningHours: 12,
    totalTeachingHours: 10,
    currentReputationScore: 420,
    mentorTierLevel: 2,
    communityEngagementScorePercent: 96,
    ratingEvolution: [4.2, 4.5, 4.6, 4.8, 4.9],
  });

  // --- HANDLERS ---

  const handleBookSession = async (mentorId: string, name: string, type: '1-on-1' | 'mock_interview' | 'resume_review') => {
    setIsProcessing(true);
    addToast(`Registering calendar invite with ${name}...`, 'info');
    try {
      const res = await ExchangeService.createSessionBooking(
        mentorId,
        type,
        'Tomorrow at 3:00 PM'
      );
      setBookings([res, ...bookings]);
      addToast(`Session successfully booked! Videoconferencing link generated.`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Booking failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePeerBookExchange = async (match: SkillExchangeMatch) => {
    setIsProcessing(true);
    addToast(`Sending peer exchange handshake to ${match.peerName}...`, 'info');
    try {
      const res = await ExchangeService.createSessionBooking(
        match.peerUserId,
        '1-on-1',
        match.availableSlot
      );
      setBookings([res, ...bookings]);
      addToast(`Peer exchange booked! Multiplier XP unlocked.`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Handshake failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    setIsProcessing(true);
    addToast('Submitting rating, checking content moderation...', 'info');
    try {
      const res = await ExchangeService.submitSessionReview(
        '123e4567-e89b-12d3-a456-426614178301',
        reviewInput
      );
      setReviewsList([res, ...reviewsList]);
      setReviewInput('');
      addToast('Review submitted! Community reputation updated.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Review submission failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchMatches = async () => {
    setIsProcessing(true);
    addToast('Re-indexing peer availability tables and skill matrices...', 'info');
    try {
      const res = await ExchangeService.getExchangeMatches(mockMemory);
      setMatches(res);
      addToast('Compatible skill exchange partners updated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to retrieve matches.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchMentors = async () => {
    setIsProcessing(true);
    addToast('Fetching verified corporate professional profiles...', 'info');
    try {
      const res = await ExchangeService.getMentorMarketplace(mockMemory);
      setMentors(res);
      addToast('Verified alumni & mentor list updated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Mentors update failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchAnalytics = async () => {
    setIsProcessing(true);
    addToast('Compiling sessions log history database...', 'info');
    try {
      const res = await ExchangeService.getExchangeAnalytics(mockMemory);
      setAnalytics(res);
      addToast('Reputation metrics updated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Analytics failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Skill Exchange & Mentor Marketplace</h1>
          <p className="text-slate-400 text-sm">Exchange skills with study partners, schedule verified corporate mock reviews, and accumulate reputation XP</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-xs text-slate-300 font-semibold shrink-0">
          <Award className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Community Reputation: {analytics?.currentReputationScore || 420} XP</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: 'exchange', label: 'Peer Exchanges', icon: Users },
          { id: 'mentors', label: 'Mentor Marketplace', icon: Sparkles },
          { id: 'bookings', label: 'Booked Sessions', icon: Calendar },
          { id: 'reviews', label: 'Reputation Reviews', icon: Award },
          { id: 'analytics', label: 'Reputation Metrics', icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ActiveTabType)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 bg-transparent border-0 cursor-pointer text-xs whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: PEER EXCHANGES */}
      {activeTab === 'exchange' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Compatible Peer-to-Peer exchanges</h3>
              <p className="text-xs text-slate-400">Timezone aligned, reciprocity-based skill matches (Taught skill fits wanted skill)</p>
            </div>
            <button
              onClick={handleFetchMatches}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Re-index peers
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matches.map((match) => (
              <div key={match.matchId} className="p-4 bg-slate-950 border border-slate-850 rounded text-xs space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{match.peerName}</span>
                  <span className="text-[10px] bg-blue-950 border border-blue-900 text-blue-400 px-2 py-0.5 rounded font-bold">
                    {match.matchConfidencePercent}% Compatibility Match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-900 pt-3 text-[11px] leading-relaxed">
                  <div>
                    <span className="text-slate-500 block">They teach you:</span>
                    <span className="text-slate-300 font-semibold">{match.skillOfferedToYou}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">You teach them:</span>
                    <span className="text-slate-300 font-semibold">{match.skillRequestedFromYou}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-900 pt-3 text-[10px] text-slate-500">
                  <span>Slot: {match.availableSlot} ({match.commonTimezone})</span>
                  <button
                    onClick={() => handlePeerBookExchange(match)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded text-[9px] border-0 cursor-pointer"
                  >
                    Accept Exchange
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MENTOR MARKETPLACE */}
      {activeTab === 'mentors' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Verified Alumni & Industry Mentor Marketplace</h3>
              <p className="text-xs text-slate-400">Book workshops, mock interviews, or code architecture guidance</p>
            </div>
            <button
              onClick={handleFetchMentors}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Fetch mentors
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="p-4 bg-slate-950 border border-slate-850 rounded text-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white text-sm block">{mentor.name}</span>
                    <span className="text-[10px] text-slate-500 block">{mentor.roleTitle} at {mentor.companyAffiliation}</span>
                  </div>
                  <div className="text-right">
                    {mentor.isVerifiedExpert && (
                      <span className="text-[9px] bg-emerald-950 border border-emerald-900 text-emerald-400 px-2 py-0.5 rounded font-bold block mb-1 uppercase">
                        Verified Expert
                      </span>
                    )}
                    <span className="text-slate-400 block font-bold text-[10px]">
                      {mentor.hourlyRateUSD === 0 ? 'Free Community' : `$${mentor.hourlyRateUSD}/hr`}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300 block mb-0.5">Syllabus Topics Covered:</strong>
                  {mentor.topicsCovered.join(', ')}
                </div>

                <div className="flex justify-between items-center border-t border-slate-900 pt-3 text-[10px] text-slate-500">
                  <span>Rating: {mentor.mentorRating}/5.0</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleBookSession(mentor.id, mentor.name, 'mock_interview')}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded text-[9px] border-0 cursor-pointer"
                    >
                      Book Interview
                    </button>
                    <button
                      onClick={() => handleBookSession(mentor.id, mentor.name, 'resume_review')}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold py-1 px-3 rounded text-[9px] cursor-pointer"
                    >
                      Resume Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOOKED SESSIONS CALENDAR */}
      {activeTab === 'bookings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Your Booked Schedulers Calendar</h3>
            <p className="text-xs text-slate-400">Review scheduled timelines, launch video meets, and check action items list</p>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-slate-950 border border-slate-850 rounded text-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                  <div>
                    <span className="font-bold text-white text-sm block">Session with {booking.mentorName}</span>
                    <span className="text-[10px] text-slate-500 block">{booking.dateTime} ({booking.sessionType})</span>
                  </div>
                  <a
                    href={booking.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1.5 px-3 rounded text-[10px] border-0 no-underline cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch Meet</span>
                  </a>
                </div>

                {booking.notes && (
                  <p className="text-slate-400 leading-normal italic">Notes: &ldquo;{booking.notes}&rdquo;</p>
                )}

                {booking.actionItems && booking.actionItems.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-bold text-slate-300 block uppercase text-[10px]">Follow-Up Action Items</span>
                    <div className="space-y-1">
                      {booking.actionItems.map((item, idx) => (
                        <div key={idx} className="flex gap-2 text-slate-400 text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUBMIT SESSION REVIEW */}
      {activeTab === 'reviews' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Rate Session & Submit Reviews Feedback</h3>
            <p className="text-xs text-slate-400">Fulfill peer review forms on knowledge, punctuality, communication, and helpfulness</p>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-slate-400 block font-semibold">Reputation Stars Review:</span>
                <select
                  value={reviewStars}
                  onChange={(e) => setReviewStars(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-800 rounded p-2 outline-none text-slate-200"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                  <option value={2}>2 Stars (Average)</option>
                  <option value={1}>1 Star (Poor)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block font-semibold">Write Professional Review Body:</span>
              <textarea
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder="Sarah Connor provided excellent systems-design layouts blueprints..."
                className="w-full h-24 bg-slate-950 text-slate-100 border border-slate-800 rounded p-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isProcessing || !reviewInput.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded border-0 cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review Feedback</span>
            </button>
          </form>

          {/* Submitted reviews feed list */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">Session Feedback Feed</span>
            {reviewsList.map((item) => (
              <div key={item.id} className="p-4 bg-slate-950 border border-slate-850 rounded text-xs space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white">{item.reviewerName}</span>
                  <span className="text-amber-500">{item.overallStars} / 5 Stars</span>
                </div>
                <p className="text-slate-400 leading-relaxed italic">&ldquo;{item.feedbackText}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EXCHANGE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Community Engagement & Reputation curves</h3>
              <p className="text-xs text-slate-400">Track total teaching hours, learning metrics, and rating evolution curve</p>
            </div>
            <button
              onClick={handleFetchAnalytics}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Update reputation metrics
            </button>
          </div>

          {analytics && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Reputation Score</span>
                  <span className="text-xl font-bold text-amber-500">{analytics.currentReputationScore} XP</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Teaching Hours</span>
                  <span className="text-xl font-bold text-blue-500">{analytics.totalTeachingHours} Hours</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Learning Hours</span>
                  <span className="text-xl font-bold text-emerald-400">{analytics.totalLearningHours} Hours</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Mentor Tier Level</span>
                  <span className="text-xl font-bold text-white">Tier {analytics.mentorTierLevel}</span>
                </div>
              </div>

              {/* Rating evolution curves */}
              <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-4">
                <span className="font-bold text-slate-300 block">Expert Reputation Rating curve over time</span>
                <div className="h-32 w-full flex items-end justify-between gap-1 pt-4">
                  {analytics.ratingEvolution.map((score, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-slate-400">{score} Stars</span>
                      <div className="w-full bg-blue-600/20 hover:bg-blue-600 rounded transition-all" style={{ height: `${score * 20}px` }} />
                      <span className="text-[9px] text-slate-500">Period {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
