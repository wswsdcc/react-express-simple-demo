import React from 'react'

class ShowMsg extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='show-msg'>
        {this.props.username}: {this.props.data}
      </div>
    )
  }
}

export default ShowMsg