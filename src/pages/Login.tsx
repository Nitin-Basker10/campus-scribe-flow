import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, Shield, ArrowRight, CheckCircle, Send, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import iitmLogo from "@/assets/iitm-logo.png";

type Role = "student" | "club" | "admin";
type StudentMode = "login" | "signup";

const inputClass =
  "w-full px-4 py-2.5 rounded-md bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

const labelClass = "block text-xs font-medium text-muted-foreground mb-1.5";

const roles: { id: Role; label: string; desc: string; icon: typeof User }[] = [
  { id: "student", label: "Student", desc: "Access notes, follow clubs & stay updated", icon: User },
  { id: "club", label: "Club / Org", desc: "Request admin to create your club account", icon: Users },
  { id: "admin", label: "Admin", desc: "Moderate content & manage the platform", icon: Shield },
];

const MIT_COLLEGES = [
  "MIT – Madras Institute of Technology (MIT Campus, Chennai)",
  "MIT – Manipal Institute of Technology",
  "MIT – Maharashtra Institute of Technology",
  "MIT – Moradabad Institute of Technology",
  "MIT – Muzaffarpur Institute of Technology",
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [studentMode, setStudentMode] = useState<StudentMode>("login");
  const [isMIT, setIsMIT] = useState(true);
  const [clubRequestSent, setClubRequestSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <img
            src={iitmLogo}
            alt="MIT"
            className="h-11 w-11 rounded-full ring-1 ring-primary/30 shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
          />
          <span className="text-2xl font-bold tracking-tight">
            MIT<span className="text-primary">hub</span>
          </span>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setClubRequestSent(false);
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-md border text-xs font-medium transition-all ${selectedRole === role.id
                    ? "border-primary/50 bg-primary/10 text-primary glow-border-red"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/20"
                  }`}
              >
                <role.icon className="h-4 w-4" />
                {role.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ───── STUDENT ───── */}
            {selectedRole === "student" && (
              <motion.div key="student" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                {/* Login / Signup tabs */}
                <div className="flex rounded-md overflow-hidden border border-border mb-6">
                  {(["login", "signup"] as StudentMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setStudentMode(m)}
                      className={`flex-1 py-2 text-xs font-semibold capitalize transition-all ${studentMode === m ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {m === "login" ? "Log In" : "Sign Up"}
                    </button>
                  ))}
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
                  {/* Sign-up only fields */}
                  {studentMode === "signup" && (
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" placeholder="e.g. Nitin Basker" className={inputClass} />
                    </div>
                  )}

                  {/* Email always shown */}
                  <div>
                    <label className={labelClass}>Email ID</label>
                    <input type="email" placeholder="you@college.edu" className={inputClass} />
                  </div>

                  {/* College field – sign-up only */}
                  {studentMode === "signup" && (
                    <div>
                      <label className={labelClass}>College</label>

                      {/* MIT toggle */}
                      <button
                        type="button"
                        onClick={() => setIsMIT(!isMIT)}
                        className={`w-full mb-2 flex items-center justify-between px-4 py-2.5 rounded-md border text-sm font-medium transition-all ${isMIT
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        <span>We're from MIT Campus</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isMIT ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                          {isMIT && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                      </button>

                      {/* If MIT selected → show dropdown of MIT colleges */}
                      {isMIT ? (
                        <div className="relative">
                          <select className={`${inputClass} appearance-none pr-9`}>
                            {MIT_COLLEGES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : (
                        /* Manual entry for non-MIT */
                        <input type="text" placeholder="Enter your college name" className={inputClass} />
                      )}
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className={labelClass}>Password</label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm glow-red hover:glow-red-strong transition-shadow"
                  >
                    {studentMode === "login" ? "Enter the Hub" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* ───── CLUB / ORG ───── */}
            {selectedRole === "club" && (
              <motion.div key="club" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                {clubRequestSent ? (
                  <div className="flex flex-col items-center gap-4 py-6 text-center">
                    <CheckCircle className="h-14 w-14 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Request Sent!</h3>
                    <p className="text-sm text-muted-foreground">
                      The admin team will review your club registration request and get back to you via the email you provided.
                    </p>
                    <button
                      onClick={() => setClubRequestSent(false)}
                      className="text-xs text-primary hover:underline mt-2"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md bg-primary/5 border border-primary/20 px-4 py-3 mb-5">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Club accounts are <span className="text-primary font-medium">admin-approved</span>. Fill in your details below and our team will create your account and notify you by email.
                      </p>
                    </div>

                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setClubRequestSent(true);
                      }}
                    >
                      <div>
                        <label className={labelClass}>Club / Organisation Name</label>
                        <input type="text" placeholder="e.g. Robotics Club" className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClass}>Contact Email</label>
                        <input type="email" placeholder="club@college.edu" className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClass}>Contact Person (Faculty / Student Lead)</label>
                        <input type="text" placeholder="Full Name" className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClass}>Brief Description</label>
                        <textarea
                          rows={3}
                          placeholder="What does your club do? What kind of announcements will you post?"
                          className={`${inputClass} resize-none`}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm glow-red hover:glow-red-strong transition-shadow"
                      >
                        Send Request to Admin
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* ───── ADMIN ───── */}
            {selectedRole === "admin" && (
              <motion.div key="admin" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="rounded-md bg-primary/5 border border-primary/20 px-4 py-3 mb-5">
                  <p className="text-xs text-muted-foreground">Restricted access. Only authorised administrators may log in here.</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/admin-dashboard"); }}>
                  <div>
                    <label className={labelClass}>Admin Email</label>
                    <input type="email" placeholder="admin@mit.edu" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm glow-red hover:glow-red-strong transition-shadow"
                  >
                    Admin Login
                    <Shield className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground font-mono">
          SECURE · ENCRYPTED · CAMPUS NETWORK
        </p>
      </motion.div>
    </div>
  );
}
