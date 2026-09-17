export interface SkillCategoryGroup {
  category: 'Programming' | 'Web' | 'Database' | 'DevOps & Cloud' | 'AI & Data' | 'Frameworks' | 'Tools & Software' | 'Soft Skills' | 'Other';
  skills: string[];
}

export const SKILL_SUGGESTIONS: SkillCategoryGroup[] = [
  {
    category: 'Programming',
    skills: [
      'Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'C#', 'Go', 'Rust', 'Kotlin', 'Swift', 'PHP', 'Ruby', 'R', 'Dart', 'Scala'
    ]
  },
  {
    category: 'Web',
    skills: [
      'HTML5', 'CSS3', 'React.js', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Tailwind CSS', 'Sass/SCSS', 'REST APIs', 'GraphQL', 'Redux / Toolkit', 'WebSockets', 'Webpack', 'Vite'
    ]
  },
  {
    category: 'Frameworks',
    skills: [
      'Spring Boot', 'Django', 'FastAPI', 'Flask', 'ASP.NET Core', 'Laravel', 'NestJS', 'React Native', 'Flutter', 'PyTorch', 'TensorFlow'
    ]
  },
  {
    category: 'Database',
    skills: [
      'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase', 'Oracle DB', 'Cassandra', 'DynamoDB', 'Supabase', 'Prisma ORM', 'Neo4j'
    ]
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      'AWS (S3, EC2, Lambda)', 'Google Cloud (GCP)', 'Microsoft Azure', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform', 'Nginx', 'Linux / Bash', 'Git & GitHub'
    ]
  },
  {
    category: 'AI & Data',
    skills: [
      'Machine Learning', 'Deep Learning', 'Natural Language Processing (NLP)', 'Computer Vision', 'Pandas & NumPy', 'Scikit-Learn', 'Large Language Models (LLMs)', 'LangChain', 'Data Structures & Algorithms'
    ]
  },
  {
    category: 'Tools & Software',
    skills: [
      'VS Code', 'Postman', 'Figma', 'Jira', 'Confluence', 'Docker Desktop', 'IntelliJ IDEA', 'Webpack', 'Docker', 'Vercel', 'Netlify'
    ]
  },
  {
    category: 'Soft Skills',
    skills: [
      'Problem Solving', 'Team Leadership', 'Agile & Scrum', 'Technical Writing', 'Cross-Functional Collaboration', 'System Design', 'Code Review'
    ]
  }
];
