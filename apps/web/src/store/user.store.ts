import { create } from "zustand";
export enum USER_TYPES {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}
type userStoreType = (
  | {
      isLoggedIn: false;
      name: null;
      id: null;
      email: null;
      username: null;
      type: null;
    }
  | {
      isLoggedIn: true;
      name: string;
      id: string;
      email: string;
      username: string;
      type: USER_TYPES;
    }
) & {
  setUser: (user: {
    name: string;
    id: string;
    email: string;
    username: string;
    type: USER_TYPES;
  }) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  isLoggedIn: false,
  name: null,
  id: null,
  email: null,
  username: null,
  type: null,

  setUser: (user) => {
    set({ isLoggedIn: true, ...user });
  },
}));
