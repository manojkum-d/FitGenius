import React from 'react';
import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/home/Home';
// import About from './components/about/Profile';
import Ai from './components/ai/Ai';
import Tools from './components/tools/Tools';
import Articles from './components/articles/Articles';
import './App.scss'
import './index.css'
import {
  Dumbbell,
  Bot,
  Weight,
  BookOpen,
  LogIn,
  UserPlus,
  Settings,
  HelpCircle,
  HomeIcon,
  Apple,
} from 'lucide-react';
import 'tailwindcss/tailwind.css';

import Sidebar, { SidebarItem } from './components/sidebar/Sidebar';
// import { Link } from 'react-router-dom';
import Header from './components/header/Header';
import MainWorkout from './components/workouts/MainWorkout';
// import Chest from './components/workouts/chest/ChestWorkouts';
import ChestWorkouts from './components/workouts/chest/ChestWorkouts';
import Biceps from './components/workouts/biceps/Biceps';
import Shoulders from './components/workouts/shoulders/Shoulders';
import Hamstrings from './components/workouts/hamstrings/Hamstrings';
import MiddleBack from './components/workouts/mid-back/MiddleBack';
import Calves from './components/workouts/calves/Calves';
import Glutes1 from './components/workouts/glutes/Glutes1';
import Quadriceps from './components/workouts/quadriceps/Quadriceps';
import LowerBack from './components/workouts/lower back/LowerBack';
import Lats from './components/workouts/lats/Lats';
import Traps from './components/workouts/traps/Traps';
import Forearms from './components/workouts/forearms/Forearms';
import Triceps from './components/workouts/triceps/Triceps';
import Abdominals from './components/workouts/abs/Abdominals';
import CardioWorkouts from './components/cardio/CardioWorkouts.jsx';
import Bmi from './components/bmi/Bmi';
import { RecipesContext } from './context/Recipes';
import Recipes from './components/Recipes';
import MealPlanning from './components/MealPlanning';
import WorkoutDirectory from './components/workouts/WorkoutDirectory';
import AuthPopup from './components/workouts/authpopup/AuthPopup';
import Profile from './components/about/Profile';
import AiwithImage from './components/ai/AiwithImage';
import PythonML from './components/pythonwala/PythonML';
import AIChatbot from './components/ai/AIchatbot';

// import AiwithImage from './components/ai/AiwithImage';


const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  return (
    <BrowserRouter>
      <div className="flex h-[100vh] m-0 bg-gray-200">
        <Sidebar>
          <SidebarItem icon={<HomeIcon size={20} />} text="Home" alert linkTo="/" />
           <SidebarItem icon={<Bot size={20} />} text="AI" active linkTo="/workout"  />
          <SidebarItem icon={<Apple size={20} />} text="Diet" linkTo="/ai-diet" />
          <SidebarItem icon={<Weight size={20} />} text="Bmi calculator Tool" linkTo="/tools" />
          <SidebarItem icon={<Dumbbell size={20} />} text="Recommended Workouts" linkTo="/cardio" />
          <SidebarItem icon={<BookOpen size={20} />} text="Articles" alert linkTo="/articles" />
          <SidebarItem icon={<LogIn size={20} />} text="Sign In" linkTo='/login' /> 
       
        </Sidebar>
        <div className="flex-1 overflow-y-auto ">
          <Header/>
          
          <Routes>
            <Route path="/" element={<MainWorkout />} />
           
            <Route path="/login" element={<AuthPopup setShowPopup={setShowPopup} username={username} email={email} />} />


            <Route path="/ai-diet/*" element={<Ai />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/aiimg" element={<AiwithImage />} />
            <Route path="/aichat" element={<AIChatbot />} />
            <Route path="/cardio" element= {<CardioWorkouts/>}/>
           
            <Route path="/workout" element={<PythonML />} />
            <Route path="/workout/chest" element={<ChestWorkouts/>} />
            <Route path="/workout/biceps" element={<Biceps/>} />
            <Route path="/workout/shoulders" element={<Shoulders/>} />
            <Route path="/workout/hamstrings" element={<Hamstrings/>} />
            <Route path="/workout/mid-back" element={<MiddleBack/>} />
            <Route path="/workout/calves" element={<Calves/>} />
            <Route path="/workout/glutes" element={<Glutes1/>} />
            <Route path="/workout/quadriceps" element={<Quadriceps/>} />
            <Route path="/workout/lowerback" element={<LowerBack/>} />
            <Route path="/workout/lats" element={<Lats  />} />
            <Route path="/workout/traps" element={<Traps />} />
            <Route path="/workout/forearms" element={<Forearms />} />
            <Route path="/workout/triceps" element={<Triceps />} />
            <Route path="/workout/abs" element={<Abdominals />} />
            <Route path="/Recipes" element={<Recipes />} />
            <Route path="/Meal-planning" element={<MealPlanning />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
