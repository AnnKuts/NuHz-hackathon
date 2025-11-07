import { User, IUser } from '../models/user.model';
import { generateToken } from '../utils/jwt';


export async function findOrCreateUser(
  googleId: string,
  email: string,
  fullName: string,
  profilePicture?: string
): Promise<IUser> {
  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = googleId;
      await user.save();
    } else {
      user = new User({
        googleId,
        email,
        fullName,
        profilePicture,
        links: {},
        education: [],
        experience: [],
        skills: [],
        projects: [],
        interviewResults: [],
        quizResults: [],
        optInAnalytics: false,
      });
      await user.save();
    }
  }
  return user;
}

export function createAuthToken(user: IUser, jwtSecret: string): string {
  const payload = { id: user._id.toString(), email: user.email };
  return generateToken(payload, jwtSecret);
}