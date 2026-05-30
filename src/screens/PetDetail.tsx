import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { petById, MEDS, APPOINTMENTS, EXAMS } from '../data';
import {PetsyMark, PetAvatar, Tag, IconCircle} from '../components';

const T = TOKENS;
const Ic = I;

export function PetDetailScreen({ petId = 'luna' }) {
  const pet = petById(petId);
  const [section, setSection] = React.useState('about');
