import "./BuilderCV.scss";
import { useState } from "react";
import MasterCV from "./MasterCV";
import PreviewCV from "./PreviewCV";

// Интерфейс для данных формы
export interface FormData {
  name: string;
  email: string;
  profileLinks: string[];
  education: string;
  experience: string;
  skills: string;
  projects: string;
  interviewResults: string;
}

const BuilderCV = () => {
  // Состояние формы в билдере
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    profileLinks: [""],
    education: "",
    experience: "",
    skills: "",
    projects: "",
    interviewResults: "",
  });

  return (
    <div className="builder-cv">
      {/* Левая часть - форма MasterCV */}
      <div className="builder-cv__left">
        <MasterCV formData={formData} setFormData={setFormData} />
      </div>
      
      {/* Правая часть - превью CV */}
      <div className="builder-cv__right">
        <PreviewCV formData={formData} />
      </div>
    </div>
  );
};

export default BuilderCV;
