import "./MasterCV.scss";
import type { FormData } from "./BuilderCV";

interface FormField {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'multiInput';
  inputType?: 'text' | 'email';
  placeholder: string;
  section: string;
  rows?: number;
  maxItems?: number;
}

interface MasterCVProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const formConfig: FormField[] = [
  { name: 'name', label: 'Full Name', type: 'input', inputType: 'text', placeholder: 'Enter your full name', section: 'Personal Information' },
  { name: 'email', label: 'Email Address', type: 'input', inputType: 'email', placeholder: 'your_email@example.com', section: 'Personal Information' },
  { name: 'profileLinks', label: 'Profile Links', type: 'multiInput', placeholder: 'LinkedIn, GitHub, etc...', section: 'Personal Information', maxItems: 4 },
  
  { name: 'education', label: 'Education', type: 'textarea', placeholder: 'Your educational background...', section: 'Education & Experience', rows: 3 },
  { name: 'experience', label: 'Work Experience', type: 'textarea', placeholder: 'Your work experience...', section: 'Education & Experience', rows: 3 },
  
  { name: 'skills', label: 'Skills', type: 'textarea', placeholder: 'List your skills...', section: 'Skills & Projects', rows: 3 },
  { name: 'projects', label: 'Projects', type: 'textarea', placeholder: 'Describe your projects...', section: 'Skills & Projects', rows: 3 },
  
  { name: 'interviewResults', label: 'Training Results', type: 'textarea', placeholder: 'Results from interview simulator...', section: 'Interview Results', rows: 4 },
];

const MasterCV = ({ formData, setFormData }: MasterCVProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.tagName === "TEXTAREA") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  const handleProfileLinkChange = (index: number, value: string) => {
    const newProfileLinks = [...formData.profileLinks];
    newProfileLinks[index] = value;
    setFormData({
      ...formData,
      profileLinks: newProfileLinks,
    });
  };

  const addProfileLink = () => {
    if (formData.profileLinks.length < 4) {
      setFormData({
        ...formData,
        profileLinks: [...formData.profileLinks, ""],
      });
    }
  };

  const removeProfileLink = (index: number) => {
    if (formData.profileLinks.length > 1) {
      const newProfileLinks = formData.profileLinks.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        profileLinks: newProfileLinks,
      });
    }
  };

  const renderField = (field: FormField) => {
    if (field.type === 'multiInput') {
      return (
        <div key={field.name} className="mastercv__form-group">
          <div className="mastercv__form-label-with-button">
            <label className="mastercv__form-label">{field.label}</label>
            {formData.profileLinks.length < (field.maxItems || 4) && (
              <button
                type="button"
                className="mastercv__add-button"
                onClick={addProfileLink}
                title={`Add another ${field.label.toLowerCase()}`}
              >
                +
              </button>
            )}
          </div>
          {formData.profileLinks.map((link, index) => (
            <div 
              key={index} 
              className="mastercv__input-with-button"
              style={{ marginBottom: index === formData.profileLinks.length - 1 ? '0' : '8px' }}
            >
              <input
                className="mastercv__form-input"
                type="text"
                value={link}
                onChange={(e) => handleProfileLinkChange(index, e.target.value)}
                placeholder={index === 0 ? field.placeholder : `Additional ${field.label.toLowerCase()}...`}
              />
              {index > 0 && (
                <button
                  type="button"
                  className="mastercv__remove-button"
                  onClick={() => removeProfileLink(index)}
                  title={`Remove this ${field.label.toLowerCase()}`}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="mastercv__form-group">
          <label className="mastercv__form-label" htmlFor={field.name}>{field.label}</label>
          <textarea
            className="mastercv__form-textarea"
            id={field.name}
            name={field.name}
            value={formData[field.name as keyof typeof formData] as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows || 3}
          />
        </div>
      );
    }

    return (
      <div key={field.name} className="mastercv__form-group">
        <label className="mastercv__form-label" htmlFor={field.name}>{field.label}</label>
        <input
          className="mastercv__form-input"
          type={field.inputType || 'text'}
          id={field.name}
          name={field.name}
          value={formData[field.name as keyof typeof formData] as string}
          onChange={handleChange}
          placeholder={field.placeholder}
        />
      </div>
    );
  };

  const groupedFields = formConfig.reduce((acc, field) => {
    if (!acc[field.section]) acc[field.section] = [];
    acc[field.section].push(field);
    return acc;
  }, {} as Record<string, FormField[]>);

  return (
    <div className="mastercv__form-wrapper">
      <div className="mastercv__form">
        <p className="mastercv__form-description">
          Enter the data that will be automatically inserted into your CV
        </p>
        {Object.entries(groupedFields).map(([sectionName, fields]) => (
          <div key={sectionName} className="mastercv__form-section">
            <h2 className="mastercv__form-title">{sectionName}</h2>
            {fields.map(field => renderField(field))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterCV;
