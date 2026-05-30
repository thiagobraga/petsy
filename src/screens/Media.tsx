import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { PETS, MEDIA, petById } from '../data';
import {IconCircle, PetAvatar, PlaceholderImage, TabBar} from '../components';

const T = TOKENS;
const Ic = I;

export function MediaScreen() {
  const [tab, setTab] = React.useState('media');
  const [view, setView] = React.useState('grid');
  const [petFilter, setPetFilter] = React.useState('all');
  const list = MEDIA.filter((m) => petFilter === 'all' || m.petId === petFilter);
