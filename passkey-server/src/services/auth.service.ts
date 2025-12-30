import { User } from '../types/model';

const dummyUser1: User = {
  username: 'bagus',
  password: '123',
};

const dummyUser2: User = {
  username: 'bagus2',
  password: '123',
};

const users: User[] = [dummyUser1, dummyUser2];

export const getUser = async (username: string): Promise<User | null> => {
  return users.find(user => user.username === username) || null;
};
