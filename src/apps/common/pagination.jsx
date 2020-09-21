import PropTypes from 'prop-types'
import React, { Component } from 'react'

class PaginatedTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cols: props.cols,
      rows: props.rows,
      search: "",
      page: [],
      currentIndex: 0,
      totalPages: 0,
      defaultPageSize: 10,
      canFirst: false,
      canPrev: false,
      canNext: false,
      canLast: false,
    }
  }

  componentDidUpdate(nextProps) {
    const rowCount = this.props.rows.length
    const { defaultPageSize } = this.state
    if (nextProps.rows !== this.props.rows) {
      this.setState({
        rows: this.props.rows,
        page: this.props.rows.slice(0, defaultPageSize),
        totalPages: Math.ceil(rowCount / defaultPageSize),
        currentIndex: 0,
        canFirst: false,
        canPrev: false,
        canNext: rowCount > defaultPageSize,
        canLast: rowCount > defaultPageSize
      })
    }
  }

  onChange = (e) => {
    const { rows } = this.state
    const rowCount = rows.length
    var defaultPageSize = parseInt(e.target.value);
    this.setState({
      page: rows.slice(0, defaultPageSize),
      totalPages: Math.ceil(rowCount / defaultPageSize),
      defaultPageSize: defaultPageSize,
      currentIndex: 0,
      canFirst: false,
      canPrev: false,
      canNext: rowCount > defaultPageSize,
      canLast: rowCount > defaultPageSize
    })
  }

  onFirst = () => {
    const { rows, defaultPageSize } = this.state
    const rowCount = rows.length
    this.setState({
      page: rows.slice(0, defaultPageSize),
      currentIndex: 0,
      canFirst: false,
      canPrev: false,
      canNext: rowCount > defaultPageSize,
      canLast: rowCount > defaultPageSize
    })
  }

  onPrev = () => {
    const { rows, defaultPageSize, currentIndex } = this.state
    const rowCount = rows.length
    var index = currentIndex - 1
    this.setState({
      page: rows.slice(index * defaultPageSize, index * defaultPageSize + defaultPageSize),
      currentIndex: index,
      canFirst: index > 0,
      canPrev: index > 0,
      canNext: rowCount > index * defaultPageSize + defaultPageSize,
      canLast: rowCount > index * defaultPageSize + defaultPageSize,
    })
  }

  onNext = () => {
    const { rows, defaultPageSize, currentIndex } = this.state
    const rowCount = rows.length
    var index = currentIndex + 1
    this.setState({
      page: rows.slice(index * defaultPageSize, index * defaultPageSize + defaultPageSize),
      currentIndex: index,
      canFirst: index > 0,
      canPrev: index > 0,
      canNext: rowCount > index * defaultPageSize + defaultPageSize,
      canLast: rowCount > index * defaultPageSize + defaultPageSize,
    })
  }

  onLast = () => {
    const { rows, defaultPageSize, totalPages } = this.state
    const rowCount = rows.length
    var index = totalPages - 1
    this.setState({
      page: rows.slice(index * defaultPageSize, index * defaultPageSize + defaultPageSize),
      currentIndex: index,
      canFirst: index > 0,
      canPrev: index > 0,
      canNext: rowCount > index * defaultPageSize + defaultPageSize,
      canLast: rowCount > index * defaultPageSize + defaultPageSize,
    })
  }

  onSearch = (e) => {
    this.setState({ search: e.target.value })

    const { defaultPageSize } = this.state
    var searchVal = (e.target.value).toLowerCase();
    var result = this.props.rows.filter(row => {
      var json = JSON.stringify(row)
      return json.toLocaleLowerCase().includes(searchVal)
    })
    const rowCount = result.length
    this.setState({
      rows: result,
      page: result.slice(0, defaultPageSize),
      totalPages: Math.ceil(rowCount / defaultPageSize) || 1,
      currentIndex: 0,
      canFirst: false,
      canPrev: false,
      canNext: rowCount > defaultPageSize,
      canLast: rowCount > defaultPageSize
    })
  }

  render() {
    const { cols } = this.props
    const { page, search, defaultPageSize, currentIndex, totalPages,
      canFirst, canPrev, canNext, canLast } = this.state
    return (
      <div>
        <table className="table table-sm table-responsive-md">
          <thead>
            <tr>
              {cols.map((col, index) => <th key={index}>{col.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {page.map((item, index) =>
              <tr key={index}>
                {cols.map((col, key) => <td key={key}>{col.render(item)}</td>)}
              </tr>
            )}
          </tbody>
        </table>
        <div className="row col-12 mx-auto">
          <div className="form-group col-md-6 col-lg-4">
            <input type="text" className="form-control form-control-sm" value={search} onChange={this.onSearch} />
            <label>Search...</label>
          </div>
          <div className="form-group col-md-6 col-lg-8">
            <span>Showing: Page <b>{currentIndex + 1} </b> of <b>{totalPages}</b></span>
            <b className="pagination-buttons ml-4">
              <button disabled={!canFirst} onClick={this.onFirst}>{`<<`}</button>
              <button disabled={!canPrev} onClick={this.onPrev}>{`<`}</button>
              <button disabled={!canNext} onClick={this.onNext}>{`>`}</button>
              <button disabled={!canLast} onClick={this.onLast}>{`>>`}</button>
            </b>
            <select className="form-control form-control-sm col-4 d-inline ml-3 p-0"
              value={defaultPageSize}
              name="defaultPageSize"
              onChange={this.onChange}>
              <option value="1">1 records per page</option>
              <option value="5">5 records per page</option>
              <option value="10">10 records per page</option>
              <option value="20">20 records per page</option>
              <option value="50">50 records per page</option>
              <option value="100">100 records per page</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}


PaginatedTable.propTypes = {
  cols: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  bordered: PropTypes.bool,
  hoverable: PropTypes.bool,
  striped: PropTypes.bool,
  isDark: PropTypes.bool,
}

export default PaginatedTable;