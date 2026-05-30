import React from 'react';
import { TOKENS } from '../tokens';
import { I } from '../icons';
import { PETS } from '../data';
import {Button, Input, Checkbox, Tag, IconCircle, PetAvatar, TabBar, MiniCalendar,PetsyMark} from '../components';

const T = TOKENS;
const Ic = I;

export function UIKitScreen() {
  return (
    <div
      className="petsy"
      data-screen-label="08 · UI Kit"
      style={{
        width: 1180,
        padding: 40,
        background: T.bg,