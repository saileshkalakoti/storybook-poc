import React from 'react';

import Checkboxdropdown from '../../components/Checkboxdropdown/Checkboxdropdown';

export default {
  title: 'Custom/Checkboxdropdown',
  component: Checkboxdropdown,
  argTypes: {
    text: {control: 'text'},
    options: {control: 'object'}
  },
};

const Template = (args) => <div style={{width: "240px"}}><Checkboxdropdown {...args} /></div>;

export const Primary = Template.bind({});
Primary.args = {
  options: ["option A", "option B", "option C", "option D"]
}
