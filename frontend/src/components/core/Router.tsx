import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import UserProfile from '../pages/UserProfile';
import CollectionListing from '../pages/CollectionListing';
import TaskListing from '../pages/TaskListing';
import NotFound from '../pages/NotFound';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionListing />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/register" element={<UserRegister />} />
        <Route path="/users/profile" element={<UserProfile />} />
        <Route path="/tasks/:collection_id" element={<TaskListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
