import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";

const SPLINE_URL = "https://prod.spline.design/5QSlhRok4G5W-sUn/scene.splinecode";

const AI_AVATAR = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="url(#ag)" opacity="0.2"/>
    <path d="M9 9h1.5M13.5 9H15M8 13c1.333 1.333 6.667 1.333 8 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10.5" cy="9.5" r="0.75" fill="white"/>
    <circle cx="13.5" cy="9.5" r="0.75" fill="white"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <defs>
      <linearGradient id="ag" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#38bdf8"/><stop offset="1" stopColor="#818cf8"/>
      </linearGradient>
    </defs>
  </svg>
);

const GOOGLE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const initialMessages = [
  { id: 1, role: "ai", text: "Hello! I'm your AI interviewer. I'll ask you a series of questions to build a comprehensive profile. Ready to begin?" }
];

const interviewQuestions = [
  "Great! Let's start. Can you briefly introduce yourself — your name, background, and what you currently do?",
  "What's the most impactful project you've worked on, and what was your specific role in it?",
  "How do you typically approach problem-solving when you face a challenge you haven't encountered before?",
  "What are your core strengths, and can you give an example of how they've helped you succeed?",
  "Where do you see yourself in the next 3–5 years, and what are you working toward?",
  "Is there anything else you'd like me to know about you that we haven't covered?",
];

