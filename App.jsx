import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Brain, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight, PauseCircle, PlayCircle, Settings, X, Search, Bell, User, BarChart2, Activity, Wallet, ArrowUpRight, ArrowDownRight, Briefcase, Calendar, History, ArrowRight, Target, Volume2, Mic, Send, Award, Sparkles } from 'lucide-react';
const jargonDict = {
  mid_cap: {
    title: "Mid-Cap Funds",
    emoji: "🏃‍♂️",
    simpleExplanation: "Think of companies like people. Large-Cap are adults with stable jobs. Small-Cap are babies. Mid-Cap companies are like energetic teenagers! They are growing super fast, but can sometimes be a little unpredictable.",
    whyItMatters: "They have a lot of room to grow and make more money than adult companies, but they are slightly riskier.",
    example: "Imagine a successful local pizza shop that is now opening stores across the whole country. It's growing fast!",
    chartType: 'bar',
    chartData: [
      { name: 'Small (Babies)', growth: 40, risk: 40 },
      { name: 'Mid (Teens)', growth: 30, risk: 25 },
      { name: 'Large (Adults)', growth: 15, risk: 10 }
    ]
  },
  large_cap: {
    title: "Large-Cap Funds",
    emoji: "🏢",
    simpleExplanation: "These are the giant, grown-up companies. They are huge, famous, and very stable. They don't run fast, but they rarely fall down.",
    whyItMatters: "They give your portfolio a strong, safe foundation, even if the market gets crazy.",
    example: "Think of huge companies like Reliance or TCS. They've been around for a long time and make steady money.",
    chartType: 'none',
  },
  rupee_cost_averaging: {
    title: "Rupee Cost Averaging",
    emoji: "🛒",
    simpleExplanation: "Imagine you buy apples every month with exactly ₹100. When apples are expensive (₹20), you get 5 apples. When apples are cheap on sale (₹10), you get 10 apples! Over time, the average price you paid per apple goes down automatically.",
    whyItMatters: "You don't need to guess when the market is 'cheap'. By investing the same amount every month (SIP), you automatically buy MORE units when the market crashes.",
    example: "If the market drops 20% today, your ₹5,000 SIP buys 20% MORE mutual fund units! When the market recovers, those extra units make you rich.",
    chartType: 'bar',
    chartData: [
      { month: 'Jan (High)', price: 100, unitsBought: 10 },
      { month: 'Feb (Drop)', price: 80, unitsBought: 12.5 },
      { month: 'Mar (Crash)', price: 50, unitsBought: 20 },
      { month: 'Apr (Up)', price: 100, unitsBought: 10 },
    ]
  },
  compounding: {
    title: "Compounding",
    emoji: "⛄",
    simpleExplanation: "Think of a snowball rolling down a snowy hill. As it rolls, it picks up snow and gets bigger. But because it's bigger, it now picks up EVEN MORE snow with every roll. By the time it reaches the bottom, it's a giant boulder!",
    whyItMatters: "Your money earns interest. Then, that interest earns its own interest! If you don't touch it, it grows faster and faster.",
    example: "If you leave your money alone, the 'snowball' does all the heavy lifting. Breaking your SIP is like smashing the snowball halfway down the hill.",
    chartType: 'area',
    chartData: [
      { year: 'Yr 1', money: 110 },
      { year: 'Yr 5', money: 161 },
      { year: 'Yr 10', money: 259 },
      { year: 'Yr 15', money: 417 },
      { year: 'Yr 20', money: 672 }
    ]
  },
  nav: {
    title: "NAV (Net Asset Value)",
    emoji: "🏷️",
    simpleExplanation: "If a Mutual Fund is a giant pizza, the NAV is simply the price tag of ONE single slice.",
    whyItMatters: "When you put ₹1,000 into a SIP, you are buying 'slices' of the fund. If the NAV drops, your ₹1,000 buys MORE slices. If it goes up, your slices are worth more!",
    example: "If NAV is ₹100, you buy 10 slices with ₹1,000. If the market crashes and NAV becomes ₹50, you buy 20 slices with the exact same ₹1,000! That's a discount!",
    chartType: 'none',
  }
};

const generateData = (points, startValue, volatility, trend) => {
  let current = startValue;
  return Array.from({ length: points }).map((_, i) => {
    current = current * (1 + (Math.random() * volatility - volatility / 2) + trend);
    return { name: `Day ${i}`, uv: Number(current.toFixed(2)) };
  });
};

const generateFundData = (startValues, volatility, trend) => {
  return {
    '1M': generateData(30, startValues['1M'], volatility, trend),
    '6M': generateData(180, startValues['6M'], volatility, trend),
    '1Y': generateData(365, startValues['1Y'], volatility, trend),
    '3Y': generateData(1095, startValues['3Y'], volatility, trend),
    '5Y': generateData(1825, startValues['5Y'], volatility, trend),
    'ALL': generateData(2500, startValues['ALL'], volatility, trend),
  };
};

const fundGraphData = {
  // HDFC Large Cap: Low volatility, steady growth
  1: generateFundData({ '1M': 950, '6M': 800, '1Y': 700, '3Y': 500, '5Y': 300, 'ALL': 100 }, 0.015, 0.0005),
  // Nippon Small Cap: High volatility, high growth
  2: generateFundData({ '1M': 400, '6M': 320, '1Y': 250, '3Y': 150, '5Y': 80, 'ALL': 20 }, 0.035, 0.001),
  // Parag Parikh Flexi Cap: Medium volatility, solid growth
  3: generateFundData({ '1M': 750, '6M': 680, '1Y': 550, '3Y': 400, '5Y': 250, 'ALL': 80 }, 0.02, 0.0007),
  // SBI Mid Cap: Medium-High volatility
  4: generateFundData({ '1M': 600, '6M': 650, '1Y': 500, '3Y': 350, '5Y': 200, 'ALL': 50 }, 0.025, 0.0006),
};

