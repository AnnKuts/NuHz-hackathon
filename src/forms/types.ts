import type { FormField } from "../types/forms";
import type { FormData } from "../types/cv";

interface BaseFieldProps {
  field: FormField;
  formData: FormData;
}

export interface FileFieldProps extends BaseFieldProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldProps extends BaseFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface MultiInputFieldProps extends BaseFieldProps {
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export interface ProjectListFieldProps extends BaseFieldProps {
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof import("../types/cv").Project, value: string) => void;
}

export interface ExperienceListFieldProps extends BaseFieldProps {
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: keyof import("../types/cv").Experience, value: string) => void;
}