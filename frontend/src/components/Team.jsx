import React from 'react';
import './Team.css';
import { useTranslation } from 'react-i18next'; // Assuming you're using react-i18next for translation

const teamMembers = [
    {
      name: 'Dr. Ahmad Odah',
      title: 'Diagnostic Radiologist',
      brief: 'Expert in diagnosing and interpreting medical images, providing accurate and timely reports.',
      imageUrl: 'https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png',
    },
    {
      name: 'Ali Hamdallah',
      title: 'Executive Partner',
      brief: 'Leading strategic partnerships and ensuring business success through innovation.',
      imageUrl: 'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png',
    },
    // Add more team members as needed
  ];
  

  const Team = () => {
    const { t } = useTranslation(); // Hook to use translations
  
    return (
      <div className="team-container text-center my-16">
        <h2 className="team text-4xl font-bold">{t('team.title')}</h2>
        <div className='team-p'>
          <p>{t('team.paragraph')}</p>
        </div>
        <div className="team flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={member.imageUrl}
                  alt={`${member.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{t(`teamMembers.${index}.name`)}</h3>
              <p className="text-gray-600">{t(`teamMembers.${index}.title`)}</p>
              <p className="text-gray-500 mt-2 team-pb">{t(`teamMembers.${index}.brief`)}</p> {/* Brief for each member */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Team;