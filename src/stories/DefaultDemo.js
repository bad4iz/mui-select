import React from 'react';

import Select from "../components/Select";

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100wh',
  height: '160vh',
  top: '400px'
}

export default class DefaultDemo extends React.Component {
  state = {
    value: "546616"
  }

  onChoseItem = items => {
    let it = items.join(', ')
    if (it.length > 20){
      it = it.slice(0, 18) + '...'
    }
    this.setState({
      value: it,
    })
  }

  render() {
    const { items } =this.props;
    const { value } = this.state;
    return (
      <div style={style}>
        <Select items={items} value={value} onChange={this.onChoseItem}/>
      </div>
    );
  }

}