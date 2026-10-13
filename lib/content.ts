/**
 * Every word on the site lives here.
 *
 * Rules carried over from the previous version:
 *   1. No invented facts, employers, metrics or testimonials.
 *   2. Anything unverified is flagged with a VERIFY comment, not smoothed over.
 *   3. A metric always ships with its denominator.
 */

export const identity = {
  name: 'Karthikeyan Murugavel',
  short: 'Karthikeyan',
  initials: 'KM',
  role: 'ML/AI Engineer',
  location: 'Chennai, India',
  availability: 'open to ML/AI roles',
  email: 'karthikeyanmurugan37@gmail.com',
  links: {
    github: 'https://github.com/Karthikeyanmurugavel',
    linkedin: 'https://www.linkedin.com/in/m-karthikeyan-r10/',
    unstop: 'https://unstop.com/u/karthm2497',
  },
  // Drop the PDF into /public with this exact name and set `resumeReady` to true.
  resume: '/karthikeyan-murugavel-resume.pdf',
  resumeReady: false,
} as const;

export const seo = {
  title: 'Karthikeyan Murugavel — ML/AI Engineer',
  description:
    'ML/AI Engineer in Chennai building local LLM and RAG systems, deep learning pipelines and the backends that put them in front of users.',
  url: 'https://karthik-portfolio-ivory.vercel.app',
} as const;

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'glance', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
] as const;

/* ------------------------------------------------------------------ hero */

export const hero = {
  pill: 'fresher ML/AI engineer / chennai, india',
  lineA: 'Models that leave',
  lineB: 'the notebook',
  body:
    "I'm Karthikeyan. I build local LLM and RAG systems, deep learning pipelines, and the backends that put them in front of real users.",
  primary: { label: 'See the work', href: '#work' },
  secondary: { label: 'View GitHub', href: identity.links.github },
  fine: 'open to full-time roles / india & remote / replies within 24 hours',
} as const;

/**
 * The hero panel: JARVIS 2.0's signal path.
 *
 * Three inputs are read by two analysers and fused into a single mood signal,
 * which conditions the local model's reply. This is the flagship build — it is
 * finished, it is the only one that fuses three signal types, and it is what the
 * first screen should show. The RAG assistant keeps row 01 of the work section.
 *
 * The rows at the bottom of the card are stated facts about the system, not
 * simulated runs — the previous version showed invented sample questions here.
 */
export const heroGraph = {
  title: 'jarvis / respond',
  meta: '3 signals / 1 mood',
  badge: 'zero egress',
  edgeYes: 'speech',
  edgeNo: 'text',
  status: 'local',
  nodes: {
    input: { label: 'Signals in', sub: 'voice · text · use' },
    speech: { label: 'MFCC + SVM', sub: 'speech emotion' },
    text: { label: 'DistilRoBERTa', sub: 'text sentiment' },
    fused: { label: 'Mood Signal', sub: 'conditions llama 3' },
  },
  runsTitle: 'measured',
  runs: [
    { q: 'speech emotion · ravdess', result: '63% of 5 classes' },
    { q: 'retrieval + generation', result: 'chromadb · llama 3' },
    { q: 'data leaving the machine', result: 'none', tone: 'muted' },
  ],
} as const;

export const stack = {
  label: 'built with, end to end',
  items: [
    { code: 'PY', name: 'python' },
    { code: 'LL', name: 'llama 3' },
    { code: 'CH', name: 'chromadb' },
    { code: 'TF', name: 'tensorflow' },
    { code: 'SK', name: 'scikit-learn' },
    { code: 'GM', name: 'gemini' },
    { code: 'SB', name: 'spring boot' },
    { code: 'FL', name: 'flutter' },
    { code: 'FB', name: 'firebase' },
    { code: 'N8', name: 'n8n' },
  ],
  // No count here: the skills section now lists every area in full, and a number
  // in two places is a number that will disagree with itself.
  more: 'full list below',
} as const;

/* ------------------------------------------------------------------ work */

