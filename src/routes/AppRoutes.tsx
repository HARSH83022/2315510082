import { Route, Routes } from 'react-router-dom';
import AllNotificationsPage from '../pages/AllNotificationsPage';
import PriorityNotificationsPage from '../pages/PriorityNotificationsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllNotificationsPage />} />
      <Route path="/priority" element={<PriorityNotificationsPage />} />
    </Routes>
  );
}
