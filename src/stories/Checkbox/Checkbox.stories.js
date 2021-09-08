import React from 'react';

import CheckBox from './../../components/CheckBox/CheckBox';

export default {
  title: 'Custom/CheckBox',
  component: CheckBox,
  argTypes: {
    isChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => <CheckBox {...args} />;

export const Primary = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  isChecked: true,
  disabled: true
};