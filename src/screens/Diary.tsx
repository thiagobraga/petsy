import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { PETS, DIARY, petById } from '../data';
import {PetAvatar, PlaceholderImage, TabBar} from '../components';

const T = TOKENS;
const Ic = I;

export function DiaryScreen() {
  const [tab, setTab] = React.useState('diary');
  const [activePet, setActivePet] = React.useState('all');
  const list = DIARY.filter((d) => activePet === 'all' || d.petId === activePet);
