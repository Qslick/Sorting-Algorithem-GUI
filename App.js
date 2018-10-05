//let blockHeights = { 1: 3 };
            

class App extends React.Component {
  constructor(props) {
    super(props);
    let i = 0;
      

    let blockHeights = {};

    this.state = {
        update:0,
      inputData: '1,79,20,50',
      dataList: [],
        dataListCopy:'1,79,20,50',
      result: 'default',
      blockHeights: {},
      blockColors: [],
    }

  }
    
      componentDidMount() {
console.log("Mounted");
  }
    
    componentWillUpdate(nextProps, nextState) {
  if (nextState.open == true && this.state.open == false) {
    this.props.onWillOpen();
  }
//        console.log("CACHE: " + this.state.dataListCopy);
        if(this.state.dataList != this.state.dataListCopy){
            this.setState((state, props) => ({dataListCopy: state.dataList}));
                    console.log("DATA HAS CANGED: " + this.state.dataListCopy);
this.updateGUI();
            this.sizeBoxes();
            this.forceUpdate();

        }
    }

  updateInput(event) {
      let inputText = event.target.value.toString();
//      console.log(inputText);
  
      this.setState((state, props) => ({
          inputData: inputText
      }));
      
//    this.setState({ inputData: event.target.value.toString() });
//      this.updateGUI();
//      this.sizeBoxes();
//      console.log("Colors: " + this.state.blockColors);
      
  }

  submitList(event) {
    let dataAsList = this.state.inputData.split(',');
    let numDataList = [];


    dataAsList.forEach((item, index) => {
      numDataList.push(Number(item));
        this.sizeBoxes(numDataList);
    });
        this.sizeBoxes(numDataList);



    this.dataList = numDataList;
      this.setState((state, props) => ({
          dataList: numDataList
      }) );//{  console.log("yolo")};
      
//    this.setState({ dataList: numDataList }, this.sizeBoxes(numDataList));
    //    this.sizeBoxes(numDataList);



    console.log("dataList: " + this.dataList);
            

  }

  sizeBoxes(sizeArr) {
      if(!sizeArr){
          sizeArr = this.state.dataList;
      }
        console.log("Zizeing: " + sizeArr);
    let height = {};

    sizeArr.forEach((item, index) => {
      let normalized = (((item - 1) / (100 - 1)) * 100)+1;
//      console.log("Normalized: " + normalized);
      height[index] = normalized;
    });
      this.setState((state, props) => ({
          blockHeights: height
      }));
//    this.setState({ blockHeights: height });
    this.blockHeights = height;
    //        console.log("Local Block Height: " + JSON.stringify(this.blockHeights)));
    console.log("updated block heights: " + this.state.blockHeights);
    //            this.setState({ state: this.state });
            

  }

  //    update(){
  //            this.forceUpdate();
  //
  //    }

  produceRandomList(NumElements) {
    NumElements = 10
    let randomList = [];
    for (let i = 0; i < NumElements; i++) {
      randomList.push(Math.floor(Math.random() * 100) + 1);
    }
    //        this.dataList = randomList;
    this.setState({ dataList: randomList });
    console.log(this.dataList);
    this.sizeBoxes(randomList);
            

  }

  produceSortedList() {
    let oldList = [1, 2, 3, 4, 5];
    let newList = [5, 1, 2, 3, 4];
    this.stringToColor(String(this.dataList));


    //        console.log("oldList" + oldList);
    //        console.log("newList" + newList);
    //        console.log("difference: " + JSON.stringify(differenceArray));

            

  }
    
randomHashColors(str){
    return this.stringToColor(this.stringToColor(String(str)));
}

  stringToColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    //    console.log("Color Value: " + colour);
    return colour;
  }

  updateGUI() {
    let blockColorList = [];

    this.state.dataList.forEach((item, index) => {
      blockColorList[index] = (this.randomHashColors( String(item)))

    });
    console.log("blockList: " + blockColorList);
    console.log("RAW: " + this.randomHashColors(String(item)));
      this.setState((state, props) => ({
          blockColors: blockColorList
      }));
      
         this.setState((state, props) => ({
          update: state.update+1
      }));
      
            

//    this.setState({ blockColors: blockColorList });
  }


  render(event) {
    //      this.setState({blockColors: blockColorsList})
    return (
      <div style={app} >

        <div style={list_container} id="list_to_sort">
          <h2>{this.state.dataList}</h2>
          <ul style={list}>
            {this.state.dataList.map((num, index) => {
              return <div key={index} style={{ height: this.state.blockHeights[index], backgroundColor: this.state.blockColors[index], margin: 15 }}>
                <div style={blocks}>
                  <div style={{}}>
                    <li style={item}>{num}</li>
                  </div>

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
  width: '60%',
  height: '90%',
//  background: 'blue',
  textAlign: 'center',
  fontFamily: 'arial',
  fontWeight: 'bold',
  fontSize: '14pt',

  margin: 15,
  //  padding: 15,
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
      alignItems: 'center',
  flexGrow: 1,
  padding: '15px',
  mrgin: '15px',
  //  color: '#ff00ff'
};



const domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);