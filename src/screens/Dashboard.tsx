import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { PETS, MEDS, petById } from '../data';
import { PetAvatar, SectionHeader, PetsyMark, IconCircle, TabBar, Tag } from '../components';

const T = TOKENS;
const Ic = I;

export function DashboardScreen() {
  const [tab, setTab] = React.useState('home');
  const [activePet, setActivePet] = React.useState('luna');
