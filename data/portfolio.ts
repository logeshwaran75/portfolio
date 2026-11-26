/**
 * Single source of truth for portfolio content.
 * Everything marked TODO is a placeholder: edit it here and the site updates.
 * Facts below come from the resume (Logeshwaran-N-Resume.pdf).
 */

export const profile = {
  name: "Logeshwaran N",
  roles: ["AI/ML Engineer", "AI Innovation Engineer", "Software Developer"],
  rotating: ["AI/ML engineering", "Generative AI", "software development", "computer vision"],
  currentRole: "AI Innovation SDE Intern",
  currentCompany: "Uniqus Consultancy",
  tagline:
    "I build practical AI applications: retrieval systems, vision pipelines and prediction models that solve a concrete problem.",
  email: "logeshwarann75@gmail.com",
  linkedin: "https://www.linkedin.com/in/logeshwarann18",
  github: "https://github.com/logeshwaran75",
  resume: "/Logeshwaran-N-Resume.pdf",
};

export const about = {
  paragraphs: [
    "I completed a Bachelor of Computer Applications (2022–2025) and moved into applied AI through a data science internship at ProITBridge, where I built a retrieval-augmented generation (RAG) assistant for cable network troubleshooting and a YOLO-based quality check system.",
    "Alongside that work I built machine learning projects in credit risk, customer churn and resume parsing. Those projects covered the full loop from feature engineering and model tuning to storing and serving results.",
    "Today I work as an AI Innovation SDE Intern at Uniqus Consultancy. I like turning a messy real-world problem into a working application, and I'm most interested in generative AI, NLP and computer vision.",
  ],
  facts: [
    { label: "Education", value: "BCA, Sri Sankara Arts and Science College (2022–2025)" },
    { label: "Focus", value: "RAG, NLP, computer vision, applied ML" },
    { label: "Current", value: "AI Innovation SDE Intern, Uniqus Consultancy" },
  ],
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tech?: string[];
};

export const experience: Experience[] = [
  {
    id: "uniqus",
    role: "AI Innovation SDE Intern",
    company: "Uniqus Consultancy",
    period: "Joined 26 October 2026 – Present",
    current: true,
    summary:
      "Working on AI innovation as a software development engineer intern.",
    // TODO: add responsibilities and achievements. Avoid confidential client or internal project details.
    highlights: [
      "AI Innovation SDE Intern at Uniqus, focused on integrating AI technologies into finance and enterprise workflows.",
      "Designing and implementing automation solutions that reduce manual effort and enhance process accuracy.",
      "Working across Generative AI, Python, and workflow automation to create real-world business impact."
    ],
    tech: [],
  },
  {
    id: "proitbridge",
    role: "Data Scientist Intern",
    company: "ProITBridge Pvt. Ltd.",
    location: "Bangalore",
    period: "July 2025",
    summary:
      "Built and deployed AI applications for network support and manufacturing quality control.",
    highlights: [
      "Developed a RAG application using embedding-based search, NLP and AI algorithms to analyze, diagnose and resolve cable network issues, collaborating with cross-functional teams to integrate it into workflows.",
      "Designed and deployed a quality check system using YOLO for image processing, accelerating inspection by 60% and improving detection and quantification of holes on metal plates.",
      "Built and fine-tuned machine learning models for classification, regression, clustering and recommendation tasks.",
      "Engineered features from raw data to improve model performance.",
    ],
    tech: ["RAG", "NLP", "YOLO", "Scikit-learn", "Feature engineering"],
  },
];

export type Project = {
  id: string;
  title: string;
  kind: string;
  period?: string; // optional; hidden when empty
  icon: "search" | "scan" | "trend" | "file" | "users";
  hue: string; // accent color for the card
  problem: string;
  built: string;
  contribution: string[];
  outcome?: string;
  tech: string[];
  github?: string; // TODO: add repo URL when available
  demo?: string; // TODO: add live demo URL when available
};