const userInfo = {
  name: "John Doe",
  pan: "ABCDE1234F",
  kycStatus: "Verified",
  persona: "Aggressive Growth",
  totalInvestment: 1250000,
  currentValue: 1545000,
  dayChange: 12500,
  dayChangePercent: 0.82,
  totalReturns: 295000,
  totalReturnsPercent: 23.6,
  sips: [
    { 
      id: 1, name: "HDFC Top 100 Fund Direct Plan Growth", type: "Large Cap", 
      invested: 500000, current: 650000, returns: 30, xirr: 18.5, 
      sipAmount: 5000, sipDate: "5th", rating: 4.8, minSip: 100, fundSize: "32,500 Cr",
      tags: ["Equity", "Large Cap", "Very High Risk"],
      goal: "Retirement Corpus",
      goalTarget: "₹5 Cr by 2045",
      aiInsights: "This HDFC Large Cap fund perfectly aligns with your core stability goals. As a large-cap fund, it offers lower volatility compared to mid/small caps while providing steady compounding returns driven by India's top 100 blue-chip companies.",
      history: [
        { id: 100, date: "05 Jun 2021", action: "Started SIP (₹3000)", reason: "First mutual fund investment on advice of a colleague.", effect: "Great start. Initiated long-term wealth building.", isNegative: false },
        { id: 1001, date: "01 Dec 2022", action: "Skipped Installment", reason: "Needed extra cash for year-end holiday trip.", effect: "Missed one month of compounding. Minor impact on long-term goal.", isNegative: true },
        { id: 101, date: "15 Mar 2023", action: "Paused SIP", reason: "Market was crashing due to global news, panicked.", effect: "Missed accumulation at 15% lower NAV. Estimated loss of ₹18,500 in potential gains.", isNegative: true },
        { id: 102, date: "10 Oct 2023", action: "Resumed SIP", reason: "Market recovered and reached all-time highs.", effect: "Bought back at a premium, lowering overall XIRR by 1.4%.", isNegative: true },
        { id: 103, date: "5 Jan 2024", action: "Increased SIP Amount (₹3000 to ₹5000)", reason: "Got salary hike, wanted to invest more.", effect: "Excellent move. Capitalized on a minor dip, boosting long-term compounding.", isNegative: false }
      ]
    },
    { 
      id: 2, name: "Nippon India Small Cap Fund", type: "Small Cap", 
      invested: 300000, current: 420000, returns: 40, xirr: 24.2, 
      sipAmount: 3000, sipDate: "10th", rating: 4.5, minSip: 100, fundSize: "40,200 Cr",
      tags: ["Equity", "Small Cap", "Very High Risk"],
      goal: "Daughter's Education",
      goalTarget: "₹50L by 2035",
      aiInsights: "Small cap funds offer high growth potential but come with higher volatility. Your investment horizon should be 7+ years to ride out the market cycles.",
      history: [
        { id: 201, date: "10 Aug 2022", action: "Started SIP (₹1500)", reason: "Wanted exposure to small cap for higher returns.", effect: "Perfect timing before a strong small cap rally.", isNegative: false },
        { id: 2011, date: "20 May 2023", action: "Paused SIP", reason: "Saw 30% returns and wanted to 'book profits' by stopping investments.", effect: "Cut off a massive bull run prematurely. Missed out on further 22% growth.", isNegative: true },
        { id: 2012, date: "15 Nov 2023", action: "Resumed & Doubled SIP (₹3000)", reason: "FOMO after seeing the fund grow another 20%.", effect: "Re-entered at a much higher NAV, diluting previous gains.", isNegative: true },
        { id: 202, date: "12 Feb 2024", action: "Paused SIP", reason: "Needed funds for an emergency.", effect: "Missed 3 months of compounding before resuming.", isNegative: true }
      ]
    },
    { 
      id: 3, name: "Parag Parikh Flexi Cap Fund", type: "Flexi Cap", 
      invested: 250000, current: 280000, returns: 12, xirr: 10.1, 
      sipAmount: 10000, sipDate: "15th", rating: 4.9, minSip: 1000, fundSize: "55,000 Cr",
      tags: ["Equity", "Flexi Cap", "High Risk"],
      goal: "Dream Home Downpayment",
      goalTarget: "₹25L by 2028",
      aiInsights: "Flexi cap funds provide excellent diversification across market caps and geographies. A great core portfolio addition.",
      history: [
        { id: 300, date: "15 Jan 2023", action: "Started SIP (₹10000)", reason: "Advised by a friend for international exposure.", effect: "Consistent returns, portfolio stabilized.", isNegative: false },
        { id: 301, date: "10 Jul 2023", action: "Attempted to Cancel SIP", reason: "Fund was underperforming for 2 months.", effect: "AI Co-pilot successfully intervened. Kept you invested before a 12% jump in August.", isNegative: false },
        { id: 302, date: "20 Dec 2023", action: "Added Lumpsum (₹50000)", reason: "Received year-end bonus.", effect: "Smart asset allocation. Strengthened core portfolio.", isNegative: false }
      ]
    },
    { 
      id: 4, name: "SBI Magnum Midcap Fund", type: "Mid Cap", 
      invested: 200000, current: 195000, returns: -2.5, xirr: -1.2, 
      sipAmount: 2000, sipDate: "1st", rating: 4.2, minSip: 500, fundSize: "18,400 Cr",
      tags: ["Equity", "Mid Cap", "Very High Risk"],
      goal: "Car Upgrade",
      goalTarget: "₹10L by 2027",
      aiInsights: "Mid cap funds strike a balance between growth and stability. The current minor dip is a great accumulation opportunity for your SIPs.",
      history: [
        { id: 401, date: "01 Nov 2023", action: "Started SIP (₹5000)", reason: "Read an article saying midcaps are the next big thing.", effect: "Bought near peak, experiencing short term drawdown.", isNegative: true },
        { id: 402, date: "01 Mar 2024", action: "Reduced SIP Amount (₹5000 to ₹2000)", reason: "Seeing negative returns, feeling unconfident.", effect: "Reducing investment during a dip lowers the ability to average out costs.", isNegative: true },
        { id: 403, date: "15 Apr 2024", action: "Skipped Installment", reason: "Market looked red, wanted to wait and watch.", effect: "Failed to buy at the bottom of the dip.", isNegative: true }
      ]
    },
  ]
};

const pieData = [
  { name: 'Large Cap', value: 500000, color: '#00d09c' },
  { name: 'Small Cap', value: 300000, color: '#3b82f6' },
  { name: 'Flexi Cap', value: 250000, color: '#8b5cf6' },
  { name: 'Mid Cap', value: 200000, color: '#f59e0b' },
];

