import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PlansManagement from './pages/PlansManagement';
import Maps from './pages/Maps';
import NotificationSettings from './pages/NotificationSettings';
import NotificationSending from './pages/NotificationSending';
import CommunityManagement from './pages/CommunityManagement';
import ReportSelection from './pages/ReportSelection';
import ReportDetail from './pages/ReportDetail';
import RewardsPage from './pages/RewardsPage';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Account from './pages/Account';
import CreateAccount from './pages/CreateAccount';
import Meal from './pages/Meal';
import ForgetPassword from './pages/ForgetPassword';
import CommunityParticipation from './pages/CommunityParticipation';
import OneCoaching from './pages/OneCoaching';
import AddMeal from './pages/AddMeal';
import NewClientRequests from './pages/NewClientRequests';
import TrainingSessions from './pages/TrainingSessions';
import CreateTrainingSession from './pages/CreateTrainingSession';
import TrainerCommunity from './pages/TrainerCommunity';
import ClientsLoseWeight from './pages/ClientsLoseWeight';
import ClientsGainWeight from './pages/ClientsGainWeight';
import ClientsMaintainWeight from './pages/ClientsMaintainWeight';
import Workout from './pages/Workout';
import Trainers from './pages/Trainers';
import TrainerPersonalInfo from './pages/TrainerPersonalInfo';
import CreateAccountDetails from './pages/CreateAccountDetails';
import Progress from './pages/Progress';
import EditPlan from './pages/EditPlan';
import TrainerDetails from './pages/TrainerDetails';
import MyCoaching from './pages/MyCoaching';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/plans" element={<PlansManagement />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/notification/settings" element={<NotificationSettings />} />
        <Route path="/notification/send" element={<NotificationSending />} />
        <Route path="/community" element={<CommunityManagement />} />
        <Route path="/report" element={<ReportSelection />} />
        <Route path="/report/detail" element={<ReportDetail />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/communityParticipation" element={<CommunityParticipation />} />
        <Route path="/oneCoaching" element={<OneCoaching />} />
        <Route path="/add-meal/:type/:category" element={<AddMeal />} />
        <Route path="/new-client-requests"element={<NewClientRequests />} />
        <Route path="/training-sessions" element={<TrainingSessions />} />
        <Route path="/training-sessions/create" element={<CreateTrainingSession />} />
        <Route path="/trainer/community" element={<TrainerCommunity />} />
        <Route path="/clients/lose-weight" element={<ClientsLoseWeight />} />
        <Route path="/clients/gain-weight" element={<ClientsGainWeight />} />
        <Route path="/clients/maintain-weight" element={<ClientsMaintainWeight />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/create-account-details/trainer" element={<TrainerPersonalInfo />} />
        <Route path="/create-account-details/user" element={<CreateAccountDetails />} />
        <Route path="/progress" element={<Progress />} />
        <Route path='/plans/edit/:id' element={<EditPlan />} />
        <Route path='/trainers/:id' element={<TrainerDetails/>}/>
        <Route path="/my-coaching" element={<MyCoaching />} />
      </Routes>
    </Router>
  );
}

export default App;