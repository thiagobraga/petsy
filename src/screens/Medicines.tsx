import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { PETS, MEDS, petById } from '../data';
import {IconCircle, PetAvatar, Tag, TabBar} from '../components';

const T = TOKENS;
const Ic = I;

export function MedicinesScreen({ petFilter = 'all' }) {
  const [tab, setTab] = React.useState('meds');
  const [active, setActive] = React.useState(petFilter);
  const [checked, setChecked] = React.useState({ m1: true, m3: false });
