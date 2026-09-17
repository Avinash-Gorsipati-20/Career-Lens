import { ResumeData } from '../types/resume';
import { SkillGapItem, LearningRoadmapStep, LearningResource } from '../types/career';
import { CAREER_ROLES_DATABASE } from './careerService';

const resource = (skill: string, learningUrl: string, videoUrl: string, practiceUrl: string, learningProvider = 'Official Documentation', practiceProvider = 'Practice'): LearningResource[] => [
  { title: `${skill} Official Learn`, type: 'Documentation', url: learningUrl, provider: learningProvider, isFree: true },
  { title: `${skill} Full Course`, type: 'Video', url: videoUrl, provider: 'YouTube', isFree: true },
  { title: `${skill} Practice`, type: 'Practice', url: practiceUrl, provider: practiceProvider, isFree: true }
];

export const RESOURCE_CATALOG: Record<string, LearningResource[]> = {
  'Data Structures': resource('Data Structures', 'https://www.geeksforgeeks.org/data-structures/', 'https://www.youtube.com/watch?v=RBSGKlAvoiM', 'https://leetcode.com/'),
  'Algorithms': resource('Algorithms', 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/', 'https://www.youtube.com/watch?v=8hly31xKli0', 'https://leetcode.com/'),
  'Problem Solving': resource('Problem Solving', 'https://www.hackerrank.com/domains/algorithms', 'https://www.youtube.com/watch?v=8hly31xKli0', 'https://www.hackerrank.com/'),
  'OOP': resource('OOP', 'https://docs.oracle.com/javase/tutorial/java/concepts/', 'https://www.youtube.com/watch?v=SiBw7os-_zI', 'https://exercism.org/'),
  'System Design': resource('System Design', 'https://github.com/donnemartin/system-design-primer', 'https://www.youtube.com/watch?v=m8Icp_Cid5o', 'https://github.com/donnemartin/system-design-primer'),
  'Git': resource('Git', 'https://git-scm.com/doc', 'https://www.youtube.com/watch?v=apGV9Kg7ics', 'https://learngitbranching.js.org/'),
  'Java': resource('Java', 'https://dev.java/learn/', 'https://www.youtube.com/watch?v=xk4_1vDrzzo', 'https://www.hackerrank.com/domains/java', 'Dev.java'),
  'Python': resource('Python', 'https://docs.python.org/3/tutorial/', 'https://www.youtube.com/watch?v=XKHEtdqhLK8', 'https://www.codewars.com/', 'Python.org', 'Codewars'),
  'JavaScript': resource('JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', 'https://www.youtube.com/watch?v=PkZNo7MFNFg', 'https://www.codewars.com/kata/search/javascript', 'MDN'),
  'TypeScript': resource('TypeScript', 'https://www.typescriptlang.org/docs/handbook/intro.html', 'https://www.youtube.com/watch?v=30LWjhZzg50', 'https://exercism.org/tracks/typescript', 'TypeScript'),
  'Spring Boot': resource('Spring Boot', 'https://spring.io/guides', 'https://www.youtube.com/watch?v=gJrjgg1KVL4', 'https://hyperskill.org/'),
  'SQL': resource('SQL', 'https://sqlbolt.com/', 'https://www.youtube.com/watch?v=HXV3zeQKqGY', 'https://sqlbolt.com/', 'SQLBolt'),
  'REST APIs': resource('REST APIs', 'https://developer.mozilla.org/en-US/docs/Web/HTTP', 'https://www.youtube.com/watch?v=0sOvCWFmrtA', 'https://learning.postman.com/', 'MDN', 'Postman'),
  'Hibernate': resource('Hibernate', 'https://hibernate.org/orm/documentation/', 'https://www.youtube.com/watch?v=JR7-EdxDSf0', 'https://hyperskill.org/'),
  'Maven/Gradle': resource('Maven/Gradle', 'https://maven.apache.org/guides/', 'https://www.youtube.com/watch?v=I84f9Q5bFBA', 'https://gradle.org/'),
  'Microservices': resource('Microservices', 'https://microservices.io/', 'https://www.youtube.com/watch?v=4XTsAAHW_Tc', 'https://killercoda.com/'),
  'Kafka': resource('Kafka', 'https://kafka.apache.org/documentation/', 'https://www.youtube.com/watch?v=QkdkLdMBuL0', 'https://conduktor.io/'),
  'JUnit': resource('JUnit', 'https://junit.org/junit5/docs/current/user-guide/', 'https://www.youtube.com/watch?v=F3TAi-l8Mpk', 'https://exercism.org/tracks/java'),
  'PostgreSQL': resource('PostgreSQL', 'https://www.postgresql.org/docs/', 'https://www.youtube.com/watch?v=qw--VYLpxG4', 'https://pgexercises.com/', 'PostgreSQL', 'pgExercises'),
  'React': resource('React', 'https://react.dev/learn', 'https://www.youtube.com/watch?v=DLX62G4lc44', 'https://codesandbox.io/', 'React', 'CodeSandbox'),
  'HTML5/CSS3': resource('HTML5/CSS3', 'https://developer.mozilla.org/en-US/docs/Learn', 'https://www.youtube.com/watch?v=G3e-cpL7ofc', 'https://www.frontendmentor.io/', 'MDN', 'Frontend Mentor'),
  'Tailwind CSS': resource('Tailwind CSS', 'https://tailwindcss.com/docs', 'https://www.youtube.com/watch?v=ft30zcMlFao', 'https://play.tailwindcss.com/', 'Tailwind CSS', 'Tailwind Play'),
  'State Management': resource('State Management', 'https://react.dev/learn/managing-state', 'https://www.youtube.com/watch?v=G6D9cBaLViA', 'https://codesandbox.io/', 'React', 'CodeSandbox'),
  'Next.js': resource('Next.js', 'https://nextjs.org/learn', 'https://www.youtube.com/watch?v=k7o9R6eaSes', 'https://stackblitz.com/', 'Next.js', 'StackBlitz'),
  'Web Vitals': resource('Web Vitals', 'https://web.dev/explore/learn-core-web-vitals', 'https://www.youtube.com/watch?v=z2KjgjECApg', 'https://pagespeed.web.dev/', 'web.dev', 'PageSpeed Insights'),
  'GraphQL': resource('GraphQL', 'https://graphql.org/learn/', 'https://www.youtube.com/watch?v=ed8SzALpx1Q', 'https://studio.apollographql.com/sandbox/explorer', 'GraphQL', 'Apollo Sandbox'),
  'Node.js': resource('Node.js', 'https://nodejs.org/en/learn', 'https://www.youtube.com/watch?v=RLtyhwFtXQA', 'https://www.codewars.com/', 'Node.js', 'Codewars'),
  'Express': resource('Express', 'https://expressjs.com/', 'https://www.youtube.com/watch?v=RLtyhwFtXQA', 'https://codesandbox.io/', 'Express', 'CodeSandbox'),
  'Docker': resource('Docker', 'https://docs.docker.com/get-started/', 'https://www.youtube.com/watch?v=fqMOX6JJhGo', 'https://labs.play-with-docker.com/', 'Docker', 'Play with Docker'),
  'AWS': resource('AWS', 'https://aws.amazon.com/training/', 'https://www.youtube.com/results?search_query=AWS+Cloud+Bootcamp', 'https://skillbuilder.aws/', 'AWS', 'AWS Skill Builder'),
  'Redis': resource('Redis', 'https://university.redis.com/', 'https://www.youtube.com/watch?v=XCsS_NVAa1g', 'https://university.redis.com/'),
  'PyTorch': resource('PyTorch', 'https://pytorch.org/tutorials/', 'https://www.youtube.com/watch?v=V_xro1bcAuA', 'https://www.kaggle.com/', 'PyTorch', 'Kaggle'),
  'Scikit-Learn': resource('Scikit-Learn', 'https://scikit-learn.org/stable/tutorial/index.html', 'https://www.youtube.com/watch?v=0B5eIE_1vpU', 'https://www.kaggle.com/', 'Scikit-learn', 'Kaggle'),
  'TensorFlow': resource('TensorFlow', 'https://www.tensorflow.org/tutorials', 'https://www.youtube.com/watch?v=tPYj3fFJGjk', 'https://www.kaggle.com/', 'TensorFlow', 'Kaggle'),
  'Data Preprocessing': resource('Data Preprocessing', 'https://scikit-learn.org/stable/modules/preprocessing.html', 'https://www.youtube.com/watch?v=hDKCxebp88A', 'https://www.kaggle.com/', 'Scikit-learn', 'Kaggle'),
  'ML Models': resource('ML Models', 'https://scikit-learn.org/stable/user_guide.html', 'https://www.youtube.com/watch?v=hDKCxebp88A', 'https://www.kaggle.com/competitions', 'Scikit-learn', 'Kaggle Competitions'),
  'LangChain': resource('LangChain', 'https://academy.langchain.com/', 'https://www.youtube.com/watch?v=nAmC7SoVLd8', 'https://academy.langchain.com/', 'LangChain Academy'),
  'FastAPI': resource('FastAPI', 'https://fastapi.tiangolo.com/tutorial/', 'https://www.youtube.com/watch?v=tLKKmouUams', 'https://replit.com/', 'FastAPI', 'Replit'),
  'Pandas': resource('Pandas', 'https://pandas.pydata.org/docs/', 'https://www.youtube.com/watch?v=2uvysYbKdjM', 'https://www.kaggle.com/code', 'Pandas', 'Kaggle Notebooks'),
  'MLOps': resource('MLOps', 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning', 'https://www.youtube.com/watch?v=w71RHxAWxaM', 'https://dvc.org/', 'Google Cloud', 'DVC'),
  'Vector Databases': resource('Vector Databases', 'https://www.pinecone.io/learn/', 'https://www.youtube.com/watch?v=t9IDoenf-lo', 'https://app.pinecone.io/', 'Pinecone', 'Pinecone'),
  'MongoDB/PostgreSQL': resource('MongoDB/PostgreSQL', 'https://learn.mongodb.com/', 'https://www.youtube.com/watch?v=Www6cTUymCY', 'https://www.mongodb.com/atlas', 'MongoDB University', 'MongoDB Atlas'),
  'Data Structures & Algorithms': resource('Data Structures & Algorithms', 'https://www.geeksforgeeks.org/data-structures/', 'https://www.youtube.com/watch?v=8hly31xKli0', 'https://leetcode.com/'),
  'Java/Spring/Microservices': resource('Java/Spring/Microservices', 'https://spring.io/guides', 'https://www.youtube.com/watch?v=4XTsAAHW_Tc', 'https://killercoda.com/')
};

export const getLearningResources = (skill: string): LearningResource[] => RESOURCE_CATALOG[skill] || resource(skill, `https://www.google.com/search?q=${encodeURIComponent(`${skill} official documentation`)}`, `https://www.youtube.com/results?search_query=${encodeURIComponent(`${skill} full course`)}`, `https://www.google.com/search?q=${encodeURIComponent(`${skill} practice`)}`, 'Search');

export const generateSkillGapAnalysis = (data: ResumeData, targetRoleId: string): SkillGapItem[] => {
  const role = CAREER_ROLES_DATABASE.find(r => r.id === targetRoleId) || CAREER_ROLES_DATABASE[0];
  const userSkillNames = data.skills.map(s => s.name.toLowerCase());
  const userProjectTechs = data.projects.flatMap(p => p.technologies.map(t => t.toLowerCase()));

  const result: SkillGapItem[] = [];

  // Check required skills
  role.requiredSkills.forEach(req => {
    const isPresentInSkills = userSkillNames.some(s => s.includes(req.toLowerCase()) || req.toLowerCase().includes(s));
    const isPresentInProjects = userProjectTechs.some(t => t.includes(req.toLowerCase()) || req.toLowerCase().includes(t));

    if (isPresentInSkills && isPresentInProjects) {
      result.push({
        skillName: req,
        category: 'Already Strong',
        reasoning: `Demonstrated both in your skills inventory and implemented inside project codebase(s).`,
        importance: 'Critical'
      });
    } else if (isPresentInSkills || isPresentInProjects) {
      result.push({
        skillName: req,
        category: 'Developing',
        reasoning: `Mentioned in your profile, but build a full production project to prove competency.`,
        importance: 'High'
      });
    } else {
      result.push({
        skillName: req,
        category: 'Priority',
        reasoning: `Essential required core skill for ${role.title} positions. Start learning immediately.`,
        importance: 'Critical'
      });
    }
  });

  // Check nice to have skills
  role.niceToHaveSkills.forEach(nice => {
    const isPresent = userSkillNames.some(s => s.includes(nice.toLowerCase())) || userProjectTechs.some(t => t.includes(nice.toLowerCase()));
    if (!isPresent) {
      result.push({
        skillName: nice,
        category: 'Missing',
        reasoning: `Secondary skill that will differentiate your portfolio against other applicants.`,
        importance: 'Medium'
      });
    }
  });

  return result;
};

export const generatePersonalizedRoadmap = (data: ResumeData, targetRoleId: string): LearningRoadmapStep[] => {
  const gaps = generateSkillGapAnalysis(data, targetRoleId);
  const prioritySkills = gaps.filter(g => g.category === 'Priority').map(g => g.skillName);
  const developingSkills = gaps.filter(g => g.category === 'Developing').map(g => g.skillName);
  const missingSkills = gaps.filter(g => g.category === 'Missing').map(g => g.skillName);

  const steps: LearningRoadmapStep[] = [];
  let stepIndex = 1;

  if (prioritySkills.length > 0) {
    prioritySkills.forEach(skill => {
      const resources = getLearningResources(skill);
      steps.push({
        stepNumber: stepIndex++,
        topic: `Master ${skill} Core Fundamentals`,
        description: `Build foundational mastery of ${skill} syntax, core APIs, error handling, and best practices.`,
        targetSkills: [skill],
        estimatedWeeks: 2,
        prerequisites: ['Basic Programming Logic'],
        resources
      });
    });
  }

  if (developingSkills.length > 0) {
    steps.push({
      stepNumber: stepIndex++,
      topic: `Advance ${developingSkills.join(' & ')} to Production Quality`,
      description: `Integrate ${developingSkills.join(', ')} into real-world applications with automated testing, CI/CD, and database integration.`,
      targetSkills: developingSkills,
      estimatedWeeks: 3,
      prerequisites: prioritySkills.slice(0, 2),
      resources: developingSkills.flatMap(s => getLearningResources(s)).slice(0, 3)
    });
  }

  if (missingSkills.length > 0) {
    steps.push({
      stepNumber: stepIndex++,
      topic: `Expand Skillset with ${missingSkills.slice(0, 3).join(', ')}`,
      description: `Learn high-value peripheral technologies to gain competitive edge for senior level job roles.`,
      targetSkills: missingSkills.slice(0, 3),
      estimatedWeeks: 2,
      prerequisites: ['Core Backend / Frontend Stack'],
      resources: missingSkills.flatMap(s => getLearningResources(s)).slice(0, 3)
    });
  }

  // Capstone Project Step
  steps.push({
    stepNumber: stepIndex++,
    topic: 'Build & Deploy Full Production Capstone Portfolio Project',
    description: 'Construct an end-to-end full stack application incorporating all your learned skills, write comprehensive README, and deploy to live public URL.',
    targetSkills: [...prioritySkills, ...developingSkills],
    estimatedWeeks: 3,
    prerequisites: ['Completed Core Learning Modules'],
    resources: [
      { title: 'Vercel / Render Live Deployment Guide', type: 'Tutorial', url: 'https://vercel.com/docs', provider: 'Vercel', isFree: true },
      { title: 'GitHub Open Source Project Best Practices', type: 'Documentation', url: 'https://docs.github.com/en/get-started', provider: 'GitHub', isFree: true }
    ]
  });

  return steps;
};
