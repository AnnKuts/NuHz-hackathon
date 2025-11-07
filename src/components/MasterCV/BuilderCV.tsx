import "./BuilderCV.scss";
import { useState } from "react";
import MasterCV from "./MasterCV";
import PreviewCV from "./PreviewCV";
import type { FormData } from "../../types/cv";
import { defaultFormData } from "../../config/defaultValues";

const BuilderCV = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <div className="builder-cv">
      <div className="builder-cv__left">
        <MasterCV formData={formData} setFormData={setFormData} />
      </div>
      
      <div className="builder-cv__right">
        <PreviewCV formData={formData} />
      </div>
    </div>
  );
};

export default BuilderCV;
