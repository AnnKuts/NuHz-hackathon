import React from 'react';
import { useContactInfo, useSidebarSections, useMainSections } from '../../utils/cvPreviewHooks';
import type { PreviewCVProps } from "../../types/forms";
import type { Experience, Project } from "../../types/cv";
import "./PreviewCV.scss";

// Inline CV Components
interface ContactItemProps {
  icon: string;
  text: string;
}

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="cv-contact-item">
    <span className="cv-contact-icon">{icon}</span>
    <span className="cv-contact-text">{text}</span>
  </div>
);

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  show?: boolean;
}

const SidebarSection = ({ title, children, show = true }: SidebarSectionProps) => {
  if (!show) return null;
  
  return (
    <div className="cv-sidebar-section">
      <h3 className="cv-sidebar-title">{title}</h3>
      {children}
    </div>
  );
};

interface CVSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

const MainSection = ({ title, icon = "•", children, className }: CVSectionProps) => (
  <div className={`cv-main-section ${className || ''}`}>
    <div className="cv-main-section-header">
      <span className="cv-section-icon">{icon}</span>
      <h3 className="cv-main-title">{title}</h3>
    </div>
    {children}
  </div>
);

interface TextListProps {
  items: string[];
  className?: string;
}

const TextList = ({ items, className = 'text-list' }: TextListProps) => (
  <div className={className}>
    {items.map((item, index) => {
      const trimmedItem = item.trim();
      if (!trimmedItem) return null;
      
      if (className === 'cv-education-content') {
        return <p key={index} className="cv-education-item">{trimmedItem}</p>;
      } else {
        return <div key={index} className={className === 'cv-skills-content' ? 'cv-skill-item' : 'cv-language-item'}>{trimmedItem}</div>;
      }
    })}
  </div>
);

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => (
  <div className="cv-experience-item">
    <h4 className="cv-experience-position">{experience.position}</h4>
    <div className="cv-experience-details">
      <span className="cv-experience-company">{experience.company}</span>
      <span className="cv-experience-separator"> | </span>
      <span className="cv-experience-dates">
        {experience.startDate} - {experience.endDate || 'Present'}
      </span>
    </div>
    {experience.summary && (
      <p className="cv-experience-description">{experience.summary}</p>
    )}
  </div>
);

interface ProjectItemProps {
  project: Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => (
  <div className="cv-project-item">
    <div className="cv-project-header">
      <h4 className="cv-project-title">
        {project.title} 
        {project.link && <span className="cv-project-link-icon">🔗</span>}
      </h4>
    </div>
    {project.summary && (
      <p className="cv-project-description">{project.summary}</p>
    )}
  </div>
);

const PreviewCV: React.FC<PreviewCVProps> = ({ formData }) => {
  const contactInfo = useContactInfo(formData);
  const sidebarSections = useSidebarSections(formData);
  const mainSections = useMainSections(formData);

  return (
    <div className="preview-cv">
      <div className="cv-document">
        <div className="cv-sidebar">
          {/* Profile Photo */}
          {formData.photo && (
            <div className="cv-photo-section">
              <img 
                src={formData.photo} 
                alt="Profile" 
                className="cv-photo"
              />
            </div>
          )}
          
          {/* Header */}
          <div className="cv-header">
            <h1 className="cv-header__name">{formData.name || "Your Name"}</h1>
            <h2 className="cv-header__title">{formData.profession || "Frontend Developer"}</h2>
            <p className="cv-header__location">{formData.location || "City, Country"}</p>
          </div>

          {/* Contact Information */}
          <div className="cv-sidebar-section">
            {contactInfo.map((contact, index) => (
              <ContactItem 
                key={index}
                icon={contact.icon}
                text={contact.text}
              />
            ))}
          </div>

          {/* Dynamic Sidebar Sections */}
          {sidebarSections.map((section, index) => (
            <SidebarSection key={index} title={section.title}>
              <TextList items={section.items} className={section.className} />
            </SidebarSection>
          ))}
        </div>

        <div className="cv-main-content">
          {/* Dynamic Main Sections */}
          {mainSections.map((section, index) => {
            if (section.type === 'text') {
              return (
                <MainSection key={index} title={section.title}>
                  <div className="cv-about-text">
                    {section.content?.split('\n').map((paragraph, pIndex) => (
                      paragraph.trim() && (
                        <p key={pIndex} style={{ margin: pIndex > 0 ? '10px 0 0 0' : '0' }}>
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>
                </MainSection>
              );
            }

            if (section.type === 'experience' && section.items) {
              return (
                <MainSection key={index} title={section.title}>
                  <div className="cv-main-content-body">
                    {section.items.map((experience, expIndex) => (
                      <ExperienceItem key={expIndex} experience={experience} />
                    ))}
                  </div>
                </MainSection>
              );
            }

            if (section.type === 'projects' && section.items) {
              return (
                <MainSection key={index} title={section.title}>
                  <div className="cv-main-content-body">
                    {section.items.map((project, projectIndex) => (
                      <ProjectItem key={projectIndex} project={project} />
                    ))}
                  </div>
                </MainSection>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewCV;
