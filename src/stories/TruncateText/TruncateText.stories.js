import React from 'react';

import TruncateText from '../../components/TruncateText/TruncateText';

export default {
  title: 'Custom/TruncateText',
  component: TruncateText,
  argTypes: {
    text: {control: 'text'}
  },
};

const Template = (args) => <TruncateText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "hey man",
  maxWidth: "40px",
  maxLine: 2,
};
