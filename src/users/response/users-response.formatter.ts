import { User } from '../users.model';
import { UserResponse } from './users-response.interface';

export const getUserResponseFormat = (user: User): UserResponse => {
  const userResponse = {} as UserResponse;
  const keys = Object.keys(user);

  keys.forEach((key) => {
    if (key !== 'password') {
      userResponse[key] = user[key];
    }
  });

  return userResponse;
};