export const projects: Project[] = [
  {
    id: "rag-cable",
    title: "Cable Network Troubleshooting RAG Application",
    kind: "Generative AI",
    period: "Dec 2025",
    icon: "search",
    hue: "#5BD4FF",
    problem:
      "Diagnosing and resolving cable network issues takes time when answers are scattered across documents and depend on who you ask.",
    built:
      "A Retrieval-Augmented Generation system that uses embedding-based search and NLP to find relevant information and produce context-aware solutions.",
    contribution: [
      "Built the RAG system to analyze and resolve cable network issues.",
      "Integrated embedding-based search and NLP for context-aware retrieval and solution accuracy.",
      "Worked with engineering and operations teams to automate workflows and improve support efficiency.",
    ],
    outcome: "Reduced operational time and improved troubleshooting speed and accuracy.",
    tech: ["RAG", "Embeddings", "NLP", "Generative AI"],
  },
  {
    id: "yolo-quality",
    title: "YOLO-Based Quality Inspection and Thread Detection",
    kind: "Computer vision",
    period: "Aug – Sept 2025",
    icon: "scan",
    hue: "#8B7CFF",
    problem:
      "Checking metal plates for holes and defects by eye is slow and inconsistent.",
    built:
      "A quality check system that uses YOLO object detection to find and quantify holes and threads on metal plates.",
    contribution: [
      "Collected and annotated image datasets.",
      "Applied YOLO with transfer learning for defect detection.",
      "Preprocessed images to improve training and exported detection results as JSON.",
    ],
    outcome: "Accelerated inspection by 60% and improved detection and quantification of holes.",
    tech: ["YOLO", "Transfer learning", "Image preprocessing", "Computer vision"],
  },
  {
    id: "bad-debt",
    title: "Bad Debt Prediction",
    kind: "Machine learning",
    period: "Nov 2025",
    icon: "trend",
    hue: "#4F8DFF",
    problem:
      "Lenders need to identify customers likely to default so they can manage credit risk.",
    built:
      "Machine learning models that predict customer credit risk and bad debt.",
    contribution: [
      "Developed models with Logistic Regression, Random Forest and XGBoost.",
      "Performed feature engineering, data cleaning and statistical analysis to improve model performance.",
    ],
    outcome: "Delivered insights that reduced non-performing loans and improved financial decision-making.",
    tech: ["Logistic Regression", "Random Forest", "XGBoost", "Feature engineering"],
  },
  {
    id: "resume-parser",
    title: "Resume Parser Using Named Entity Recognition",
    kind: "NLP",
    period: "Aug 2025",
    icon: "file",
    hue: "#37D6B5",
    problem:
      "Resumes arrive in many layouts, which makes extracting skills, education and experience by hand slow.",
    built:
      "An NLP resume parser that extracts and classifies sections such as skills, education and experience, backed by a SQL database.",
    contribution: [
      "Built the NER-based parser.",
      "Designed SQL database schemas and optimized queries for storing and retrieving extracted data.",
      "Improved data normalization and extraction quality through continuous testing and refinement.",
    ],
    outcome: "Reached 80% accuracy extracting and classifying resume sections.",
    tech: ["NER", "NLP", "SQL", "Python"],
  },
  {
    id: "churn",
    title: "Customer Churn Prediction",
    kind: "Machine learning",
    period: "", // no date on resume
    icon: "users",
    hue: "#B28CFF",
    problem:
      "Businesses want to know which customers are likely to leave so they can act before they do.",
    built:
      "Classification models that predict customer churn, using Logistic Regression and Random Forest.",
    contribution: [
      "Applied feature engineering and model tuning.",
      "Raised prediction accuracy from 72% to 92%.",
    ],
    outcome: "92% prediction accuracy in customer churn analysis.",
    tech: ["Logistic Regression", "Random Forest", "Feature engineering", "Model tuning"],
  },
];

export const skillGroups: { title: string; icon: string; items: string[] }[] = [
  { title: "Programming languages", icon: "code", items: ["Python", "SQL", "OOP concepts"] },
  {
    title: "Machine learning",
    icon: "brain",
    items: ["Scikit-learn", "XGBoost", "Feature engineering", "Statistics", "Classification", "Regression", "Clustering", "Recommendation"],
  },
  { title: "Deep learning", icon: "cpu", items: ["TensorFlow", "PyTorch", "Keras"] },
  {
    title: "Generative AI and LLMs",
    icon: "sparkles",
    items: ["RAG", "Generative AI", "LangChain", "LangGraph", "CrewAI", "NLP", "NLTK", "spaCy"],
  },
  { title: "Computer vision", icon: "eye", items: ["YOLO", "OpenCV", "Image processing"] },
  { title: "Backend development", icon: "server", items: ["FastAPI"] },
  {
    title: "Databases and data analysis",
    icon: "database",
    items: ["SQL", "Pandas", "NumPy", "Seaborn", "Matplotlib", "Power BI", "Data visualization", "Data analysis"],
  },
  {
    title: "Cloud and developer tools",
    icon: "cloud",
    items: ["AWS (basic)", "VS Code", "PyCharm", "Google Colab", "Jupyter Notebook"],
  },
];

export const softSkills = ["Communication", "Problem-solving", "Analytical thinking", "Time management", "Critical thinking"];

export const education = {
  school: "Sri Sankara Arts and Science College",
  location: "Kanchipuram, Tamil Nadu",
  degree: "Bachelor of Computer Applications (BCA)",
  period: "2022 – 2025",
  detail: "CGPA 7.0",
};

export const certifications = [
  {
    title: "Data Science & AI Certificate",
    issuer: "ProITBridge Private Limited, Bangalore",
    date: "July 2025",
    detail: "Pandas, NumPy, Seaborn, Matplotlib, Scikit-learn, Keras, NLTK, spaCy, TensorFlow, LangChain",
  },
];

export const achievements = [
  "Achieved 92% prediction accuracy in customer churn analysis using Logistic Regression and Random Forest.",
  "Improved customer churn prediction accuracy from 72% to 92% through feature engineering and model tuning.",
  "Delivered a technical presentation on computer vision, covering image classification concepts and real-world applications.",
];
