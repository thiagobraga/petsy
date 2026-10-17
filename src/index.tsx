import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'wouter';
import './index.css';
import { TOKENS } from './tokens';
import { I } from './icons';
import { PETS, MEDS, APPOINTMENTS, EXAMS, DIARY, MEDIA, petById } from './data';
import { Button, Input, Checkbox, Tag, Card, PetAvatar, PetsyMark, PlaceholderImage, IconCircle, SectionHeader, TabBar, StatusBar, MiniCalendar } from './components';
import { LoginScreen } from './screens/Login';
import { DashboardScreen } from './screens/Dashboard';
import { PetDetailScreen } from './screens/PetDetail';
import { MedicinesScreen } from './screens/Medicines';
import { AppointmentsScreen } from './screens/Appointments';
import { DiaryScreen } from './screens/Diary';
import { MediaScreen } from './screens/Media';
import { UIKitScreen } from './screens/UIKit';
import { App } from './App';

(window as any).TOKENS = TOKENS;
(window as any).I = I;
(window as any).PETS = PETS;
(window as any).MEDS = MEDS;
(window as any).APPOINTMENTS = APPOINTMENTS;
(window as any).EXAMS = EXAMS;
(window as any).DIARY = DIARY;
(window as any).MEDIA = MEDIA;
(window as any).petById = petById;
(window as any).Button = Button;
(window as any).Input = Input;
(window as any).Checkbox = Checkbox;
(window as any).Tag = Tag;
(window as any).Card = Card;
(window as any).PetAvatar = PetAvatar;
(window as any).PetsyMark = PetsyMark;
(window as any).PlaceholderImage = PlaceholderImage;
(window as any).IconCircle = IconCircle;
(window as any).SectionHeader = SectionHeader;
(window as any).TabBar = TabBar;
(window as any).StatusBar = StatusBar;
(window as any).MiniCalendar = MiniCalendar;
(window as any).LoginScreen = LoginScreen;
(window as any).DashboardScreen = DashboardScreen;
(window as any).PetDetailScreen = PetDetailScreen;
(window as any).MedicinesScreen = MedicinesScreen;
(window as any).AppointmentsScreen = AppointmentsScreen;
(window as any).DiaryScreen = DiaryScreen;
(window as any).MediaScreen = MediaScreen;
(window as any).UIKitScreen = UIKitScreen;
(window as any).PetsyFonts = window.PetsyFonts;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