export const work = {
  pill: 'how I work',
  lineA: 'Most of ML is',
  italic: 'plumbing',
  aside:
    'Parsing, chunking, retries, evaluation. The model is one step in the pipeline. I build the rest so it holds up when real people use it.',
  rows: [
    {
      num: '01',
      title: 'One pipeline, every branch',
      body:
        'Enterprise RAG Document Assistant. PDF in, page-cited answer out, and an explicit refusal when the documents do not hold the answer. Fully local.',
      repo: 'https://github.com/Karthikeyanmurugavel/Enterprise-RAG-Document-Assistant',
    },
    {
      num: '02',
      title: 'A human says yes before it sends',
      body:
        'Job Application Automation. Scrapes 140+ company boards across 4 ATS platforms, scores fit with Gemini, and waits for approval before Gmail sends anything.',
      repo: 'https://github.com/Karthikeyanmurugavel/job-automation',
    },
    {
      num: '03',
      title: 'Every number has a denominator',
      body:
        'Indian Liver Patient Diagnosis. 7 classifiers benchmarked first, then a DNN that earned its complexity: 81.5% ROC-AUC on a stratified test split.',
      repo: '',
    },
  ],
} as const;

/** Stage bars for row 01. Widths are relative effort, not timings. */
export const ragRun = {
  title: 'run · enterprise-rag',
  done: 'grounded answer, 1 citation',
  stages: [
    { name: 'parse pdf', w: 0.34 },
    { name: 'chunk, page-tagged', w: 0.22 },
    { name: 'embed, minilm-l6', w: 0.48 },
    { name: 'retrieve top-4', w: 0.12 },
    { name: 'generate, llama 3.2', w: 0.86 },
    { name: 'validate citation', w: 0.08 },
  ],
} as const;

/** Approval card for row 02. A representative message, not a real company. */
export const approval = {
  channel: '#job-pipeline',
  app: 'job-bot',
  time: '9:41',
  message: 'Gemini scored this opening as a strong fit. Send the drafted application?',
  fields: [
    { k: 'role', v: 'ML Engineer' },
    { k: 'board', v: 'Greenhouse' },
    { k: 'rule', v: 'nothing sends without a yes' },
  ],
  waiting: 'waiting on you',
} as const;

/** Isometric stages for row 03, in pipeline order. */
export const ilpd = {
  title: 'ilpd pipeline',
  note: 'reported on ROC-AUC, not accuracy',
  blocks: ['clean', 'scale', 'baselines', 'dnn', 'threshold', 'roc-auc'],
} as const;

/* ------------------------------------------------------------ statement */

export const statement = {
  kicker: '( what I am actually after )',
  words: ['The', 'best', 'model', 'is', 'the', 'one', 'you', 'can'],
  italic: ['actually', 'explain.'],
  tail: '',
} as const;

/* ---------------------------------------------------------- engineering */

export const engineering = {
  pill: 'engineering',
  italic: 'Boring',
  rest: 'in the ways that matter.',
  aside:
    'Tests, refusals, validators, denominators. The parts nobody demos, and the parts that decide whether a model survives contact with users.',
  hub: {
    title: 'One engineer, every layer',
    body:
      'Before ML I trained as a full-stack developer, so a model does not stop at a notebook. I can serve it, secure it and ship the app around it.',
    caption: 'model / api / app / data',
    spokes: [
      { code: 'PY', name: 'python' },
      { code: 'SB', name: 'spring boot' },
      { code: 'RE', name: 'react' },
      { code: 'FL', name: 'flutter' },
      { code: 'FB', name: 'firebase' },
      { code: 'SQ', name: 'mysql' },
    ],
  },
  quality: {
    title: 'Tested before it ships',
    body: 'The RAG assistant’s test suite runs with no LLM calls, so CI stays fast and deterministic.',
    caption: 'rag assistant, measured',
    rows: [
      { name: 'clean citations', sub: 'validator flags the other 17%', value: '83%', pct: 0.83 },
      { name: 'pytest suite', sub: '14 tests in ~20s', value: '14', pct: 1 },
      { name: 'llm calls in ci', sub: 'deterministic by design', value: '0', pct: 0.02 },
    ],
    footnote: 'evaluated with exact-match scoring, deliberately no llm-as-judge',
  },
} as const;

