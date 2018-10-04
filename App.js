let blockHeights = {1:3};

class App extends React.Component {
  constructor(props) {
    super(props);
      let i = 0;
let blockHeights = {};

    this.state = {
      inputData: '1,79,20,50',
      dataList: [],
      result: 'default',
      blockHeights: {}
    }

  }

  updateInput(event) {
    this.setState({ inputData: event.target.value.toString() });
    //    console.log(event.target.value);
  }

  submitList(event) {
    let dataAsList = this.state.inputData.split(',');
    let numDataList = [];
  
     
    dataAsList.forEach((item, index) => {
      numDataList.push(Number(item));
    });
      


    this.dataList = numDataList;
    this.setState({ dataList: numDataList },  this.sizeBoxes(numDataList) );
//    this.sizeBoxes(numDataList);

      
      
    console.log("dataList: " + this.dataList);
  }
    
    sizeBoxes(){
        console.log("Zizeing: " + this.state.blockHeights);
         let height = {};
        
    this.state.dataList.forEach((item, index) => {
      let normalized = ((item - 1) / (100 - 1)) * 100;
      console.log("Normalized: " + normalized);
      height[index] = normalized;
    });
    this.setState({ blockHeights: height });
        this.blockHeights = height;
//        console.log("Local Block Height: " + JSON.stringify(this.blockHeights)));
    console.log("updated block heights: " + this.state.blockHeights);
//            this.setState({ state: this.state });
    }
    
//    update(){
//            this.forceUpdate();
//
//    }
    
    produceRandomList(NumElements){
        NumElements = 10
        let randomList = [];
        for(let i = 0; i < NumElements; i++){
            randomList.push(Math.floor(Math.random() * 100)+1);
        }
//        this.dataList = randomList;
        this.setState({dataList: randomList});
        console.log(this.dataList);
        this.sizeBoxes();
    }
    
    produceSortedList(){
                this.forceUpdate();
               this.setState({ state: this.state });

        console.log("work" + JSON.stringify(this.state));
        console.log("BH: " + JSON.stringify(this.blockHeights));

    }
    

  render(event) {
    return (
      <div style={app} >

        <div style={list_container} id="list_to_sort">
          <h2>{this.state.dataList}</h2>
          <ul style={list}>
            {this.state.dataList.map((num, index) => {
              return <div key={index} style={{ height: this.state.blockHeights[index] }}>
                <div style={blocks}>
                  <li style={item}>{num}</li>
                </div>
              </div>
            })}
          </ul>
        </div>


        <div id="input">
            
<button style={button} onClick={this.produceRandomList.bind(this)}>Random</button>
            <button style={button} onClick={this.produceSortedList.bind(this)}>Sorted</button>
            
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

const input = {
    display: 'inline'
}

const button = {
    width: 60,
    height: 40,
    margin: 5,
    backgroundColor: 'orange',
}

const app = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const blocks = {
  width: '40%',
  height: '90%',
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