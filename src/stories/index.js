import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import DefaultDemo from './DefaultDemo'

const items = [
  'item 1',
  'item 2',
  'item 3',
  'item 4',
  'item 5',
  'item 6',
]

const Presentation = () =>(

    <DefaultDemo  items={items}/>

);

storiesOf('Welcome', module).add('DefaultDemo', () => <Presentation />);

