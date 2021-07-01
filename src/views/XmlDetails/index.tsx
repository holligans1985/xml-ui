import React,{ useState, useRef,useEffect,useContext } from 'react';
import {Form, Input, Button} from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import AntdTable from '../../components/AntdTable';
import campaignData from '../../data/xml_122.json';
import {PublisherType, CompanyType} from '../../types';
import { FormInstance } from 'antd/lib/form';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Props {
    title:string
};

const columnsConfig = [
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'CPC',
    dataIndex: 'cpc',
    key: 'cpc',
    editable: true,
    width: '100px'
  },
];

interface EditableRowProps {
    index: number;
};

const AntdEditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };


interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof CompanyType;
    record: CompanyType;
    handleSave: (record: CompanyType ) => void;
  }

  const AntdEditableCell:React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext)!;
  
    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
  
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex as NamePath}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{width:"100%"}}/>
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };


const XMLDetails:React.FC<Props> = ({title}) =>  {
    const [dynamicDataSource, setDynamicDataSource] = useState<CompanyType[] | []>(campaignData.dynamic);
    const [genericDataSource, setGenericDataSource] = useState<CompanyType[] | []>(campaignData.generic);
    const campaignInfo : PublisherType = campaignData.campaign;

    const handleSave = (row:CompanyType) => {
        const newData = [...dynamicDataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDynamicDataSource( newData );
    };

    const columns = columnsConfig.map(col => {
        if(!col.editable){
            return col;
        }
        return {
            ...col,
            onCell:(record:CompanyType) => ({
                record, 
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            })
        }
    });

    const components = {
        body: {
          row: AntdEditableRow,
          cell: AntdEditableCell,
        }
    };
    return (
        <div>
            <h1>{title}</h1>
            <div style={{display:"flex"}}>
                <h2>Campaign Name: {campaignInfo.name}</h2>
                <h2>{campaignInfo.publisher}</h2>
            </div>
            <br/>
            <h3>Dynamic Jobs</h3>
            <AntdTable 
                components={components}
                rowClassName={() => 'editable-row'}
                loading={false} 
                dataSource={dynamicDataSource} 
                columns={columns}
            />
            <br/>
            <div style={{textAlign: 'right'}}><Button type="primary" size="large">Apply changes</Button></div>
        </div>
    )
}

export default XMLDetails