import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import Questions from './components/Questions';
import Answers from './components/Answers';

const Routes = () => {
  return (
    <ReactRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/answers" element={<Answers />} />
    </ReactRoutes>
  );
};

export default Routes;