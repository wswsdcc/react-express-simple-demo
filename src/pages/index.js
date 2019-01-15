import React from 'react'
import ShowMsg from './components/ShowMsg'
import SendMsg from './components/SendMsg'

const socket = require('socket.io-client')('http://localhost:8080');

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      msgs: []
    };
    this.handleChanged = this.handleChanged.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    var that = this;
    socket.on('connect', function () {
      socket.emit('addme', prompt('Who are you?'));
    });
    socket.on('chat', function (username, data) {
      console.log("client " + username + " listen on chat");
      var msg = {"username":username,"data":data};
      var oldMsgs = that.state.msgs;
      that.setState({msgs: [...oldMsgs, msg]});
    });
  }
  handleChanged(value) {
    this.setState({text: value});
  }
  handleClick() {
    socket.emit('sendchat', this.state.text);
  }
  render() {
    var msgList = this.state.msgs.map((item,key) => {
      return (
        <ShowMsg username={item.username} data={item.data}/>
      )
    })
    return (
      <div className='chat-room'>
        {msgList} 
        <SendMsg onClicked={this.handleClick} onChanged={this.handleChanged}/>
      </div>
    )
  }
}

export default ChatRoom