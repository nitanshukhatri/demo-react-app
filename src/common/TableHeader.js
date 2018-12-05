import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort = path => {

        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = (column) => {
        if (column.path !== this.props.sortColumn.path) return null;
        if (this.props.sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc" />;
    }

    render() {
        return (<thead>
            <tr>
                {this.props.columns.map(col =>
                    <th className="clickable" key={col.path || col.key} onClick={() => this.raiseSort(col.path)}>
                        {col.label || col.key} {this.renderSortIcon(col)}
                    </th>)}
            </tr>
        </thead>);
    }
}

export default TableHeader;