/* ---------------------------------------------------------------- glance */

export const glance = {
  pill: 'six builds',
  lineA: 'Every project,',
  italic: 'seen at a glance',
  aside: 'What each build is, what state it is in, and the one number that matters for it.',
  projects: [
    { name: 'JARVIS 2.0', kind: 'local AI assistant', status: 'private · demo on request', tone: 'muted' },
    { name: 'Enterprise RAG', kind: 'document assistant', status: 'open source · 2026', tone: 'lime' },
    { name: 'ILPD diagnosis', kind: 'ml & dl pipeline', status: 'research build', tone: 'muted' },
    { name: 'Job automation', kind: 'python pipeline', status: 'open source · 2026', tone: 'lime' },
    { name: 'Oren', kind: 'flutter e-commerce', status: 'live client product', tone: 'lime' },
    { name: 'n8n job discovery', kind: 'workflow automation', status: 'prototype for 04', tone: 'muted' },
  ],
  ring: { value: 83, label: 'of RAG answers cite cleanly' },
  jarvis: {
    title: 'jarvis 2.0',
    stat: 'Zero',
    label: 'data egress',
    sub: '5 subsystems: retrieval, generation, speech i/o, sentiment fusion, intent routing',
  },
  oren: {
    title: 'oren · live',
    stat: '60fps',
    label: 'on mid-range android',
    sub: 'real inventory, real customers, real-time order sync',
  },
  journey: {
    title: 'the route here',
    steps: [
      { code: 'CE', label: 'B.Tech civil', meta: '2018–22' },
      { code: 'JV', label: 'java full stack', meta: 'qspiders' },
      { code: 'ZD', label: 'internship', meta: 'zidio · 3 mo' },
      // VERIFY: earlier versions disagree on "Master's" vs "Advanced Program".
      { code: 'DS', label: 'data science & ai', meta: 'fita academy' },
      { code: 'ML', label: 'ml/ai engineer', meta: 'now' },
    ],
  },
  n8n: { title: 'n8n → python', sub: '10+ node prototype that earned its rewrite' },
  where: { title: 'where I work', sub: 'chennai · india & remote' },
} as const;

/* --------------------------------------------------------------- numbers */

export const numbers = {
  pill: 'results',
  lineA: 'Numbers I do',
  italic: 'not',
  lineB: 'have to explain away.',
  aside: 'Each one comes with what it was measured against. A percentage without a denominator is a guess.',
  stats: [
    {
      label: 'roc-auc',
      value: '81.5%',
      viz: 'spark',
      tag: 'stratified test split',
      note: 'Reported on ROC-AUC, not accuracy, because the liver dataset is imbalanced. The threshold was swept, not left at 0.5.',
      who: 'ILPD diagnosis',
      meta: 'deep neural network, 7 baselines beaten',
    },
    {
      label: 'company boards',
      value: '140+',
      viz: 'bars',
      tag: 'verified live, 4 ATS platforms',
      note: 'Greenhouse, Lever, Ashby and SmartRecruiters, cached and rate-limited so repeat runs stay inside free-tier quotas.',
      who: 'Job automation',
      meta: 'open source, python',
    },
    {
      label: 'problems solved',
      value: '380+',
      viz: 'progress',
      tag: '100+ leetcode · 280+ unstop',
      note: 'Steady practice alongside project work, plus an IIIT hackathon final in 2025.',
      who: 'Problem solving',
      meta: 'leetcode and unstop',
    },
  ],
} as const;

/* ---------------------------------------------------------------- skills */

/**
 * The eight areas, exactly as supplied.
 *
 * This replaced an Applied / Shipped / Learning split. Two reasons: it listed
 * roughly a quarter of what he actually works with, and the "Learning — studied,
 * not yet shipped" tier undersold things he does know, while carrying one entry
 * (MLflow) that is not on his list at all.
 *
 * No percentage bars. A bar is a claim with no evidence behind it, and the rest
 * of this site refuses to make those.
 */
