import "./MasterCV.scss";

import type { FormField, MasterCVProps } from "../../types/forms";

import { formConfig } from "../../config/formConfig";
import { useFormChange, useProfileLinks, useProjects, useExperiences } from "../../utils/formHooks";
import { useValidation } from "../../utils/validationHooks";

import { FileField } from "../../forms/cv_form/FileField";
import { TextField } from "../../forms/cv_form/TextField";
import { MultiInputField } from "../../forms/cv_form/MultiInputField";
import { ProjectListField } from "../../forms/cv_form/ProjectListField";
import { ExperienceListField } from "../../forms/cv_form/ExperienceListField";

const MasterCV = ({ formData, setFormData }: MasterCVProps) => {
  const { handleChange, handleFileChange } = useFormChange(formData, setFormData);
  const profileLinks = useProfileLinks(formData, setFormData);
  const projects = useProjects(formData, setFormData);
  const experiences = useExperiences(formData, setFormData);
  const { getFieldError } = useValidation(formData);

  const renderField = (field: FormField) => {
    const commonProps = { field, formData };

    switch (field.type) {
      case 'file':
        return (
          <FileField
            {...commonProps}
            onFileChange={handleFileChange}
          />
        );

      case 'multiInput':
        if (field.name === 'profileLinks') {
          return (
            <MultiInputField
              {...commonProps}
              onAdd={profileLinks.add}
              onRemove={profileLinks.remove}
              onChange={profileLinks.handleChange}
            />
          );
        }
        break;

      case 'projectList':
        return (
          <ProjectListField
            {...commonProps}
            onAdd={projects.add}
            onRemove={projects.remove}
            onUpdate={projects.update}
          />
        );

      case 'experienceList':
        return (
          <ExperienceListField
            {...commonProps}
            onAdd={experiences.add}
            onRemove={experiences.remove}
            onUpdate={experiences.update}
            getFieldError={getFieldError}
          />
        );

      case 'textarea':
      case 'input':
      default:
        return (
          <TextField
            {...commonProps}
            onChange={handleChange}
            error={getFieldError(field.name)}
          />
        );
    }

    return null;
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
