import "./BuilderCV.scss";
import { useState, useRef } from "react";
import MasterCV from "./MasterCV";
import PreviewCV from "./PreviewCV";
import PreviewCVTemplate2 from "./PreviewCV-Template2";
import { ExportButtons } from "../ExportButtons/ExportButtons";
import type { FormData } from "../../types/cv";
import { defaultFormData } from "../../config/defaultValues";

type TemplateType = 'template1' | 'template2';

const BuilderCV = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('template1');
  const cvRef = useRef<HTMLDivElement>(null!);

  const renderPreview = () => {
    switch (selectedTemplate) {
      case 'template2':
        return <PreviewCVTemplate2 formData={formData} />;
      case 'template1':
      default:
        return <PreviewCV formData={formData} />;
    }
  };

  return (
    <div className="builder-cv">
      <div className="builder-cv__left">
        <MasterCV formData={formData} setFormData={setFormData} />
      </div>
      
      <div className="builder-cv__right">
        <div className="template-selector">
          <h3 className="template-selector__title">Choose Template</h3>
          <div className="template-selector__buttons">
            <button
              className={`template-selector__button ${selectedTemplate === 'template1' ? 'active' : ''}`}
              onClick={() => setSelectedTemplate('template1')}
            >
              Template 1
              <span className="template-selector__preview">Classic</span>
            </button>
            <button
              className={`template-selector__button ${selectedTemplate === 'template2' ? 'active' : ''}`}
              onClick={() => setSelectedTemplate('template2')}
            >
              Template 2
              <span className="template-selector__preview">Modern</span>
            </button>
          </div>
        </div>
        
        <ExportButtons 
          previewRef={cvRef}
          cvData={formData}
        />
        
        <div ref={cvRef}>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default BuilderCV;
