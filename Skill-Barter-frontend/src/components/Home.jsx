import React from 'react';
import { Code, Palette, Camera, Music, Book, Dumbbell } from 'lucide-react';

const popularSkills = [
  { name: 'Programming', icon: Code },
  { name: 'Design', icon: Palette },
  { name: 'Photography', icon: Camera },
  { name: 'Music', icon: Music },
  { name: 'Teaching', icon: Book },
  { name: 'Fitness', icon: Dumbbell },
];

function Home() {
  return (
    <div className="container">
      <h1>Welcome to SkillBarter</h1>
      
      <section className="skills-section">
        <h2>Popular Skills</h2>
        <div className="skills-grid">
          {popularSkills.map((skill) => (
            <div key={skill.name} className="skill-card">
              <skill.icon className="skill-icon" size={32} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="exchanges-section">
        <h2>Recent Exchanges</h2>
        <div className="exchanges-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="exchange-card">
              <div className="exchange-header">
                <div className="avatar"></div>
                <div className="exchange-info">
                  <h3>User {i}</h3>
                  <p>Skill Exchange: Programming for Design</p>
                </div>
              </div>
              <p className="exchange-message">
                "Great experience exchanging skills! Learned a lot and had fun in the process."
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;