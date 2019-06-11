import React, { Component } from 'react';
import '../style.css';
import { connect } from 'react-redux'
import { requestFetchAction } from '../actions'
import ResultProduk from './filter'
import Back from './back'

class HeaderFilter extends Component {
  constructor(props){
    super(props)
    this.state={
        suggestions:[],
        text:'',
        result:[],
        loading:false
    }
}
 componentDidMount(){
  document.title="Sebuah Channel | Search"
  this.props.requestFetchAction();
  this.refs.boxfilter.focus();
}
 onTextKeyPress=(e)=>{
  if(e.keyCode === 13){
   const items=this.props.reducer.data;
   const value=e.target.value;
   let result=[];
   this.setState({suggestions:[],loading:true});
   if(value.length>0){
     result=items.filter(v=>v.nama.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
 }
 setTimeout(() => {this.setState(()=>({text:'',result,loading:false}));}, 3000);
}
}  
 /* onTextaksi=(e)=>{
  var items=this.props.reducer.data;
  var value=e.target.value;
  let suggestions=[];
  let result=[];
  switch (e.keyCode) {
    //keypress
    case 13:
    if(value.length>0){
      result=items.filter(v=>v.nama.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
  }
  this.setState(()=>({text:value,suggestions:[],result}));
      break;
      //keyup
    case 38:
    if(value.length>0){
        suggestions=items.filter(v=>v.nama.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
    }
    this.setState(()=>({suggestions,text:value}));
      break;
      default:
  }
}  */
onTextChanged=(e)=>{
  const items=this.props.reducer.data;
  const value=e.target.value;
  let suggestions=[];
  if(value.length>0){
      suggestions=items.filter(v=>v.nama.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
  }
  this.setState(()=>({suggestions,text:value}));
}
suggestionSelected(value){
  const items=this.props.reducer.data;
  let result=[];
  this.setState({suggestions:[],loading:true});
  if(value.length>0){
    result=items.filter(v=>v.nama.toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1);
}
setTimeout(() => {this.setState(()=>({text:'',result,loading:false}));}, 3000);
}
renderSuggestions(){
  const {suggestions}=this.state;
  if(suggestions.length===0){
      return null;
  }
  return(
      <ul>
          {suggestions.map((item)=><li key={item.id} onClick={()=>this.suggestionSelected(item.nama)}>{item.nama}</li>)}
      </ul>
  );
}
  render() {
    const {text,result}=this.state;
    return (
      <div>
      <div className="Header"> 
      <div className="Obj-Bottom">
      <Back/>
      <div className="SearchButton">
      <div className="search">
       <div className="box">
            <span><i className="fas fa-search"></i></span>
            <input ref="boxfilter" value={text} onChange={this.onTextChanged} onKeyDown={this.onTextKeyPress} type="text" placeholder="Ketik nama produk di sini....."/>
       </div>
       <div className="listsearch">
       {this.renderSuggestions()}
      </div>
      </div>
      </div>
      </div>
      </div>
      {this.state.loading?<div className="loader"></div>:
      <ResultProduk items={result}/>
    }
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    reducer:state.reducer
  }
}
function mapDispatchToProps (dispatch) {
  return {
    requestFetchAction: () => dispatch(requestFetchAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFilter)
