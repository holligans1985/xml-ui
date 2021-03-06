import React,{useState, useRef,useEffect,useContext} from 'react';
import {Form, Input} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';

interface EditableCellProps<T> {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof T;
    record: T;
    handleSave: (record: T) => void;
    formEditableContext: React.Context<FormInstance<any> | null> //added to make the compoment reusable
  }


const AntdEditableCell = <T extends {id:number}>({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    formEditableContext,
    ...restProps
  }:EditableCellProps<T>) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(formEditableContext)!;
  
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
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

  export default AntdEditableCell;