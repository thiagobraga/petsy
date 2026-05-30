import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { APPOINTMENTS, EXAMS, petById } from '../data';
import { TabBar, MiniCalendar, PetAvatar, Tag } from '../components';

const T = TOKENS;
const Ic = I;

export function AppointmentsScreen() {
  const [tab, setTab] = React.useState('appt');
  const [seg, setSeg] = React.useState('consultas');
  const [day, setDay] = React.useState(14);
