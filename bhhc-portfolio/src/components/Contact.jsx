import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, MapPin, Send, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);


const INITIAL = { name: '', email: '', message: '' };

const INFO_ITEMS = [
  { Icon: Mail, label: 'bhhc1308@gmail.com', href: 'mailto:bhhc1308@gmail.com', color: '#39d353' },
  { Icon: Github, label: 'github.com/Chintu1308', href: 'https://github.com/Chintu1308', color: '#0dcfc0' },
  { Icon: Linkedin, label: 'linkedin.com/in/bhhc', href: 'https://linkedin.com/in/bhhc', color: '#0dcfc0' },
  { Icon: Phone, label: '+91-7978163823', href: 'tel:+917978163823', color: '#a3e635' },
  { Icon: MapPin, label: 'Visakhapatnam, Andhra Pradesh', href: null, color: '#818cf8' },
];

const CoinFace = ({ idSuffix, rotationY }) => (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{ backfaceVisibility: 'hidden', transform: `rotateY(${rotationY}) translateZ(0.5px)` }}
  >
    {/* Rotating dashed border (inner gears) */}
    <div className="absolute inset-1 rounded-full border border-dashed border-[#0dcfc0] opacity-30 animate-[spin_15s_linear_infinite]" />
    <div className="absolute inset-[-4px] rounded-full border border-[#39d353] opacity-10" />

    {/* Fixed SVG text */}
    <svg className="absolute w-[130%] h-[130%]" viewBox="0 0 100 100">
      <path id={`textPathContact-${idSuffix}`} d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
      <text>
        <textPath href={`#textPathContact-${idSuffix}`} startOffset="0%" fill="#39d353" className="font-mono text-[8.5px] tracking-[3px] uppercase font-bold opacity-80" textLength="218">
          • Bongu Hari Hara Charan • DevSecOps
        </textPath>
      </text>
    </svg>

    {/* Center text bhhc.me */}
    <div className="z-10 flex flex-col items-center">
      <div className="font-display font-black text-2xl tracking-tighter mix-blend-screen"
        style={{ color: '#e8fff4', textShadow: '0 0 20px rgba(57,211,83,0.8)' }}>
        bhhc<span className="text-[#39d353]">.</span>me
      </div>
    </div>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formRef = useRef();
  const infoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 85%' },
          delay: 0.15,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'ERROR: Name field cannot be empty';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'ERROR: Valid email address required';
    if (!form.message.trim()) e.message = 'ERROR: Message field cannot be empty';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    try {
      // TODO: Set up emailjs.com account, connect Gmail, and replace these keys:
      const SERVICE_ID = 'service_s1b07xa';
      const TEMPLATE_ID = 'service_s1b07xa';
      const PUBLIC_KEY = 'axEQwjxgRuycm-VHW';

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      setStatus('sent');
      setForm(INITIAL);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('idle');
      setErrors({ message: 'ERROR: Failed to send message. Please check console or your EmailJS config.' });
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-lg font-mono text-sm text-textPrimary outline-none transition-all duration-200`;
  const inputStyle = {
    background: 'rgba(0,255,136,0.04)',
    border: '1px solid rgba(0,255,136,0.15)',
    color: '#e8fff4',
  };
  const inputFocus = (e) => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.5)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,136,0.1)'; };
  const inputBlur = (e) => { e.currentTarget.style.borderColor = 'rgba(0,255,136,0.15)'; e.currentTarget.style.boxShadow = 'none'; };

  return (
    <section id="contact" className="py-24 relative">
      {/* Bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 80%, rgba(0,255,136,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <p className="font-mono text-textMuted text-sm mb-2">
            <span className="text-primary">08.</span> Contact
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &gt; ./send-message.sh
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── LEFT: Form ── */}
          <div ref={formRef} className="opacity-0">
            <div
              className="rounded-xl border p-6"
              style={{ background: 'rgba(0,255,136,0.03)', borderColor: 'rgba(0,255,136,0.15)' }}
            >
              {status === 'sent' ? (
                <div className="space-y-3 font-mono text-sm py-4">
                  <div className="text-textMuted">&gt; Connecting to mail server...</div>
                  <div style={{ color: '#a3e635' }}>&gt; Sending... ████████████ 100%</div>
                  <div className="text-accent">&gt; Message delivered ✓</div>
                  <div className="text-textMuted mt-2">&gt; Thanks! I'll get back to you soon.</div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-4 py-1.5 rounded border border-accent/40 text-accent text-xs hover:bg-accent/10 transition-colors"
                  >
                    $ send-another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Enter your name:', type: 'text', placeholder: 'Name' },
                    { key: 'email', label: 'Enter your email:', type: 'email', placeholder: 'Email' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block font-mono text-xs text-textMuted mb-1.5">
                        <span className="text-accent">&gt; </span>{label}
                      </label>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className={inputClass}
                        style={{ ...inputStyle, borderColor: errors[key] ? '#ef4444' : 'rgba(0,255,136,0.15)' }}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                      {errors[key] && (
                        <p className="font-mono text-[10px] text-red-400 mt-1">{errors[key]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block font-mono text-xs text-textMuted mb-1.5">
                      <span className="text-accent">&gt; </span>Enter message:
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Your message..."
                      className={`${inputClass} resize-none`}
                      style={{ ...inputStyle, borderColor: errors.message ? '#ef4444' : 'rgba(0,255,136,0.15)' }}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                    {errors.message && (
                      <p className="font-mono text-[10px] text-red-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono text-sm font-bold transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
                      color: '#050f0a',
                      boxShadow: '0 0 20px rgba(57,211,83,0.3)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(57,211,83,0.6)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(57,211,83,0.3)'}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                        &gt; Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        $ submit --send
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: 3D Scene + Info ── */}
          <div ref={infoRef} className="opacity-0 flex flex-col gap-6">
            {/* Rotating Stamp Badge */}
            <div
              className="rounded-xl border overflow-hidden relative flex items-center justify-center group"
              style={{
                height: '220px',
                borderColor: 'rgba(0,255,136,0.15)',
                background: 'rgba(0,255,136,0.02)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(0,255,136,0.05) 0%, transparent 60%)' }} />

              <div className="relative w-36 h-36 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animation: 'coin-spin 10s linear infinite', transformStyle: 'preserve-3d' }}
                >
                  <CoinFace idSuffix="front" rotationY="0deg" />
                  <CoinFace idSuffix="back" rotationY="180deg" />
                </div>
              </div>
            </div>

            {/* Info items */}
            <div className="space-y-3">
              {INFO_ITEMS.map(({ Icon, label, href, color }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <div
                    className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ borderColor: `${color}33`, background: `${color}0a` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-textMuted hover:text-accent transition-colors group-hover:translate-x-0.5"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-textMuted">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick reply note */}
            <div
              className="rounded-lg border p-4 font-mono text-xs text-textMuted"
              style={{ borderColor: 'rgba(0,255,136,0.1)', background: 'rgba(0,255,136,0.02)' }}
            >
              <span className="text-primary">$ </span>
              Usually responds within 24 hours. Let's build something together.
              <span className="inline-block w-1.5 h-3 bg-primary cursor-blink ml-1 align-middle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
