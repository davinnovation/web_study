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
    rows: [
        ClsRow({
            key: "0",
            name: "test_image",
            label: [0, 1],
            onRowClick: (id: string) => { console.log(id) }
        }),
        ClsRow({
            key: "1",
            name: "test_image1",
            label: [],
            onRowClick: (id: string) => { console.log(id) }
        }),
        ClsRow({
            key: "2",
            name: "test_image2",
            label: [0],
            onRowClick: (id: string) => { console.log(id) }
        })
    ]
}