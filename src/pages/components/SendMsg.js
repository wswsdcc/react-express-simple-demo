import React from 'react'

class SendMsg extends React.Component {
  constructor(props) {
    super(props);
    this.handleChanged = this.handleChanged.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };
  handleChanged(e) {
    this.props.onChanged(e.target.value)
  }
  handleClick(e) {
    this.props.onClicked()
  }
  render() {
    return (
      <div className='send-msg'>
        <input type="text" onChange={this.handleChanged} />
        <button onClick={this.handleClick}>send</button>
      </div>
    )
  }
}

export default SendMsg