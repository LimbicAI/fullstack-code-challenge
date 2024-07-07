import { createContext, useContext } from 'react';

import userService from '../services/UserService';

const UserStoreContext = createContext(userService);

export const useUserStore = () => useContext(UserStoreContext);
