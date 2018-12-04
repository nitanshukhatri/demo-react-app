import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort = path => {
        const { columns } = this.props;
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }
    render() {
        return (<thead>
            <tr>
                {this.props.columns.map(col => <th onClick={() => this.raiseSort(col.path)}>{col.label || col.key}</th>)}
            </tr>
        </thead>);
    }
}

export default TableHeader;
