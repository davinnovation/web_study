import { ComponentStory, ComponentMeta } from '@storybook/react';
import ClsRow from '../components/ClsTable/ClsRow';

export default {
    component: ClsRow,
    title: 'components/ClsRow',
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => <ClsRow {...args} />;

export const Default = Template.bind({});
Default.args = {
    key: "0",
    name: "test_image",
    label: [0, 1]
}