function App() {
  const [currentView, setCurrentView] = useState('portfolio');
  const [selectedFundId, setSelectedFundId] = useState(null);
  const [activeTab, setActiveTab] = useState('sip');
  const [pausedFunds, setPausedFunds] = useState([]);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showSmartLiquidateModal, setShowSmartLiquidateModal] = useState(false);
  const [showDeepAnalysisModal, setShowDeepAnalysisModal] = useState(false);
  const [activeJargon, setActiveJargon] = useState(null);
  const [showPauseReasonModal, setShowPauseReasonModal] = useState(false);
  const [pauseReason, setPauseReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [timeFilter, setTimeFilter] = useState('3Y');
  const [chartType, setChartType] = useState('Area');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSearchChat, setShowSearchChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'ai', content: 'Hi! I am FinLit AI. How can I help you optimize your portfolio today?' }]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [simulatorMonths, setSimulatorMonths] = useState(6);
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  const toggleSpeech = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSendQuery = () => {
    if (!searchQuery.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', content: searchQuery }]);
    setSearchQuery('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Based on your portfolio, pausing your SIP now would reduce your 5-year corpus by ~₹4.5L. I recommend staying invested to benefit from Rupee Cost Averaging during this dip.' }]);
    }, 1000);
  };
  
  const activeFundId = selectedFundId || userInfo.sips[0].id;
  const isSipActive = !pausedFunds.includes(activeFundId);
  const currentData = fundGraphData[activeFundId][timeFilter];
  const latestValue = currentData[currentData.length - 1].uv;
  const startValue = currentData[0].uv;
  const percentChange = (((latestValue - startValue) / startValue) * 100).toFixed(2);
  const isPositive = percentChange >= 0;
  
  const handlePauseAttempt = () => {
    if (isSipActive) {
      setShowPauseReasonModal(true);
      setPauseReason('');
      setCustomReason('');
    } else {
      setPausedFunds(prev => prev.filter(id => id !== activeFundId));
    }
  };

  const confirmPause = (targetFundId) => {
    const idToPause = (typeof targetFundId === 'number' || typeof targetFundId === 'string') ? targetFundId : activeFundId;
    setPausedFunds(prev => {
      if (prev.includes(idToPause)) return prev;
      return [...prev, idToPause];
    });
    setShowAiModal(false);
    setShowSmartLiquidateModal(false);
  };
  
  const handleFundSelect = (id) => {
    setSelectedFundId(id);
    setCurrentView('fund');
  };

  const renderFundView = () => {
    const fund = userInfo.sips.find(s => s.id === selectedFundId) || userInfo.sips[0];
    
    return (
      <main className="main-content">
        {/* Left Column: Fund Details */}
        <div className="fund-details">
          <div className="fund-header">
            <button className="btn btn-outline" style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '8px'}} onClick={() => setCurrentView('portfolio')}>
              &larr; Back to Dashboard
            </button>
            <div className="fund-tags">
              {fund.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <h1 className="fund-title">{fund.name}</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '16px', marginTop: '12px', fontSize: '14px', fontWeight: '500' }}>
              <Target size={16} /> Goal: {fund.goal} ({fund.goalTarget})
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <div>
                <div className="returns-value" style={{ color: isPositive ? 'var(--primary)' : 'var(--danger)' }}>
                  ₹{latestValue} <TrendingUp size={24} style={{ transform: isPositive ? 'none' : 'rotate(180deg)' }} />
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
                  {isPositive ? '+' : ''}{percentChange}% in last {timeFilter}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>
                  <Activity size={14} /> Live: Nifty 50 Volatile
                </div>
                <div className="time-filters" style={{ background: 'var(--surface-light)', padding: '4px', borderRadius: '8px' }}>
                  <button 
                    className={`time-filter ${chartType === 'Area' ? 'active' : ''}`}
                    onClick={() => setChartType('Area')}
                    style={{ border: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Activity size={14} /> Area
                  </button>
                  <button 
                    className={`time-filter ${chartType === 'Line' ? 'active' : ''}`}
                    onClick={() => setChartType('Line')}
                    style={{ border: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Activity size={14} /> Line
                  </button>
                </div>
                <div className="time-filters">
                  {['1M', '6M', '1Y', '3Y', '5Y', 'ALL'].map(t => (
                    <button 
                      key={t}
                      className={`time-filter ${timeFilter === t ? 'active' : ''}`}
                      onClick={() => setTimeFilter(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: '100%', height: '280px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'Area' ? (
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isPositive ? 'var(--primary)' : 'var(--danger)'} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={isPositive ? 'var(--primary)' : 'var(--danger)'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: isPositive ? 'var(--primary)' : 'var(--danger)' }}
                      labelStyle={{ color: 'var(--text-muted)' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke={isPositive ? 'var(--primary)' : 'var(--danger)'} fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
                  </AreaChart>
                ) : (
                  <LineChart data={currentData}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={['dataMin', 'dataMax']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: isPositive ? 'var(--primary)' : 'var(--danger)' }}
                      labelStyle={{ color: 'var(--text-muted)' }}
                    />
                    <Line type="monotone" dataKey="uv" stroke={isPositive ? 'var(--primary)' : 'var(--danger)'} strokeWidth={2} dot={false} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fund-stats">
            <div className="stat-box">
              <div className="stat-label">NAV (29 Sep)</div>
              <div className="stat-value">₹{latestValue}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Rating</div>
              <div className="stat-value">★ {fund.rating}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Fund Size</div>
              <div className="stat-value">₹{fund.fundSize}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Min. SIP</div>
              <div className="stat-value">₹{fund.minSip}</div>
            </div>
          </div>

          <div className="portfolio-health card">
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck color="var(--primary)" /> AI Portfolio Insights
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {fund.aiInsights}
            </p>
          </div>

          <div className="history-section card" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={20} color="var(--text-main)" /> Your SIP History & Decisions
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Net AI Impact</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--primary)' }}>+₹24,500 Saved</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Smart Decisions</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)' }}>4/5</div>
              </div>
            </div>

            <div className="timeline">
              {fund.history && fund.history.map((item, index) => (
                <div key={item.id} className="timeline-item" style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative' }}>
                  {/* Timeline line */}
                  {index !== fund.history.length - 1 && (
                    <div style={{ position: 'absolute', left: '19px', top: '40px', bottom: '-24px', width: '2px', background: 'var(--border)' }}></div>
                  )}
                  <div className="timeline-icon" style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', 
                    background: item.isNegative ? 'rgba(255, 77, 79, 0.1)' : 'rgba(0, 208, 156, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    border: `1px solid ${item.isNegative ? 'rgba(255, 77, 79, 0.3)' : 'rgba(0, 208, 156, 0.3)'}`
                  }}>
                    {item.isNegative ? <AlertTriangle size={18} color="var(--danger)" /> : <TrendingUp size={18} color="var(--primary)" />}
                  </div>
                  <div className="timeline-content" style={{ flex: 1, background: 'var(--surface-light)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div className="flex-between" style={{ marginBottom: '8px' }}>
                      <strong style={{ fontSize: '15px' }}>{item.action}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.date}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      <strong>Your Reason:</strong> "{item.reason}"
                    </div>
                    <div style={{ 
                      padding: '12px', borderRadius: '8px', fontSize: '13px', lineHeight: 1.5,
                      background: item.isNegative ? 'rgba(255, 77, 79, 0.05)' : 'rgba(0, 208, 156, 0.05)',
                      borderLeft: `3px solid ${item.isNegative ? 'var(--danger)' : 'var(--primary)'}`
                    }}>
                      <strong>AI Impact Analysis:</strong> {item.effect}
                    </div>
                  </div>
                </div>
              ))}
              {(!fund.history || fund.history.length === 0) && (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No history available for this fund.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: SIP Action Box */}
        <div className="action-sidebar">
          <div className="action-box">
            <div className="toggle-group">
              <div 
                className={`toggle-btn ${activeTab === 'sip' ? 'active' : ''}`}
                onClick={() => setActiveTab('sip')}
              >
                Monthly SIP
              </div>
              <div 
                className={`toggle-btn ${activeTab === 'onetime' ? 'active' : ''}`}
                onClick={() => setActiveTab('onetime')}
              >
                One-Time
              </div>
            </div>

            <div className="active-sip-banner" style={{
              background: isSipActive ? 'rgba(0, 208, 156, 0.1)' : 'rgba(255, 77, 79, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: `1px solid ${isSipActive ? 'rgba(0, 208, 156, 0.3)' : 'rgba(255, 77, 79, 0.3)'}`
            }}>
              {isSipActive ? <PlayCircle color="var(--primary)" /> : <PauseCircle color="var(--danger)" />}
              <div>
                <div style={{ fontWeight: 600, color: isSipActive ? 'var(--primary)' : 'var(--danger)' }}>
                  {isSipActive ? 'Active SIP' : 'Paused SIP'}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Next installment on {fund.sipDate}
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>Investment Amount</label>
              <div className="amount-input">
                <span>₹</span>
                <input type="number" defaultValue={fund.sipAmount} disabled={!isSipActive} />
              </div>
            </div>

            {isSipActive && (
              <div className="date-selector">
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>SIP Date</div>
                  <div style={{ fontWeight: 600 }}>{fund.sipDate} of every month</div>
                </div>
                <Settings size={18} color="var(--text-muted)" />
              </div>
            )}

            <button 
              className={`btn ${isSipActive ? 'btn-danger' : 'btn-primary'}`} 
              style={{ width: '100%' }}
              onClick={handlePauseAttempt}
            >
              {isSipActive ? (
                <><PauseCircle size={18} /> Pause SIP</>
              ) : (
                <><PlayCircle size={18} /> Resume SIP</>
              )}
            </button>
            
            {isSipActive && (
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                Powered by FinLit AI Co-Pilot
              </div>
            )}
          </div>
          
          {/* Interactive What-If Simulator */}
          <div className="action-box" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={16} color="var(--primary)" /> Scenario Simulator</h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>What happens if you pause this SIP?</div>
            
            <div style={{ marginBottom: '16px' }}>
              <div className="flex-between" style={{ fontSize: '12px', marginBottom: '8px' }}>
                <span>Pause Duration:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{simulatorMonths} months</span>
              </div>
              <input 
                type="range" 
                min="1" max="24" 
                value={simulatorMonths} 
                onChange={(e) => setSimulatorMonths(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
            
            <div style={{ background: 'rgba(255, 77, 79, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 77, 79, 0.2)' }}>
              <div style={{ fontSize: '11px', color: 'var(--danger)', marginBottom: '4px' }}>Projected Wealth Loss</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)' }}>
                -₹{Math.round(fund.sipAmount * simulatorMonths * 1.45).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Includes missed capital and lost compounding over 5 years.</div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  const renderPortfolioView = () => (
    <main className="main-content" style={{ display: 'block', maxWidth: '1000px' }}>
      <div className="portfolio-header flex-between">
        <div>
          <h1 className="portfolio-title">SIP Portfolio Dashboard</h1>
          <div className="portfolio-subtitle">Welcome back, {userInfo.name} • KYC: {userInfo.kycStatus}</div>
        </div>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setCurrentView('intelligence')}>
          <Activity size={16} /> Get AI Analysis
        </button>
      </div>

      {/* Macro-Event Alert */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ padding: '6px', background: 'var(--primary)', borderRadius: '50%', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingUp size={18} />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '4px' }}>Macro-Event Alert: RBI Rate Pause</div>
          <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
            The RBI's recent decision to pause rate hikes is a positive signal for equity markets. Historically, this environment favors <span className="jargon-link" onClick={() => setActiveJargon('mid_cap')}>Mid-Cap</span> and <span className="jargon-link" onClick={() => setActiveJargon('large_cap')}>Large-Cap</span> funds. Your portfolio is well-positioned to benefit from this stability.
          </div>
        </div>
      </div>

      <div className="portfolio-summary">
        <div className="summary-card">
          <div className="summary-label"><Wallet size={16} /> Current Value</div>
          <div className="summary-value">₹{userInfo.currentValue.toLocaleString('en-IN')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Investment</div>
          <div className="summary-value" style={{ color: 'var(--text-muted)' }}>₹{userInfo.totalInvestment.toLocaleString('en-IN')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Returns</div>
          <div className="summary-value text-success flex-between">
            ₹{userInfo.totalReturns.toLocaleString('en-IN')}
            <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={16} /> {userInfo.totalReturnsPercent}%</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Active SIPs</div>
          <div className="summary-value flex-between" style={{ color: 'var(--primary)'}}>
            {userInfo.sips.length}
            <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>Total: ₹{userInfo.sips.reduce((acc, curr) => acc + curr.sipAmount, 0).toLocaleString('en-IN')}/mo</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginBottom: '40px' }}>
        <div className="holdings-section" style={{ marginBottom: 0 }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={20} /> Your Active SIPs</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Fund Name</th>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Category</th>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>SIP Amt</th>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Invested (₹)</th>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Current (₹)</th>
                  <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Returns</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.sips.map(sip => (
                  <tr key={sip.id} onClick={() => handleFundSelect(sip.id)} style={{ cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 0', fontWeight: 600 }}>{sip.name}</td>
                    <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{sip.type}</td>
                    <td style={{ padding: '16px 0', fontWeight: 600 }}>₹{sip.sipAmount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px 0' }}>{sip.invested.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px 0', fontWeight: 600 }}>{sip.current.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px 0' }} className={sip.returns >= 0 ? 'text-success' : 'text-danger'}>
                      {sip.returns >= 0 ? '+' : ''}{sip.returns}% <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px' }}>({sip.xirr}% XIRR)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Category Allocation</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
            {pieData.map(entry => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: entry.color }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  const renderIntelligenceView = () => (
    <main className="main-content" style={{ display: 'block', maxWidth: '1000px' }}>
      <div className="portfolio-header">
        <h1 className="portfolio-title">Portfolio Intelligence</h1>
        <div className="portfolio-subtitle">AI-driven insights for optimal wealth creation</div>
      </div>

      {/* Weekly Insight Digest */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
        <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6' }}>
          <Sparkles size={20} /> Weekly Insight Digest
        </h3>
        <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6 }}>
          <strong>Portfolio Health:</strong> Stable. Your recent decision to continue your SIP in Mid-Cap funds protected you from a 2% short-term loss.<br/>
          <strong>Market Context:</strong> The IT sector is seeing a minor correction. Your Flexi-Cap fund has automatically rebalanced to mitigate this.<br/>
          <strong>Action Items:</strong> No immediate action required. Keep compounding! <span style={{ color: '#8b5cf6', fontWeight: 500 }}>(+50 FinLit points awarded for consistency).</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Portfolio Health Dashboard */}
        <div className="card">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="var(--primary)" /> Portfolio Health Dashboard
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Diversification Score</span>
            <strong style={{ color: 'var(--primary)' }}>85/100 (Optimal)</strong>
          </div>
          <div style={{ height: '8px', background: 'var(--surface-light)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span>SIPs: {userInfo.sips.length} Active</span>
            <span>ETFs: 2 Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
            <span>Mutual Funds: ₹{(userInfo.currentValue/100000).toFixed(2)}L</span>
            <span>Stocks: ₹2.95L</span>
          </div>
        </div>

        {/* Risk & Volatility Monitor */}
        <div className="card">
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle color="#f59e0b" /> Risk & Volatility Monitor
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Current Portfolio Risk</span>
            <strong style={{ color: '#f59e0b' }}>Moderate-High</strong>
          </div>
          <div style={{ fontSize: '13px', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', marginBottom: '12px' }}>
            Market sentiment is currently slightly bearish. Small cap and Mid cap exposure is increasing overall volatility.
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            VIX Indicator: <strong>14.5</strong> (Normal)
          </div>
        </div>
      </div>

      {/* Goal Alignment Tracker */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target color="var(--primary)" /> Goal Alignment Tracker
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {userInfo.sips.map(sip => (
            <div key={sip.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: 'var(--surface-light)' }}>
              <div style={{ fontWeight: 600, marginBottom: '8px' }}>{sip.goal}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Target: {sip.goalTarget}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>On Track</span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                Fund: {sip.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Performance Context */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart2 color="var(--primary)" /> Historical Performance Context
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="holdings-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Fund</th>
                <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Current Return</th>
                <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Historical Avg (3Y)</th>
                <th style={{textAlign: 'left', paddingBottom: '12px', borderBottom: '1px solid var(--border)'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.sips.map(sip => {
                const histAvg = Math.max(8, sip.returns - 4).toFixed(1);
                const isOutperforming = sip.returns > histAvg;
                return (
                <tr key={sip.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 0', fontWeight: 600 }}>{sip.name}</td>
                  <td style={{ padding: '16px 0', color: sip.returns >= 0 ? 'var(--primary)' : 'var(--danger)' }}>{sip.returns}%</td>
                  <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{histAvg}%</td>
                  <td style={{ padding: '16px 0' }}>
                    {isOutperforming ? (
                      <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 500 }}><TrendingUp size={16}/> Outperforming</span>
                    ) : (
                      <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 500 }}><AlertTriangle size={16}/> Underperforming</span>
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backend Systems Status (Demo Feature) */}
      <div className="card" style={{ marginTop: '24px', border: '1px dashed var(--primary)', background: 'transparent' }}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
          <Settings size={20} /> Architecture & Backend Systems (Dev View)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--surface-light)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>AI Reasoning Engine</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)' }}>
              <div className="ai-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> Connected (LLM + FinAPI)
            </div>
          </div>
          <div style={{ background: 'var(--surface-light)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Portfolio Analytics</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> Active (MF API Synced)
            </div>
          </div>
          <div style={{ background: 'var(--surface-light)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Event Trigger System</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> Intercepting (SIP Actions)
            </div>
          </div>
          <div style={{ background: 'var(--surface-light)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Data Visualization</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> React + D3 (Recharts)
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('portfolio')}>
          <Brain className="logo-icon" size={32} />
          <span>FinLit<span style={{ color: 'var(--primary)' }}>.ai</span></span>
        </div>
        
        <div className="nav-tabs">
          <div 
            className={`nav-tab ${currentView === 'portfolio' ? 'active' : ''}`}
            onClick={() => setCurrentView('portfolio')}
            style={{cursor: 'pointer'}}
          >
            SIP Dashboard
          </div>
          <div 
            className={`nav-tab ${currentView === 'intelligence' ? 'active' : ''}`}
            onClick={() => setCurrentView('intelligence')}
            style={{cursor: 'pointer'}}
          >
            Portfolio Intelligence
          </div>
          {currentView === 'fund' && (
            <div className="nav-tab active">
              Fund Details
            </div>
          )}
        </div>

        <div className="search-bar" onClick={() => setShowSearchChat(true)} style={{ cursor: 'pointer', border: '1px solid var(--primary)', background: 'rgba(0, 208, 156, 0.05)' }}>
          <Brain size={18} color="var(--primary)" />
          <input type="text" placeholder="Ask FinLit AI (e.g. What if I pause my SIP?)..." style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 500 }} readOnly />
        </div>
        
        <div className="nav-links">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.1)', padding: '6px 12px', borderRadius: '16px', color: '#8b5cf6', fontWeight: 600, fontSize: '14px', marginRight: '8px' }}>
            <Award size={16} /> FinLit Score: 850
          </div>
          <Bell size={20} color="var(--text-main)" style={{ cursor: 'pointer' }} />
          <User size={20} color="var(--text-main)" style={{ cursor: 'pointer' }} />
        </div>
      </nav>

      {/* Main Content Router */}
      {currentView === 'fund' ? renderFundView() : currentView === 'intelligence' ? renderIntelligenceView() : renderPortfolioView()}

      {/* Pause Reason Modal */}
      <div className={`modal-overlay ${showPauseReasonModal ? 'active' : ''}`}>
        <div className="ai-modal">
          <div className="ai-header">
            <div>
              <div className="ai-title">Pause SIP</div>
              <div className="ai-subtitle">Please select a reason</div>
            </div>
            <button 
              className="btn-outline" 
              style={{ padding: '4px', border: 'none', marginLeft: 'auto' }}
              onClick={() => setShowPauseReasonModal(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-body" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "Market is volatile / fearful of losses",
                "Need funds for an emergency",
                "Fund is underperforming",
                "Other"
              ].map(reason => (
                <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px', border: `1px solid ${pauseReason === reason ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '8px', background: pauseReason === reason ? 'rgba(0, 208, 156, 0.05)' : 'transparent' }}>
                  <input 
                    type="radio" 
                    name="pauseReason" 
                    value={reason}
                    checked={pauseReason === reason}
                    onChange={(e) => setPauseReason(e.target.value)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>{reason}</span>
                </label>
              ))}

              {pauseReason === "Other" && (
                <input 
                  type="text" 
                  placeholder="Please specify your reason..." 
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'var(--text-main)', marginTop: '8px', width: '100%', boxSizing: 'border-box' }}
                />
              )}
            </div>
            
            <div className="ai-actions" style={{ marginTop: '24px' }}>
              <button className="btn btn-outline" onClick={() => setShowPauseReasonModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                disabled={!pauseReason || (pauseReason === 'Other' && !customReason)}
                onClick={() => {
                  setShowPauseReasonModal(false);
                  if (pauseReason === "Need funds for an emergency") {
                    setShowSmartLiquidateModal(true);
                  } else {
                    setShowAiModal(true);
                  }
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Co-Pilot Intervention Modal */}
      <div className={`modal-overlay ${showAiModal ? 'active' : ''}`}>
        <div className="ai-modal">
          <div className="ai-header">
            <div className="ai-icon-large ai-pulse">
              <Brain size={28} />
            </div>
            <div>
              <div className="ai-title">FinLit AI Co-Pilot</div>
              <div className="ai-subtitle">Pre-Decision Analysis</div>
            </div>
            <button 
              className="btn-outline" 
              style={{ padding: '4px', border: 'none', marginLeft: 'auto' }}
              onClick={() => setShowAiModal(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-body">
            {(() => {
              const fund = userInfo.sips.find(s => s.id === activeFundId) || userInfo.sips[0];
              const potentialLoss = Math.round(fund.sipAmount * 12 * 5 * 1.45).toLocaleString('en-IN');
              
              let emotionMessage = "";
              let insightMessage = "";
              
              let safestToPause = null;
              
              // Per-fund-type personalized data
              const fundProfiles = {
                'Large Cap': { recovery: 14, recoveryMonths: 5, peerContinued: 88, peerGain: 12 },
                'Small Cap': { recovery: 30, recoveryMonths: 6, peerContinued: 72, peerGain: 19 },
                'Flexi Cap': { recovery: 16, recoveryMonths: 4, peerContinued: 85, peerGain: 13 },
                'Mid Cap': { recovery: 24, recoveryMonths: 6, peerContinued: 76, peerGain: 16 }
              };
              const fp = fundProfiles[fund.type] || fundProfiles['Flexi Cap'];
              
              if (pauseReason === "Market is volatile / fearful of losses") {
                emotionMessage = "It's completely normal to feel anxious when markets dip. However, historical data shows that reacting to short-term panic often harms long-term wealth.";
                insightMessage = <span>Your fund's volatility is short-term, but your goal ("{fund.goal}") is long-term. Continuing your SIP now allows you to buy more units at a lower price (<span className="jargon-link" onClick={() => setActiveJargon('rupee_cost_averaging')}>Rupee Cost Averaging</span>).<br/><br/><strong style={{color: 'var(--primary)'}}>Historical Context:</strong> After the last major downturn, {fund.name} recovered {fp.recovery}% within just {fp.recoveryMonths} months.</span>;
              } else if (pauseReason === "Need funds for an emergency") {
                safestToPause = userInfo.sips.reduce((prev, curr) => (prev.returns < curr.returns ? prev : curr));
                emotionMessage = "Emergencies are stressful, and it's understandable you're looking for liquidity. However, all SIPs are not equal.";
                if (safestToPause.id !== fund.id) {
                  insightMessage = <span>Instead of pausing {fund.name} (which is <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> well at {fund.returns}%), AI analysis suggests it is mathematically safer to pause your underperforming fund: {safestToPause.name} ({safestToPause.returns}% returns). This minimizes the impact on your long-term goals.</span>;
                } else {
                  insightMessage = <span>Since you need liquidity, {fund.name} is currently the safest to pause in your portfolio as it has the lowest relative <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> rate. Consider a temporary loan against your MFs before stopping entirely.</span>;
                }
              } else if (pauseReason === "Fund is underperforming") {
                emotionMessage = "It's frustrating when an investment doesn't meet expectations.";
                insightMessage = `Every fund goes through cycles. ${fund.name} still has a ${fund.rating}★ rating and strong fundamentals. Switching frequently can lead to exit loads and tax implications.`;
              } else {
                emotionMessage = "Before you make this change, let's look at the data.";
                insightMessage = `Consistency is the key to achieving your goal of ${fund.goalTarget}.`;
              }

              return (
                <>
                  <div className="ai-message" style={{ marginBottom: '16px', position: 'relative', background: 'var(--surface-light)', borderRadius: '16px', borderTopLeftRadius: '4px', padding: '16px', border: '1px solid var(--border)' }}>
                    <button 
                      onClick={() => toggleSpeech(`${emotionMessage} ${insightMessage}`)} 
                      style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: isSpeaking ? 'var(--primary)' : 'var(--text-muted)' }}
                      title="Listen to AI Insight"
                    >
                      <Volume2 size={20} />
                    </button>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px', paddingRight: '28px' }}>
                      {emotionMessage}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5, paddingRight: '28px' }}>
                      <strong>Explainable Insight:</strong> {insightMessage}
                    </div>
                  </div>
                  
                  <div style={{ background: 'rgba(0, 208, 156, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0, 208, 156, 0.2)', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(0, 208, 156, 0.1)', padding: '6px', borderRadius: '50%', color: 'var(--primary)' }}>
                      <User size={16} />
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      <strong>Peer Behavior Insight:</strong> {fp.peerContinued}% of investors in <strong>{fund.name}</strong> who faced similar volatility continued their SIPs. They achieved a {fp.peerGain}% higher portfolio value over 3 years compared to those who paused.
                    </div>
                  </div>

                  <div className="ai-impact" style={{ background: 'rgba(255, 77, 79, 0.05)', border: '1px solid rgba(255, 77, 79, 0.2)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                    <div className="ai-impact-title" style={{ color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <AlertTriangle size={18} /> Scenario Simulation
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      If you pause your ₹{fund.sipAmount.toLocaleString('en-IN')}/mo SIP now, your projected corpus for <strong>{fund.goal}</strong> after 5 years may reduce by approximately <strong>₹{potentialLoss}</strong> due to lost <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> and missed lower <span className="jargon-link" onClick={() => setActiveJargon('nav')}>NAV</span> accumulation.
                    </div>
                    <button 
                      onClick={() => setShowDeepAnalysisModal(true)}
                      style={{ marginTop: '12px', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <BarChart2 size={14} /> View Detailed Mathematical Breakdown
                    </button>
                  </div>
                  <div style={{ background: 'var(--surface-light)', borderRadius: '8px', padding: '12px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>AI Reasoning Path</span>
                      <span style={{ fontSize: '11px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0, 208, 156, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        <Target size={12} /> 94% Confidence
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <div style={{ padding: '4px 8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '4px' }}>
                        Data: {pauseReason === "Need funds for an emergency" ? "Liquidity Required" : "Market Volatility"}
                      </div>
                      <ArrowRight size={12} />
                      <div style={{ padding: '4px 8px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderRadius: '4px' }}>
                        Profile: {userInfo.persona}
                      </div>
                      <ArrowRight size={12} />
                      <div style={{ padding: '4px 8px', background: 'rgba(0, 208, 156, 0.1)', color: 'var(--primary)', borderRadius: '4px' }}>
                        Rec: {pauseReason === "Need funds for an emergency" && safestToPause && safestToPause.id !== fund.id ? `Redirect to ${safestToPause.name}` : "Stay Invested"}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}

            <div className="ai-actions" style={{ flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-primary" onClick={() => setShowAiModal(false)} style={{ width: '100%' }}>
                Continue SIP (Recommended)
              </button>
              <button className="btn btn-outline" onClick={() => setShowAiModal(false)} style={{ width: '100%', borderColor: 'var(--warning)', color: 'var(--warning)' }}>
                Reduce SIP by 50% Temporarily
              </button>
              <button className="btn btn-outline" onClick={confirmPause} style={{ width: '100%', border: 'none', color: 'var(--text-muted)' }}>
                Pause Anyway
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Was this insight helpful? 
              <button onClick={() => setFeedbackGiven('up')} style={{ background: feedbackGiven === 'up' ? 'rgba(0, 208, 156, 0.2)' : 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', opacity: feedbackGiven === 'down' ? 0.5 : 1 }}>👍</button>
              <button onClick={() => setFeedbackGiven('down')} style={{ background: feedbackGiven === 'down' ? 'rgba(255, 77, 79, 0.2)' : 'transparent', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', opacity: feedbackGiven === 'up' ? 0.5 : 1 }}>👎</button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              FinLit AI provides analysis, not advisory. You remain in full control. 
              <span style={{ color: 'var(--primary)', cursor: 'pointer', marginLeft: '6px', textDecoration: 'underline' }} onClick={() => setShowPrivacyModal(true)}>
                How AI Uses Your Data
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Ask FinLit AI Chat Modal */}
      <div className={`modal-overlay ${showSearchChat ? 'active' : ''}`}>
        <div className="ai-modal" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
          <div className="ai-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="ai-icon-large ai-pulse">
              <Brain size={28} />
            </div>
            <div>
              <div className="ai-title">Ask FinLit AI</div>
              <div className="ai-subtitle">Your personal wealth co-pilot</div>
            </div>
            <button 
              className="btn-outline" 
              style={{ padding: '4px', border: 'none', marginLeft: 'auto' }}
              onClick={() => setShowSearchChat(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-body" style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {chatHistory.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface-light)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-main)',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
                maxWidth: '80%',
                lineHeight: 1.5,
                border: msg.role === 'ai' ? '1px solid var(--border)' : 'none'
              }}>
                {msg.content}
              </div>
            ))}
          </div>
          
          <div style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-outline" style={{ padding: '10px', borderRadius: '50%', border: 'none' }}>
              <Mic size={20} color="var(--text-muted)" />
            </button>
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--surface-light)', color: 'var(--text-main)' }}
            />
            <button className="btn-primary" style={{ padding: '10px', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleSendQuery}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      {/* Privacy & Transparency Modal */}
      <div className={`modal-overlay ${showPrivacyModal ? 'active' : ''}`}>
        <div className="ai-modal">
          <div className="ai-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div className="ai-title">Data Privacy & Transparency</div>
              <div className="ai-subtitle">How FinLit AI generates insights</div>
            </div>
            <button className="btn-outline" style={{ padding: '4px', border: 'none', marginLeft: 'auto' }} onClick={() => setShowPrivacyModal(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="ai-body" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-main)' }}>What data does AI use?</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              <li><strong>Portfolio Data:</strong> Asset allocation, historical returns, and SIP amounts.</li>
              <li><strong>Market Data:</strong> Macro-economic indicators (e.g., RBI rates), Nifty/Mid-cap trends.</li>
              <li><strong>Profile Data:</strong> Your stated goals (e.g., "Retirement") and risk persona ({userInfo.persona}).</li>
            </ul>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-main)' }}>Regulatory Guardrails</h4>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '16px', borderRadius: '8px', fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
              FinLit AI is an execution-only analytical tool designed to support your decision-making. We never execute trades automatically. You are always the final decision maker. Your data is encrypted and never sold to third parties.
            </div>
          </div>
        </div>
      </div>
      {/* Smart Liquidate Modal */}
      <div className={`modal-overlay ${showSmartLiquidateModal ? 'active' : ''}`}>
        <div className="ai-modal" style={{ maxWidth: '600px', width: '90%' }}>
          <div className="ai-header" style={{ borderBottom: '1px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="ai-icon-large ai-pulse" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Activity size={28} />
            </div>
            <div>
              <div className="ai-title">Smart Liquidity Analysis</div>
              <div className="ai-subtitle">Optimizing your portfolio for emergency withdrawals</div>
            </div>
            <button className="btn-outline" style={{ padding: '4px', border: 'none', marginLeft: 'auto' }} onClick={() => setShowSmartLiquidateModal(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-body" style={{ padding: '24px' }}>
            {(() => {
              const currentFund = userInfo.sips.find(s => s.id === activeFundId) || userInfo.sips[0];
              const safestToPause = userInfo.sips.reduce((prev, curr) => (prev.returns < curr.returns ? prev : curr));
              const potentialLoss = Math.round(currentFund.sipAmount * 12 * 5 * 1.45).toLocaleString('en-IN');
              
              const fundProfiles = {
                'Large Cap': { recovery: 14, recoveryMonths: 5, peerContinued: 88, peerGain: 12 },
                'Small Cap': { recovery: 30, recoveryMonths: 6, peerContinued: 72, peerGain: 19 },
                'Flexi Cap': { recovery: 16, recoveryMonths: 4, peerContinued: 85, peerGain: 13 },
                'Mid Cap': { recovery: 24, recoveryMonths: 6, peerContinued: 76, peerGain: 16 }
              };
              const fp = fundProfiles[currentFund.type] || fundProfiles['Flexi Cap'];
              
              const comparisonData = [
                { name: 'Current Fund', impact: currentFund.sipAmount * 12 * 5 * 1.45, fill: '#ff4d4f' },
                { name: 'Safest Fund', impact: safestToPause.sipAmount * 12 * 5 * 1.15, fill: '#00d09c' }
              ];
              
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Summary Block */}
                  <div style={{ background: 'var(--surface-light)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h4 style={{ marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Brain size={18} color="var(--primary)" /> AI Recommendation
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      You requested to pause <strong>{currentFund.name}</strong>. However, this fund is tied to your <strong>{currentFund.goal}</strong>, which is a high-priority goal <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> at <strong>{currentFund.returns}%</strong>. 
                      Instead, pausing <strong>{safestToPause.name}</strong> is mathematically safer, as it minimizes long-term <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> loss and protects your most critical goals.
                    </p>
                  </div>


                  <div style={{ background: 'rgba(0, 208, 156, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0, 208, 156, 0.2)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'rgba(0, 208, 156, 0.1)', padding: '6px', borderRadius: '50%', color: 'var(--primary)' }}>
                      <User size={16} />
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      <strong>Peer Behavior Insight:</strong> {fp.peerContinued}% of investors in <strong>{currentFund.name}</strong> who faced similar volatility continued their SIPs. They achieved a {fp.peerGain}% higher portfolio value over 3 years compared to those who paused.
                    </div>
                  </div>

                  <div className="ai-impact" style={{ background: 'rgba(255, 77, 79, 0.05)', border: '1px solid rgba(255, 77, 79, 0.2)', padding: '16px', borderRadius: '8px' }}>
                    <div className="ai-impact-title" style={{ color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <AlertTriangle size={18} /> Scenario Simulation
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.5 }}>
                      If you pause your ₹{currentFund.sipAmount.toLocaleString('en-IN')}/mo SIP now, your projected corpus for <strong>{currentFund.goal}</strong> after 5 years may reduce by approximately <strong>₹{potentialLoss}</strong> due to lost <span className="jargon-link" onClick={() => setActiveJargon('compounding')}>compounding</span> and missed lower <span className="jargon-link" onClick={() => setActiveJargon('nav')}>NAV</span> accumulation.
                    </div>
                  </div>

                  {/* Charts */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div className="card" style={{ padding: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-main)' }}>5-Year Wealth Loss (Lower is Better)</div>
                      <div style={{ height: '140px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={comparisonData}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: 'var(--text-muted)'}} />
                            <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => `₹${Math.round(value).toLocaleString('en-IN')}`} />
                            <Bar dataKey="impact" radius={[4, 4, 0, 0]} barSize={30}>
                              {comparisonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="card" style={{ padding: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-main)' }}>Goal Priority (Urgency)</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <div className="flex-between" style={{ fontSize: '12px', marginBottom: '4px' }}>
                            <span>{currentFund.goal}</span>
                            <span style={{ color: '#ff4d4f' }}>High</span>
                          </div>
                          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '85%', height: '100%', background: '#ff4d4f' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex-between" style={{ fontSize: '12px', marginBottom: '4px' }}>
                            <span>{safestToPause.goal}</span>
                            <span style={{ color: '#00d09c' }}>Low</span>
                          </div>
                          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: '40%', height: '100%', background: '#00d09c' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <button 
                    onClick={() => {
                      setShowSmartLiquidateModal(false);
                      setShowDeepAnalysisModal(true);
                    }}
                    style={{ marginTop: '12px', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', width: 'fit-content' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <BarChart2 size={14} /> View Detailed Mathematical Breakdown
                  </button>

                  {/* Actions */}
                  <div className="ai-actions" style={{ marginTop: '8px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button className="btn btn-outline" onClick={() => confirmPause(currentFund.id)}>
                      Pause {currentFund.name} Anyway
                    </button>
                    <button className="btn btn-primary" onClick={() => confirmPause(safestToPause.id)}>
                      Pause {safestToPause.name} Instead
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
      {/* Jargon Modal */}
      <div className={`modal-overlay ${activeJargon ? 'active' : ''}`}>
        <div className="ai-modal" style={{ maxWidth: '500px', width: '90%' }}>
          {activeJargon && jargonDict[activeJargon] && (
            <>
              <div className="ai-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '32px' }}>{jargonDict[activeJargon].emoji}</div>
                <div>
                  <div className="ai-title">{jargonDict[activeJargon].title}</div>
                  <div className="ai-subtitle">Explained simply!</div>
                </div>
                <button className="btn-outline" style={{ padding: '4px', border: 'none', marginLeft: 'auto' }} onClick={() => setActiveJargon(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="ai-body" style={{ padding: '24px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                  <h4 style={{ color: '#3b82f6', marginBottom: '8px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Brain size={16} /> The Simple Explanation
                  </h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '14px', lineHeight: 1.6 }}>
                    {jargonDict[activeJargon].simpleExplanation}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '14px' }}>Why it matters for you:</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5 }}>
                    {jargonDict[activeJargon].whyItMatters}
                  </p>
                </div>

                <div style={{ background: 'var(--surface-light)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '14px' }}>Real Example:</h4>
                  <p style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: 1.5 }}>
                    {jargonDict[activeJargon].example}
                  </p>
                </div>

                {jargonDict[activeJargon].chartType !== 'none' && jargonDict[activeJargon].chartData && (
                  <div style={{ height: '180px', marginTop: '24px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      {jargonDict[activeJargon].chartType === 'area' ? (
                        <AreaChart data={jargonDict[activeJargon].chartData}>
                          <XAxis dataKey="year" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="money" stroke="var(--primary)" fill="rgba(0, 208, 156, 0.2)" />
                        </AreaChart>
                      ) : (
                        <BarChart data={jargonDict[activeJargon].chartData}>
                          <XAxis dataKey={jargonDict[activeJargon].chartData[0].month ? "month" : "name"} tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey={jargonDict[activeJargon].chartData[0].unitsBought ? "unitsBought" : "growth"} fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                )}
                
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <button className="btn btn-primary" onClick={() => setActiveJargon(null)} style={{ width: '100%' }}>
                    Got it!
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Deep Analysis Modal */}
      <div className={`modal-overlay ${showDeepAnalysisModal ? 'active' : ''}`} style={{ zIndex: 1100 }}>
        <div className="ai-modal" style={{ maxWidth: '750px', width: '95%', maxHeight: '85vh', overflow: 'auto' }}>
          <div className="ai-header" style={{ borderBottom: '1px solid var(--border)', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, background: 'var(--surface)', zIndex: 2 }}>
            <div className="ai-icon-large ai-pulse" style={{ background: 'rgba(0, 208, 156, 0.1)' }}>
              <Brain size={28} />
            </div>
            <div>
              <div className="ai-title">AI Deep Analysis Report</div>
              <div className="ai-subtitle">A transparent, data-driven breakdown of what pausing really costs</div>
            </div>
            <button className="btn-outline" style={{ padding: '4px', border: 'none', marginLeft: 'auto' }} onClick={() => setShowDeepAnalysisModal(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-body" style={{ padding: '24px' }}>
            {(() => {
              const fund = userInfo.sips.find(s => s.id === activeFundId) || userInfo.sips[0];
              const monthly = fund.sipAmount;
              const months = 6;
              const missedCapital = monthly * months;
              const rate = fund.xirr / 100;
              const growthMultiplier = Math.pow(1 + rate, 5);
              const lostGrowth = Math.round(missedCapital * (growthMultiplier - 1));
              const totalLoss = missedCapital + lostGrowth;

              // Per-fund recovery data based on fund type volatility
              const recoveryProfiles = {
                'Large Cap': { dip: -8, m1: -5, m2: -1, m3: 3, m4: 7, m5: 11, m6: 14, peer: 88, peerGain: 12 },
                'Small Cap': { dip: -22, m1: -15, m2: -8, m3: 0, m4: 10, m5: 22, m6: 30, peer: 72, peerGain: 19 },
                'Flexi Cap': { dip: -10, m1: -6, m2: -2, m3: 2, m4: 8, m5: 13, m6: 16, peer: 85, peerGain: 13 },
                'Mid Cap': { dip: -18, m1: -12, m2: -5, m3: 1, m4: 9, m5: 17, m6: 24, peer: 76, peerGain: 16 }
              };
              const profile = recoveryProfiles[fund.type] || recoveryProfiles['Flexi Cap'];

              const lossBreakdownData = [
                { name: 'Missed Capital', value: missedCapital, fill: '#f59e0b' },
                { name: 'Lost Compounding', value: lostGrowth, fill: '#ff4d4f' }
              ];

              // Dynamic projection based on actual fund XIRR
              const annualGrowth = 1 + rate;
              const pausedGrowth = 1 + (rate * 0.4); // paused path grows much slower
              const projectionData = [
                { year: 'Today', continued: 100, paused: 100 },
                { year: 'Year 1', continued: Math.round(100 * annualGrowth), paused: Math.round(100 * pausedGrowth) },
                { year: 'Year 2', continued: Math.round(100 * Math.pow(annualGrowth, 2)), paused: Math.round(100 * Math.pow(pausedGrowth, 2)) },
                { year: 'Year 3', continued: Math.round(100 * Math.pow(annualGrowth, 3)), paused: Math.round(100 * Math.pow(pausedGrowth, 3)) },
                { year: 'Year 4', continued: Math.round(100 * Math.pow(annualGrowth, 4)), paused: Math.round(100 * Math.pow(pausedGrowth, 4)) },
                { year: 'Year 5', continued: Math.round(100 * Math.pow(annualGrowth, 5)), paused: Math.round(100 * Math.pow(pausedGrowth, 5)) }
              ];

              // Dynamic unit accumulation based on fund's SIP amount
              const baseNAV = fund.type === 'Small Cap' ? 45 : fund.type === 'Mid Cap' ? 80 : fund.type === 'Flexi Cap' ? 60 : 100;
              const unitAccumulationData = [
                { month: `Jan (NAV ₹${baseNAV})`, units: Math.round(monthly / baseNAV) },
                { month: `Feb (NAV ₹${Math.round(baseNAV * 0.75)})`, units: Math.round(monthly / (baseNAV * 0.75)) },
                { month: `Mar (NAV ₹${Math.round(baseNAV * 0.5)})`, units: Math.round(monthly / (baseNAV * 0.5)) },
                { month: `Apr (NAV ₹${Math.round(baseNAV * 0.9)})`, units: Math.round(monthly / (baseNAV * 0.9)) }
              ];

              const peerData = [
                { name: 'Continued SIP', percentage: profile.peer, fill: 'var(--primary)' },
                { name: 'Paused SIP', percentage: 100 - profile.peer, fill: 'var(--danger)' }
              ];

              const continuedCorpus = Math.round(fund.current * growthMultiplier);
              const goalComparisonData = [
                { name: 'Continued SIP', value: continuedCorpus, fill: '#00d09c' },
                { name: 'Paused 6 Months', value: continuedCorpus - totalLoss, fill: '#ff4d4f' }
              ];

              const recoveryData = [
                { period: 'Dip Start', returns: profile.dip },
                { period: 'Month 1', returns: profile.m1 },
                { period: 'Month 2', returns: profile.m2 },
                { period: 'Month 3', returns: profile.m3 },
                { period: 'Month 4', returns: profile.m4 },
                { period: 'Month 5', returns: profile.m5 },
                { period: 'Month 6', returns: profile.m6 }
              ];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

                  {/* Section 1: The True Cost Breakdown */}
                  <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <Wallet size={20} color="#f59e0b" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>The True Cost of a 6-Month Pause</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      When you stop investing ₹{monthly.toLocaleString('en-IN')}/month for 6 months, the loss isn't just the ₹{missedCapital.toLocaleString('en-IN')} you didn't invest. That capital would have <strong>compounded over your remaining investment horizon</strong>, generating significantly more wealth.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Missed Capital</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>₹{missedCapital.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Lost Compounding</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--danger)' }}>₹{lostGrowth.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid rgba(255, 77, 79, 0.3)' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>Total Impact</div>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--danger)' }}>₹{totalLoss.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    <div style={{ height: '180px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={lossBreakdownData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={5}>
                            {lossBreakdownData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Pie>
                          <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '50%' }}></div> Missed Capital</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '10px', height: '10px', background: '#ff4d4f', borderRadius: '50%' }}></div> Lost Compounding</span>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Key Insight:</strong> The missed capital is only part of the story. The larger portion — <strong style={{ color: 'var(--danger)' }}>₹{lostGrowth.toLocaleString('en-IN')}</strong> — is the future returns that capital would have generated through compounding over the next 5 years.
                    </div>
                  </div>

                  {/* Section 2: Wealth Trajectory Comparison */}
                  <div style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <TrendingUp size={20} color="#3b82f6" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>Wealth Trajectory: Continued vs Paused</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      This chart shows how your portfolio value diverges over 5 years. Notice how the gap between the two paths <strong>widens every year</strong> — that's compounding in action. Early interruptions have an outsized long-term impact.
                    </p>
                    <div style={{ height: '210px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projectionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="continued" stroke="#00d09c" fill="rgba(0, 208, 156, 0.15)" name="Continued SIP" strokeWidth={2} />
                          <Area type="monotone" dataKey="paused" stroke="#ff4d4f" fill="rgba(255, 77, 79, 0.08)" name="Paused 6 Months" strokeWidth={2} strokeDasharray="5 5" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Key Insight:</strong> The green area (continued SIP) grows exponentially. The dashed red line (paused) falls behind and <em>never catches up</em>. The widening gap represents the real opportunity cost — money you can never recover.
                    </div>
                  </div>

                  {/* Section 3: Unit Accumulation During Dips */}
                  <div style={{ background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <BarChart2 size={20} color="#8b5cf6" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>Unit Accumulation: Why Dips Are Opportunities</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      With a fixed monthly SIP of ₹{monthly.toLocaleString('en-IN')}, you buy more units when the NAV drops and fewer when it rises. This is Rupee Cost Averaging — and <strong>pausing during a dip means missing the months where you'd accumulate the most units</strong>.
                    </p>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={unitAccumulationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="month" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: 'var(--text-muted)' } }} />
                          <Tooltip />
                          <Bar dataKey="units" fill="#8b5cf6" name="Units Acquired" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Key Insight:</strong> In March, when the NAV dropped to ₹50, the same ₹{monthly.toLocaleString('en-IN')} bought <strong>100 units instead of 50</strong>. These extra units generate outsized returns when the market recovers. Pausing during dips means missing the highest-value accumulation months.
                    </div>
                  </div>

                  {/* Section 4: Peer Behavior */}
                  <div style={{ background: 'rgba(0, 208, 156, 0.06)', border: '1px solid rgba(0, 208, 156, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <Activity size={20} color="var(--primary)" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>Peer Investor Behavior Analysis</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      During similar periods of market volatility, here's how investors in <strong>{fund.name}</strong> responded — and the outcome difference between the two groups:
                    </p>
                    <div style={{ height: '140px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={peerData} layout="vertical" barSize={28}>
                          <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                          <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                          <Tooltip formatter={(v) => `${v}% of investors`} />
                          <Bar dataKey="percentage" radius={[0, 6, 6, 0]} name="Investors">
                            {peerData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Key Insight:</strong> <strong>{profile.peer}% of investors chose to continue</strong> their SIPs during similar volatility. Over 3 years, their portfolios outperformed the paused group by {profile.peerGain}%. Disciplined investors consistently come out ahead.
                    </div>
                  </div>

                  {/* Section 5: Historical Recovery Pattern */}
                  <div style={{ background: 'rgba(250, 173, 20, 0.06)', border: '1px solid rgba(250, 173, 20, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <History size={20} color="#faad14" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>Historical Recovery Pattern</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      This chart shows {fund.name}'s actual recovery path after the last major correction. Markets are cyclical — <strong>every major dip in this fund's history has been followed by a recovery</strong>.
                    </p>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={recoveryData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="period" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                          <Tooltip formatter={(v) => `${v}%`} />
                          <Area type="monotone" dataKey="returns" stroke="#faad14" fill="rgba(250, 173, 20, 0.12)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Key Insight:</strong> From a {profile.dip}% dip, this fund recovered to <strong>+{profile.m6}% within 6 months</strong>. Investors who stayed invested captured the full {profile.m6 - profile.dip}-point swing. Those who paused at the bottom missed the sharpest part of the recovery — where most of the gains are made.
                    </div>
                  </div>

                  {/* Section 6: Goal Impact */}
                  <div style={{ background: 'rgba(255, 77, 79, 0.06)', border: '1px solid rgba(255, 77, 79, 0.2)', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <Target size={20} color="var(--danger)" />
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '15px' }}>Direct Impact on Your Goal: "{fund.goal}"</div>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                      You're working toward <strong>{fund.goalTarget}</strong>. Here's how a 6-month pause shifts your projected outcome — potentially pushing your goal timeline by months or even years.
                    </p>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={goalComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
                          <Bar dataKey="value" name="Projected Value" radius={[8, 8, 0, 0]}>
                            {goalComparisonData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '14px', background: 'var(--surface)', borderRadius: '8px', padding: '12px', fontSize: '13px', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--danger)' }}>⚠</span> <strong style={{ color: 'var(--text-main)' }}>Gap: ₹{totalLoss.toLocaleString('en-IN')}</strong> <span style={{ color: 'var(--text-muted)' }}>— This shortfall from just 6 months of pausing could delay your "{fund.goal}" target significantly. Compounding is time-sensitive; the earlier you stay invested, the harder your money works for you.</span>
                    </div>
                  </div>

                  {/* Final Summary */}
                  <div style={{ background: 'linear-gradient(135deg, rgba(0, 208, 156, 0.08), rgba(59, 130, 246, 0.08))', border: '1px solid var(--primary)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Brain size={20} color="var(--primary)" />
                      <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-main)' }}>AI Summary</div>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 20px' }}>
                      Market volatility feels uncomfortable, but data consistently shows that <strong>staying invested during downturns is the single most impactful decision</strong> for long-term wealth creation. Pausing now costs you the capital, the compounding, and the discounted units — a triple loss that takes years to recover from.
                    </p>
                    <button className="btn btn-primary" onClick={() => setShowDeepAnalysisModal(false)} style={{ padding: '10px 32px', fontSize: '14px' }}>
                      I Understand — Back to Decision
                    </button>
                  </div>

                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
