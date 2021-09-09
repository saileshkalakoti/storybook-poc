import React from 'react';

import Input from '../../components/Input/Input';

export default {
  title: 'Custom/Input',
  component: Input,
  argTypes: {
    type: {
        options: ['date', 'text', 'number', 'file'],
        control: 'select'
    }
  },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Enter your first name',
    label: 'Name ',
    type: 'text',
    onChange: () => {},
};
