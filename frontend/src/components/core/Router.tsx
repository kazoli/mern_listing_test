import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserStart from '../pages/UserStart';
import UserProfile from '../pages/UserProfile';
import CollectionListing from '../pages/CollectionListing';
import TaskListing from '../pages/TaskListing';
import NotFound from '../pages/NotFound';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionListing />} />
        <Route path="/users/login" element={<UserStart login={true} />} />
        <Route path="/users/register" element={<UserStart login={false} />} />
        <Route path="/users/profile" element={<UserProfile />} />
        <Route path="/tasks/:collection_id" element={<TaskListing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
