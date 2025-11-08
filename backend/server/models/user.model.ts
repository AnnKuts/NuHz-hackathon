import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  googleId?: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
  interviewResults: Array<{
    date: Date;
    score: number;
    feedback: string;
  }>;
  quizResults: Array<{
    quizName: string;
    score: number;
    date: Date;
  }>;
  optInAnalytics: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    profilePicture: { type: String },
    links: {
      github: { type: String },
      linkedin: { type: String },
      portfolio: { type: String },
    },
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    skills: [{ type: String }],
    projects: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String },
      },
    ],
    interviewResults: [
      {
        date: { type: Date, required: true, default: Date.now },
        score: { type: Number, required: true },
        feedback: { type: String, required: true },
      },
    ],
    quizResults: [
      {
        quizName: { type: String, required: true },
        score: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now },
      },
    ],
    optInAnalytics: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);