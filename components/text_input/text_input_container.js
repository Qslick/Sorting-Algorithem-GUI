'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
      
      this.state = {
          inputData: '1234',
          result: 'default',
      }
      
  }
    
    updateInput(event){
        this.setState({inputData: event.target.value.toString()});
        console.log(event.target.value);
    }
    
    submitList(){
//        this.setState({result: this.state.inputData});
        setState({result: 'hey'});
        console.log("Button Pressed!")
    }
    

  render(event) {
    if (this.state.liked) {
      return 'You liked this.';
    }
      
    return (
        <div>
        
        <input type="text" 
        value={this.state.inputData} 
        onChange={this.updateInput.bind(this)}
        ></input>
        
        <button onClick={this.submitList}>
                         Go
                         </button>
        
        <text>
            {this.state.result}
            </text>
    
    </div>
    );
  }
}

const domContainer = document.querySelector('#text_input_container');
ReactDOM.render(e(LikeButton), domContainer);