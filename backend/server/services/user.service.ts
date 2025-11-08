import { User, IUser } from '../models/user.model';

export async function getUserById(userId: string): Promise<IUser | null> {
  return User.findById(userId);
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<IUser>
): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, updates, { new: true });
}

export async function deleteUser(userId: string): Promise<IUser | null> {
  return User.findByIdAndDelete(userId);
}

export async function addInterviewResult(
  userId: string,
  score: number,
  feedback: string
): Promise<IUser | null> {
  return User.findByIdAndUpdate(
    userId,
    { $push: { interviewResults: { score, feedback } } },
    { new: true }
  );
}

export async function addQuizResult(
  userId: string,
  quizName: string,
  score: number
): Promise<IUser | null> {
  return User.findByIdAndUpdate(
    userId,
    { $push: { quizResults: { quizName, score } } },
    { new: true }
  );
}

export async function updateOptInAnalytics(
  userId: string,
  optIn: boolean
): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, { optInAnalytics: optIn }, { new: true });
}