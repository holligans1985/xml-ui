import React from 'react';
import {Table} from 'antd'
import styled from 'styled-components';
import {TableProps} from 'antd/es/table';

const TableWrapper = styled.div`
    .editable-cell {
        position: relative;
    }
    .editable-cell-value-wrap {
        padding: 5px 12px;
        cursor: pointer;
        position: relative;
    }
    .editable-row:hover .editable-cell-value-wrap {
        padding: 4px 11px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        position: relative;
    }
    [data-theme='dark'] .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #434343;
    }
`;




const AntdTable =<T extends {id:number}>(props: TableProps<T>) => {
    const defaultProps = {bordered: true,rowKey: 'id'};

    return (<TableWrapper><Table {...{ ...defaultProps, ...props }} /></TableWrapper>);
}

   


export default AntdTable;

