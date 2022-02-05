import { ComponentStory, ComponentMeta } from '@storybook/react';
import ClsImageTable from '../components/ClsTable/ClsImageTable';
import ClsRow from '../components/ClsTable/ClsRow';

export default {
    component: ClsImageTable,
    title: 'components/ClsImageTable',
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args) => <ClsImageTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    tableHeight: "100%",
    tableWidth: "100%",
    rows: Array(50).fill(0).map((_, i) => ClsRow({
        key: i.toString(),
        name: i.toString(),
        label: [0, 1],
        onRowClick: (id: string) => { console.log(id) }
    }))
}