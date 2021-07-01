import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import AntdTable from '../../components/AntdTable';
import { Button,Space } from "antd";
import { PublisherType } from '../../types';
import providersData from '../../data/xml_providers.json'


interface Props {
    title: string,
}

const XmlList : React.FC<Props> = ({title = ''}) => {
    const provider: PublisherType[] = providersData.data;
    const [loading, setLoading] = useState(false);

    const columnsConfig = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'Create at',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Updated at',
            dataIndex: 'editedAt',
            key: 'editedAt',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text:string, record:PublisherType) => (
            <Space size="middle">
                <Link to={{ 
                    pathname: `/xml_list/${record.id}`, 
                    state: { campaignId: record.id }
                }}>
                    <Button>Adjust CPC</Button>
                </Link>
                <Button>Delete</Button>
            </Space>
            ),
        }
    ];

    return (
        <div>
            <h1>{title}</h1>
            <AntdTable<PublisherType> dataSource={provider} loading={loading} columns={columnsConfig}/>
        </div>
    )
};

export default XmlList;

