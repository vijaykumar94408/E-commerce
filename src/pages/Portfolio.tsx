import React from 'react';
import { Container, Paper, Typography, Box, Grid, Chip, Card, CardContent } from '@mui/material';

const Portfolio: React.FC = () => {
  const skills = [
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js',
    'Node.js', 'MySQL', 'Python', 'Machine Learning', 'Git'
  ];

  const projects = [
    {
      title: 'E-commerce Application',
      description: 'Full-stack e-commerce platform with user authentication, product management, and shopping cart functionality.',
      tech: ['React.js', 'Node.js', 'MySQL', 'Material-UI']
    },
    {
      title: 'Weather Application',
      description: 'Real-time weather information display using weather API integration.',
      tech: ['JavaScript', 'API Integration', 'CSS3']
    },
    {
      title: 'Calculator',
      description: 'Interactive calculator with advanced mathematical operations.',
      tech: ['React.js', 'CSS3', 'JavaScript']
    },
    {
      title: 'Rock Paper Scissors Game',
      description: 'Interactive game with score tracking and animations.',
      tech: ['JavaScript', 'HTML5', 'CSS3']
    },
    {
      title: 'Machine Learning Projects',
      description: 'Implemented various ML models and data analysis projects.',
      tech: ['Python', 'Machine Learning', 'Data Analysis']
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          B Vijay Kumar
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Full Stack Developer | AI/ML Enthusiast
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Career Objective</Typography>
          <Typography paragraph>
            Dedicated and innovative Full Stack Developer with a strong foundation in web development and AI/ML concepts. 
            Seeking to leverage my technical expertise and internship experience in software testing and web development 
            to contribute to challenging projects and continue growing professionally.
          </Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill) => (
              <Chip key={skill} label={skill} color="primary" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Experience</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Software Testing and Web Development Intern
          </Typography>
          <Typography paragraph>
            • Gained hands-on experience in software testing methodologies and web development
            • Worked on AI/ML integration projects
            • Developed and tested web applications using modern technologies
          </Typography>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Projects</Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} md={6} key={project.title}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.tech.map((tech) => (
                        <Chip key={tech} label={tech} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Portfolio;