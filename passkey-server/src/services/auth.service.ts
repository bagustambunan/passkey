import { User } from '../types/model';

const dummyUser1: User = {
  username: 'bagus',
  password: '123456',
};

const users: User[] = [dummyUser1];

export const getUser = async (username: string): Promise<User | null> => {
  return users.find(user => user.username === username) || null;
};
