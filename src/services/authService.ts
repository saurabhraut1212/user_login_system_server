import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User';
import { generateToken } from '../utils/token';

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ServiceResult {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}

export const registerUser = async (
  data: RegisterData,
): Promise<ServiceResult> => {
  try {
    const existingUser: IUser | null = await User.findOne({
      email: data.email,
    });
    if (existingUser)
      return { success: false, message: 'Email already registered' };

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      email: data.email,
      password: hashedPassword,
    });

    await user.save();

    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  } catch (error) {
    return { success: false, message: 'Registration failed' };
  }
};

export const loginUser = async (data: LoginData): Promise<ServiceResult> => {
  try {
    const user: IUser | null = await User.findOne({ email: data.email });
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = generateToken(user._id.toString());

    return {
      success: true,
      message: 'Login successful',
      data: { id: user._id, email: user.email }, // avoid sending password
      token,
    };
  } catch (error) {
    return { success: false, message: 'Login failed' };
  }
};
