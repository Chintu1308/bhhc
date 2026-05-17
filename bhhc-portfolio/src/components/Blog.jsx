import { useInView } from '../hooks/useTypewriter';

const BLOG_POSTS = [
  {
    slug: 'enterprise-app-2nd-year',
    title: 'What I Learned Building an Enterprise App as a 2nd-Year Student',
    tags: ['React', 'Spring Boot', 'Internship'],
    readTime: '8 min read',
    status: 'COMING SOON',
    statusColor: '#f59e0b',
  },
  {
    slug: 'mqtt-vs-websocket',
    title: 'MQTT vs WebSocket: When to Use What in IoT',
    tags: ['IoT', 'MQTT', 'WebSocket'],
    readTime: '6 min read',
    status: 'DRAFTING...',
    statusColor: '#0dcfc0',
  },
  {
    slug: 'wow-vizag-2025',
    title: 'How We Won WoW Vizag 2025 in 24 Hours',
    tags: ['Hackathon', 'Strategy', 'React'],
    readTime: '5 min read',
    status: 'IDEA QUEUED',
    statusColor: '#7aafa0',
  },
];

export default function Blog() {
  const [ref, inView] = useInView();

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-4">
          <p className="font-mono text-textMuted text-sm mb-2">
            <span className="text-primary">07.</span> Blog / Thoughts
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold"
            style={{
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &gt; cat ~/thoughts/*.md
          </h2>
        </div>

        {/* Terminal ls output */}
        <div
          className="mb-10 font-mono text-sm p-4 rounded border"
          style={{
            borderColor: 'rgba(0,255,136,0.1)',
            background: 'rgba(0,255,136,0.02)',
            color: '#7aafa0',
          }}
        >
          <div className="text-accent mb-2">$ ls ~/blog</div>
          {BLOG_POSTS.map((p, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-primary">›</span>
              <span>{p.slug}.md</span>
              <span className="ml-auto" style={{ color: p.statusColor }}>
                [{p.status}]
              </span>
            </div>
          ))}
        </div>

        {/* Blog cards */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, idx) => (
            <div
              key={post.slug}
              className="rounded-lg border p-6 flex flex-col gap-3 group cursor-default"
              style={{
                background: 'rgba(0,255,136,0.03)',
                borderColor: 'rgba(0,255,136,0.12)',
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                opacity: inView ? 1 : 0,
                transition: `transform 0.5s ease ${idx * 0.1}s, opacity 0.5s ease ${idx * 0.1}s`,
              }}
            >
              {/* Status */}
              <span
                className="self-start px-2.5 py-0.5 rounded-full font-mono text-xs border"
                style={{
                  color: post.statusColor,
                  borderColor: `${post.statusColor}44`,
                  background: `${post.statusColor}11`,
                }}
              >
                {post.status}
              </span>

              {/* Title */}
              <h3 className="font-display font-bold text-sm text-textPrimary group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>

              {/* Meta */}
              <p className="font-mono text-xs text-textMuted">{post.readTime}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full font-mono text-xs border"
                    style={{
                      color: '#7aafa0',
                      borderColor: 'rgba(122,175,160,0.2)',
                      background: 'rgba(122,175,160,0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