export default function App() {
  const [screen, setScreen] = useState("login");
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  const handleAuth = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setScreen("chat"); }, 1400);
  };

  const sendMessage = () => {
    if (!input.trim() || aiTyping) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text: input.trim() }]);
    setInput("");
    setAiTyping(true);
    setTimeout(() => {
      const next = qIndex < interviewQuestions.length
        ? interviewQuestions[qIndex]
        : "Thank you so much! I've gathered everything I need to create your profile. Your report will be ready shortly. 🎉";
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", text: next }]);
      setAiTyping(false);
      setQIndex(i => i + 1);
    }, 1200 + Math.random() * 600);
  };

  const progress = Math.min(100, Math.round((qIndex / interviewQuestions.length) * 100));

  const F = "'Sora', sans-serif";
  const serif = "'Fraunces', serif";

  const inputBase = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontFamily: F,
    outline: "none",
    display: "block",
  };

  const labelBase = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: 6,
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", fontFamily: F, background: "#06060f" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, button { font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

        .inp:focus {
          border-color: rgba(56,189,248,0.55) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.1) !important;
        }

        .name-slot {
          display: grid;
          transition: grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.28s ease;
        }
        .name-slot.open  { grid-template-rows: 1fr; opacity: 1; }
        .name-slot.shut  { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
        .name-inner { overflow: hidden; }

        .spin { width:15px; height:15px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:sp .7s linear infinite; display:inline-block; vertical-align:middle; }
        @keyframes sp { to { transform:rotate(360deg); } }

        .dot { width:6px; height:6px; border-radius:50%; background:rgba(56,189,248,0.8); animation:bo 1.1s ease-in-out infinite; }
        .dot:nth-child(2){animation-delay:.18s}
        .dot:nth-child(3){animation-delay:.36s}
        @keyframes bo { 0%,60%,100%{transform:translateY(0);opacity:.45} 30%{transform:translateY(-5px);opacity:1} }

        .mi { animation: mi .3s cubic-bezier(.16,1,.3,1) both; }
        @keyframes mi { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        .cta:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-1px); }
        .cta:disabled { opacity: .5; cursor: not-allowed; }
        .cta { transition: all .2s; }

        .gbtn:hover { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
        .sbtn:hover:not(:disabled) { transform: scale(1.06); }
        .sbtn:disabled { opacity: .35; cursor: not-allowed; }
        .endbtn:hover { background: rgba(239,68,68,0.18) !important; color: #f87171 !important; }
      `}</style>

      {/* ── Spline 3D bg ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        <Spline scene={SPLINE_URL} />
      </div>
      <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
        background:"radial-gradient(ellipse at 15% 50%, rgba(6,6,15,0.2), rgba(6,6,15,0.62))" }}/>

      {/* ══════════════════════════════════════════
          LOGIN  —  card is position:fixed, anchored
          to the viewport with top/right. Nothing in
          the document flow can ever displace it.
      ══════════════════════════════════════════ */}
      {screen === "login" && (
        <div style={{
          position: "fixed",       /* viewport-relative — immune to layout */
          top: "50%",
          right: "7vw",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: 396,
          background: "rgba(7,7,18,0.76)",
          backdropFilter: "blur(30px) saturate(1.4)",
          WebkitBackdropFilter: "blur(30px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 22,
          padding: "34px 30px 30px",
          boxShadow: "0 28px 70px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}>

          {/* Logo row */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:26 }}>
            <div style={{
              width:33, height:33, borderRadius:9, fontSize:15,
              background:"linear-gradient(135deg,#38bdf8,#818cf8)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 14px rgba(56,189,248,0.3)",
            }}>✦</div>
            <span style={{ fontFamily:serif, fontSize:18, color:"#fff", letterSpacing:"-0.02em" }}>InterviewAI</span>
            <span style={{
              marginLeft:"auto", fontSize:10, fontWeight:600, color:"#38bdf8",
              background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.22)",
              padding:"2px 8px", borderRadius:20, letterSpacing:"0.06em", textTransform:"uppercase",
            }}>Beta</span>
          </div>

          {/* Tabs */}
          <div style={{
            display:"flex", gap:3,
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:11, padding:3, marginBottom:22,
          }}>
            {[["signin","Sign In"],["signup","Sign Up"]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer",
                fontSize:13, fontWeight:500,
                background: mode===m ? "linear-gradient(135deg,#1e40af,#4338ca)" : "transparent",
                color: mode===m ? "#fff" : "rgba(255,255,255,0.35)",
                boxShadow: mode===m ? "0 2px 10px rgba(67,56,202,0.38)" : "none",
                transition: "all .2s",
              }}>{label}</button>
            ))}
          </div>

          {/* Heading */}
          <h2 style={{ fontFamily:serif, fontSize:21, color:"#fff", marginBottom:4, letterSpacing:"-0.02em" }}>
            {mode==="signin" ? "Welcome back" : "Start your journey"}
          </h2>
          <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.35)", marginBottom:20 }}>
            {mode==="signin" ? "Sign in to your AI interview session" : "Create an account to get interviewed by AI"}
          </p>

          {/* Name — CSS grid trick: collapses to 0 height without JS layout side-effects */}
          <div className={`name-slot ${mode==="signup" ? "open" : "shut"}`}>
            <div className="name-inner">
              <div style={{ paddingBottom:14 }}>
                <label style={labelBase}>Full Name</label>
                <input className="inp" style={inputBase} type="text" placeholder="Jane Doe"
                  value={name} onChange={e=>setName(e.target.value)}/>
              </div>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom:14 }}>
            <label style={labelBase}>Email</label>
            <input className="inp" style={inputBase} type="email" placeholder="you@example.com"
              value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>

          {/* Password */}
          <div style={{ marginBottom: mode==="signin" ? 4 : 18 }}>
            <label style={labelBase}>Password</label>
            <div style={{ position:"relative" }}>
              <input className="inp" style={{ ...inputBase, paddingRight:40 }}
                type={showPass?"text":"password"} placeholder="••••••••"
                value={password} onChange={e=>setPassword(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleAuth()}/>
              <span onClick={()=>setShowPass(p=>!p)} style={{
                position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                color:"rgba(255,255,255,0.28)", cursor:"pointer", fontSize:14, userSelect:"none",
              }}>{showPass?"🙈":"👁"}</span>
            </div>
          </div>

          {/* Forgot */}
          {mode==="signin" && (
            <div style={{ textAlign:"right", marginBottom:16 }}>
              <button style={{ background:"none", border:"none", color:"#38bdf8", fontSize:12.5, cursor:"pointer" }}>
                Forgot password?
              </button>
            </div>
          )}

          {/* CTA */}
          <button className="cta" disabled={loading||!email||!password} onClick={handleAuth} style={{
            width:"100%", padding:"12px 0",
            background:"linear-gradient(135deg,#0ea5e9,#6366f1)",
            border:"none", borderRadius:11, color:"#fff",
            fontSize:14.5, fontWeight:600, cursor:"pointer",
            boxShadow:"0 6px 20px rgba(99,102,241,0.32)",
          }}>
            {loading ? <span className="spin"/> : mode==="signin" ? "Continue →" : "Create Account →"}
          </button>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:10, margin:"16px 0", color:"rgba(255,255,255,0.2)", fontSize:11 }}>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>or
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }}/>
          </div>

          {/* Google */}
          <button className="gbtn" onClick={()=>setScreen("chat")} style={{
            width:"100%", padding:"10px 0",
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)",
            borderRadius:11, color:"rgba(255,255,255,0.58)", fontSize:13.5, fontWeight:500,
            cursor:"pointer", transition:"all .2s",
          }}>
            {GOOGLE_ICON} Continue with Google
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════
          CHAT SCREEN
      ══════════════════════════════════════════ */}
      {screen === "chat" && (
        <div style={{ position:"fixed", inset:0, zIndex:20, display:"flex", flexDirection:"column" }}>

          {/* Header */}
          <div style={{
            display:"flex", alignItems:"center", gap:14, padding:"13px 22px",
            background:"rgba(6,6,15,0.82)", backdropFilter:"blur(20px)",
            borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0,
          }}>
            <div style={{
              width:38, height:38, borderRadius:"50%", position:"relative",
              background:"linear-gradient(135deg,rgba(56,189,248,0.14),rgba(99,102,241,0.14))",
              border:"1.5px solid rgba(56,189,248,0.28)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <AI_AVATAR/>
              <span style={{ position:"absolute", bottom:0, right:0, width:9, height:9, background:"#22c55e", borderRadius:"50%", border:"2px solid #06060f" }}/>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:600, color:"#fff" }}>AI Interviewer</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.38)" }}>Conducting your profile interview</div>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.42)" }}>{progress}%</span>
              <div style={{ width:110, height:5, background:"rgba(255,255,255,0.08)", borderRadius:10, overflow:"hidden" }}>
                <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#38bdf8,#818cf8)", transition:"width .6s ease", borderRadius:10 }}/>
              </div>
              <button className="endbtn" onClick={()=>{setScreen("login");setMessages(initialMessages);setQIndex(0);}} style={{
                padding:"6px 14px", background:"rgba(239,68,68,0.09)",
                border:"1px solid rgba(239,68,68,0.22)", borderRadius:8,
                color:"rgba(239,68,68,0.78)", fontSize:12, fontWeight:500, cursor:"pointer", transition:"all .2s",
              }}>End Session</button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"22px 0", display:"flex", flexDirection:"column", gap:2 }}>
            {messages.map(msg => (
              <div key={msg.id} className="mi" style={{
                display:"flex", padding:"4px 22px",
                justifyContent: msg.role==="user" ? "flex-end" : "flex-start",
              }}>
                {msg.role==="ai" && (
                  <div style={{
                    width:30, height:30, flexShrink:0, borderRadius:"50%",
                    background:"linear-gradient(135deg,rgba(56,189,248,0.12),rgba(99,102,241,0.12))",
                    border:"1px solid rgba(56,189,248,0.18)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginRight:9, marginTop:4,
                  }}><AI_AVATAR/></div>
                )}
                <div style={{
                  maxWidth:500, padding:"12px 16px", fontSize:14.5, lineHeight:1.65,
                  borderRadius: msg.role==="ai" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                  background: msg.role==="ai" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#1d4ed8,#4338ca)",
                  border: msg.role==="ai" ? "1px solid rgba(255,255,255,0.07)" : "none",
                  color: msg.role==="ai" ? "rgba(255,255,255,0.88)" : "#fff",
                  backdropFilter: msg.role==="ai" ? "blur(10px)" : "none",
                  boxShadow: msg.role==="user" ? "0 4px 14px rgba(67,56,202,0.26)" : "none",
                }}>{msg.text}</div>
              </div>
            ))}

            {aiTyping && (
              <div className="mi" style={{ display:"flex", padding:"4px 22px" }}>
                <div style={{
                  width:30, height:30, flexShrink:0, borderRadius:"50%",
                  background:"linear-gradient(135deg,rgba(56,189,248,0.12),rgba(99,102,241,0.12))",
                  border:"1px solid rgba(56,189,248,0.18)",
                  display:"flex", alignItems:"center", justifyContent:"center", marginRight:9,
                }}><AI_AVATAR/></div>
                <div style={{
                  display:"flex", alignItems:"center", gap:5,
                  padding:"13px 16px", borderRadius:"18px 18px 18px 4px",
                  background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.07)",
                  backdropFilter:"blur(10px)",
                }}>
                  <div className="dot"/><div className="dot"/><div className="dot"/>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          {/* Input */}
          <div style={{
            padding:"13px 22px 17px",
            background:"rgba(6,6,15,0.84)", backdropFilter:"blur(20px)",
            borderTop:"1px solid rgba(255,255,255,0.06)", flexShrink:0,
          }}>
            <div style={{
              display:"flex", alignItems:"flex-end", gap:10,
              background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.08)",
              borderRadius:14, padding:"11px 13px",
            }}>
              <textarea rows={1} placeholder="Type your answer here..."
                value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
                style={{
                  flex:1, background:"transparent", border:"none", color:"#fff",
                  fontSize:14.5, outline:"none", resize:"none",
                  lineHeight:1.6, maxHeight:110, minHeight:22,
                  fontFamily: F,
                }}/>
              <button className="sbtn" onClick={sendMessage} disabled={!input.trim()||aiTyping} style={{
                width:36, height:36, flexShrink:0,
                background:"linear-gradient(135deg,#0ea5e9,#6366f1)",
                border:"none", borderRadius:9, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 4px 12px rgba(99,102,241,0.28)", transition:"all .2s",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.17)", marginTop:7 }}>
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
