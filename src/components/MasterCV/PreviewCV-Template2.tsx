import React from 'react';
import { useContactInfo, useSidebarSections, useMainSections } from '../../utils/cvPreviewHooks';
import type { PreviewCVProps } from "../../types/forms";
import type { 
  ContactItemProps, 
  CVSectionProps, 
  TextListProps, 
  ExperienceItemProps, 
  ProjectItemProps 
} from "../../types/cv";
import "./PreviewCV-Template2.scss";

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="cv2-contact-item">
    <span className="cv2-contact-icon">{icon}</span>
    <span className="cv2-contact-text">{text}</span>
  </div>
);

const CVSection = ({ title, children, className }: CVSectionProps) => (
  <div className={`cv2-section ${className || ''}`}>
    <h3 className="cv2-section-title">{title}</h3>
    <div className="cv2-section-content">
      {children}
    </div>
  </div>
);

const TextList = ({ items, className }: TextListProps) => (
  <ul className={`cv2-list ${className || ''}`}>
    {items.map((item, index) => (
      <li key={index} className="cv2-list-item">{item}</li>
    ))}
  </ul>
);

const ExperienceItem = ({ experience }: ExperienceItemProps) => (
  <div className="cv2-experience-item">
    <div className="cv2-experience-header">
      <div className="cv2-experience-left">
        <h4 className="cv2-experience-title">{experience.position}</h4>
        <p className="cv2-experience-company">{experience.company}</p>
      </div>
      <div className="cv2-experience-right">
        <span className="cv2-experience-dates">
          {experience.startDate} - {experience.endDate}
        </span>
      </div>
    </div>
    {experience.summary && (
      <p className="cv2-experience-description">{experience.summary}</p>
    )}
  </div>
);

const ProjectItem = ({ project }: ProjectItemProps) => (
  <div className="cv2-project-item">
    <div className="cv2-project-header">
      <h4 className="cv2-project-title">
        {project.title}
        {project.link && <span className="cv2-project-link">🔗</span>}
      </h4>
    </div>
    {project.summary && (
      <p className="cv2-project-description">{project.summary}</p>
    )}
  </div>
);

const PreviewCVTemplate2: React.FC<PreviewCVProps> = ({ formData }) => {
  const contactInfo = useContactInfo(formData);
  const sidebarSections = useSidebarSections(formData);
  const mainSections = useMainSections(formData);

  return (
    <div className="preview-cv2">
      <div className="cv2-document">
        <div className="cv2-header">
          <div className="cv2-header-main">
            <div className="cv2-header-content">
              <h1 className="cv2-name">{formData.name || "Your Name"}</h1>
              <h2 className="cv2-profession">{formData.profession || "Frontend Developer"}</h2>
              <p className="cv2-location">{formData.location || "City, Country"}</p>
            </div>
            {formData.photo && (
              <div className="cv2-photo-section">
                <img 
                  src={formData.photo} 
                  alt="Profile" 
                  className="cv2-photo"
                />
              </div>
            )}
          </div>
          
          <div className="cv2-contacts">
            {contactInfo.map((contact, index) => (
              <ContactItem 
                key={index}
                icon={contact.icon}
                text={contact.text}
              />
            ))}
          </div>
        </div>

        <div className="cv2-main-content">
          {sidebarSections.map((section, index) => (
            <CVSection key={`sidebar-${index}`} title={section.title} className="cv2-sidebar-section">
              <TextList items={section.items} className={section.className} />
            </CVSection>
          ))}

          {mainSections.map((section, index) => {
            if (section.type === 'text') {
              return (
                <CVSection key={`main-${index}`} title={section.title}>
                  <div className="cv2-text-content">
                    {section.content?.split('\n').map((paragraph, pIndex) => (
                      paragraph.trim() && (
                        <p key={pIndex} className="cv2-paragraph">
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>
                </CVSection>
              );
            }

            if (section.type === 'experience' && section.items) {
              return (
                <CVSection key={`main-${index}`} title={section.title}>
                  <div className="cv2-experience-list">
                    {section.items.map((experience, expIndex) => (
                      <ExperienceItem key={expIndex} experience={experience} />
                    ))}
                  </div>
                </CVSection>
              );
            }

            if (section.type === 'projects' && section.items) {
              return (
                <CVSection key={`main-${index}`} title={section.title}>
                  <div className="cv2-project-list">
                    {section.items.map((project, projectIndex) => (
                      <ProjectItem key={projectIndex} project={project} />
                    ))}
                  </div>
                </CVSection>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviewCVTemplate2;