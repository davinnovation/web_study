import { ComponentStory, ComponentMeta } from '@storybook/react';
import ClsImageTable from '../components/ClsImageTable';

export default {
    component: ClsImageTable,
    title: 'components/ClsImageTalbe',
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => <ClsImageTable {...args} />;

export const Default = Template.bind({});