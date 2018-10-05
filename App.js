//let blockHeights = { 1: 3 };


class App extends React.Component {
  constructor(props) {
    super(props);
    let i = 0;


    let blockHeights = {};

    this.state = {
      update: 0,
      inputData: '1,79,20,50',
      dataList: [],
      dataListCopy: '1,79,20,50',
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
    if (this.state.dataList != this.state.dataListCopy) {
      this.setState((state, props) => ({ dataListCopy: state.dataList }));
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
    }));//{  console.log("yolo")};

    //    this.setState({ dataList: numDataList }, this.sizeBoxes(numDataList));
    //    this.sizeBoxes(numDataList);



    console.log("dataList: " + this.dataList);


  }

  sizeBoxes(sizeArr) {
    if (!sizeArr) {
      sizeArr = this.state.dataList;
    }
    console.log("Zizeing: " + sizeArr);
    let height = {};

    sizeArr.forEach((item, index) => {
      let normalized = (((item - 1) / (100 - 1)) * 100) + 1;
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

  randomHashColors(str) {
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
      blockColorList[index] = (this.randomHashColors(String(item)))

    });
    console.log("blockList: " + blockColorList);
    console.log("RAW: " + this.randomHashColors(String(item)));
    this.setState((state, props) => ({
      blockColors: blockColorList
    }));

    this.setState((state, props) => ({
      update: state.update + 1
    }));

  }


  mergeSort() {
    console.log("Merge Sort");
      
      var unsortedArr = this.state.dataList;

function merge(leftArr, rightArr) {
var sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr[0]);
      leftArr = leftArr.slice(1)
   } else {
      sortedArr.push(rightArr[0]);
      rightArr = rightArr.slice(1)
     }
   }
  while (leftArr.length)
    sortedArr.push(leftArr.shift());
  while (rightArr.length)
    sortedArr.push(rightArr.shift());
  return sortedArr;
}
function mergesort(arr) {
  if (arr.length < 2) {
    return arr; }
  else {
    var midpoint = parseInt(arr.length / 2);
    var leftArr   = arr.slice(0, midpoint);
    var rightArr  = arr.slice(midpoint, arr.length);
    return merge(mergesort(leftArr), mergesort(rightArr));
  }
}
console.log('This should be the sorted array!')
console.log(mergesort(unsortedArr));
      this.setState((state, props) => ({
          dataList: mergesort(state.dataList)
      }));
      
  }

  quickSort() {
    console.log("Quick Sort");
      
      function sort(arr, left, right){
   var len = arr.length, 
   pivot,
   partitionIndex;


  if(left < right){
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);
    
   //sort left and right
   sort(arr, left, partitionIndex - 1);
   sort(arr, partitionIndex + 1, right);
  }
  return arr;
}
    
      
function partition(arr, pivot, left, right){
   var pivotValue = arr[pivot],
       partitionIndex = left;

   for(var i = left; i < right; i++){
    if(arr[i] < pivotValue){
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}
      
      function swap(arr, i, j){
   var temp = arr[i];
   arr[i] = arr[j];
   arr[j] = temp;
}
      let unsortedList = this.state.dataList;
      let left = unsortedList[0];
      let right = unsortedList[unsortedList.length-1];
      
      console.log("unsortedList: " + unsortedList);
      console.log("left: " + left);
      console.log("right: " + right);
      let sortedList = sort(unsortedList, left, right);
      console.log("Sorted Quick Sort Array: " + sortedList);
      this.setState((state, props) => ({
          dataList: sortedList
      }));
  }

  insertionSort() {
    console.log("Insertion Sort");

  }


  render(event) {
    //      this.setState({blockColors: blockColorsList})
    return (
      <div style={app} >
        <div style={{ display: 'flex', flexDirection: 'column' }} >
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

          <div style={sorting_options} >
            <button style={button} onClick={this.mergeSort.bind(this)}>Merge Sort</button>
            <button style={button} onClick={this.quickSort.bind(this)}>Quick Sort</button>
            <button style={button} onClick={this.insertionSort.bind(this)}> Insertion Sorting</button>
          </div>
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

const sorting_options = {
  display: 'flex',
  justifyContent: 'center',
  alighItems: 'center'
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
  alignItems: 'center',
  display: 'flex',
  flexGrow: 1,
}

const list_container = {
  display: 'flex',
  alignItems: 'center',

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
//Written by James Breedlove