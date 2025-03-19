import React, { useState, useEffect } from 'react';
import { Code, Palette, Camera, Music, Book, Dumbbell, Globe, Paintbrush, Database, Megaphone, PenTool, Smartphone, ShieldCheck, Video, LayoutDashboard } from 'lucide-react'; // Ensure all icons are imported
import axios from 'axios';

const iconMapping = {
  
  'Browser':Globe,
  'Paintbrush': Paintbrush,
  'Database': Database,
  'Megaphone': Megaphone,
  'PenTool': PenTool,
  'Smartphone': Smartphone,
  'ShieldCheck': ShieldCheck,
  'Video': Video,
  'LayoutDashboard': LayoutDashboard,
  'Camera': Camera,
  'Code': Code,
  'Palette': Palette,
  'Music': Music,
  'Book': Book,
  'Dumbbell': Dumbbell,
  'Globe': Globe,
};

function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/skills')
      .then((res) => { 
        console.log(res.data);
        setSkills(res.data);
      })
      .catch((err) => console.error('Error fetching skills', err));
  }, []);

  return (
    <div className="container">
      <h1>Welcome to SkillBarter</h1>

      <section className="skills-section">
        <h2>Popular Skills</h2>
        <div className="skills-grid">
          {skills.length > 0 ? (
            skills.map((skill) => {
              const IconComponent = iconMapping[skill.icon]; // Get the corresponding icon component
              return (
                <div key={skill.skillId} className="skill-card">
                  {/* Dynamically render icon */}
                  {IconComponent ? <IconComponent className="skill-icon" size={32} /> : null}
                  <span className='skill-text'>{skill.skillName}</span>
                </div>
              );
            })
          ) : (
            <p>Loading skills...</p> // Handle loading state
          )}
        </div>
      </section>

      
    </div>
  );
}

export default Home;
