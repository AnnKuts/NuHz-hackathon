import { useMemo } from "react";
import type { FormData, Project, Experience } from "../types/cv";
import { defaultProject, defaultExperience } from "../config/defaultValues";
import {
  createArrayUpdateHandler,
  createArrayAddHandler,
  createArrayRemoveHandler,
  createObjectInArrayUpdateHandler,
  autoResizeTextarea
} from "./formUtils";

export const useProfileLinks = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const handleChange = useMemo(
    () => createArrayUpdateHandler(formData, setFormData, 'profileLinks'),
    [formData, setFormData]
  );

  const add = useMemo(
    () => createArrayAddHandler(formData, setFormData, 'profileLinks', "", 4),
    [formData, setFormData]
  );

  const remove = useMemo(
    () => createArrayRemoveHandler(formData, setFormData, 'profileLinks', 1),
    [formData, setFormData]
  );

  return { handleChange, add, remove };
};

export const useProjects = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const add = useMemo(
    () => createArrayAddHandler(formData, setFormData, 'projects', { ...defaultProject }),
    [formData, setFormData]
  );

  const remove = useMemo(
    () => createArrayRemoveHandler(formData, setFormData, 'projects', 1),
    [formData, setFormData]
  );

  const update = useMemo(
    () => createObjectInArrayUpdateHandler<'projects', keyof Project>(formData, setFormData, 'projects'),
    [formData, setFormData]
  );

  return { add, remove, update };
};

export const useExperiences = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const add = useMemo(
    () => createArrayAddHandler(formData, setFormData, 'experiences', { ...defaultExperience }),
    [formData, setFormData]
  );

  const remove = useMemo(
    () => createArrayRemoveHandler(formData, setFormData, 'experiences', 1),
    [formData, setFormData]
  );

  const update = useMemo(
    () => createObjectInArrayUpdateHandler<'experiences', keyof Experience>(formData, setFormData, 'experiences'),
    [formData, setFormData]
  );

  return { add, remove, update };
};

export const useFormChange = (
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.tagName === "TEXTAREA") {
      autoResizeTextarea(e.target as HTMLTextAreaElement);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData({
          ...formData,
          photo: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleChange, handleFileChange };
};