import { User } from '../types/model';

const dummyUser1: User = {
  name: 'Bagus',
  username: 'bagus',
  password: '123',
};

const dummyUser2: User = {
  name: 'Bagus 2',
  username: 'bagus2',
  password: '123',
};

const users: User[] = [dummyUser1, dummyUser2];

export const getUser = async (username: string): Promise<User | null> => {
  return users.find(user => user.username === username) || null;
};
