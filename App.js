
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: '1,79,20,50',
      dataList: [],
      result: 'default',
        blockHeights: {        }
    }

  }

  updateInput(event) {
    this.setState({ inputData: event.target.value.toString() });
    console.log(event.target.value);
  }

  submitList(event) {
    let dataAsList = this.state.inputData.split(',');
    let numDataList = [];
    let blockHeights = {};

    dataAsList.forEach((item, index) => {
             let normalized = ((Number(item) - 1) / (100 - 1))*100;
console.log("Normalized: " + normalized);
        blockHeights[index] = Number(normalized);
      numDataList.push(Number(item));
    });
      this.setState({blockHeights: blockHeights});
      console.log(this.state.blockHeights);

    this.dataList = numDataList;
    this.setState({ dataList: numDataList });
    

    console.log("dataList: " + this.dataList);
  }

  render(event) {
    return (
      <div style={app} >
            
        <div style={list_container} id="list_to_sort">
          <h2>{this.state.dataList}</h2>
          <ul style={list}>
            {this.state.dataList.map((num, index) => {
              return <div key={index} style={{height: this.state.blockHeights[index]}}>
                  <div style={blocks}>
                <li style={item}>{num}</li>
                  </div>
              </div>
            })}
          </ul>
        </div>
            
            
        <div id="textInput">
          <input type="text2"
            value={this.state.inputData}
            onChange={this.updateInput.bind(this)}
          ></input>
          <button onClick={this.submitList.bind(this)}>Update List</button>
        </div>
      </div>
    );
  }
}

const app = {
display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}



const blocks = {
    width: '40%',
    height:'90%',
  background: 'blue',
  textAlign: 'center',
    fontFamily: 'arial',
        fontWeight: 'bold',
    fontSize: '14pt',

  margin: 15,
  padding: 15,
  display: 'flex',
    flexGrow: 1,
    
  listStyleType: 'none',

}

const item = {
      textAlign: 'center',

  display: 'flex',
    flexGrow: 1,
}

const list_container = {
  display: 'flex',
  justifyContent: 'space-around'
}

const list = {
  display: 'flex',
    flexGrow: 1,
  padding: '15px',
  mrgin: '15px',
  //  color: '#ff00ff'
};



const domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);