export const skills = {
  pill: 'skills',
  lineA: 'You hire skills, not',
  italic: 'buzzwords',
  aside: 'Eight areas, everything I actually work with. Grouped the way I would explain them, not ranked.',
  cta: { label: 'Hire me', href: '#contact' },
  groups: [
    {
      name: 'machine learning',
      note: 'supervised and unsupervised',
      items: [
        'Logistic Regression', 'Random Forest', 'SVM', 'Gradient Boosting',
        'K-Means', 'DBSCAN', 'Feature engineering', 'Class-imbalance handling',
        'Hyperparameter tuning', 'Model evaluation',
      ],
    },
    {
      name: 'deep learning',
      note: 'training and optimisation',
      items: [
        'Neural networks', 'Backpropagation', 'BatchNormalization', 'Dropout',
        'EarlyStopping', 'Adam / SGD', 'Activation functions',
        'Reinforcement learning', 'Q-Learning', 'Policy optimisation',
      ],
    },
    {
      name: 'natural language processing',
      note: 'text and speech',
      items: [
        'Transformer models', 'BERT', 'Text classification', 'Sentiment analysis',
        'Retrieval-Augmented Generation', 'Speech-to-text',
      ],
    },
    {
      name: 'llms and generative ai',
      note: 'local-first',
      items: ['LLaMA 3', 'RAG pipelines', 'ChromaDB', 'Prompt engineering', 'Evaluation harnesses'],
    },
    {
      name: 'frameworks and libraries',
      note: 'day to day',
      items: [
        'TensorFlow / Keras', 'PyTorch', 'scikit-learn', 'NumPy', 'Pandas',
        'Matplotlib', 'LangChain', 'Ollama',
      ],
    },
    {
      name: 'programming and statistics',
      note: 'languages and the maths under them',
      items: [
        'Python', 'Java', 'JavaScript', 'Dart', 'SQL', 'Hypothesis testing',
        'IQR / Z-score outlier detection', 'Bessel-corrected variance',
      ],
    },
    {
      name: 'full-stack',
      note: 'the part that reaches users',
      items: [
        'Spring Boot', 'REST APIs', 'JWT', 'Node.js', 'MySQL', 'React.js',
        'Flutter', 'HTML / CSS',
      ],
    },
    {
      name: 'tools and devops',
      note: 'how it ships',
      items: [
        'Git / GitHub', 'Docker', 'Postman', 'n8n', 'Vercel', 'VS Code',
        'Android Studio', 'Edge-TTS',
      ],
    },
  ],
} as const;

/* --------------------------------------------------------------- contact */

export const contact = {
  blurb: 'ML/AI engineer building systems that leave the notebook.',
  kicker: 'what now',
  lineA: 'Bring the problem you',
  italic: 'hate',
  lineB: 'most.',
  body:
    'A task you do by hand, a model that will not generalise, a RAG system that makes things up. If I cannot help, I will tell you so.',
  roles: ['LLM & RAG Engineer', 'ML/AI Engineer', 'NLP Engineer'],
  ticker: ['open to ML/AI roles', '81.5% roc-auc, measured honestly', 'chennai · india & remote'],
  columns: [
    {
      title: 'work',
      links: [
        { label: 'RAG assistant', href: 'https://github.com/Karthikeyanmurugavel/Enterprise-RAG-Document-Assistant' },
        { label: 'Job automation', href: 'https://github.com/Karthikeyanmurugavel/job-automation' },
        { label: 'All projects', href: '#glance' },
      ],
    },
    {
      title: 'profile',
      links: [
        { label: 'GitHub', href: 'https://github.com/Karthikeyanmurugavel' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/m-karthikeyan-r10/' },
        { label: 'Unstop', href: 'https://unstop.com/u/karthm2497' },
      ],
    },
    {
      title: 'contact',
      links: [
        { label: 'Email', href: 'mailto:karthikeyanmurugan37@gmail.com' },
        { label: 'Skills', href: '#skills' },
        { label: 'Back to top', href: '#top' },
      ],
    },
  ],
  footnote: 'B.Tech civil engineering / java full stack / data science & ai',
} as const;
