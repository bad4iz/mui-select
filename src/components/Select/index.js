import React from 'react';

import ArrowIcon from './ArrowIcon';
import './style.css'
import ValueComponent from './DefaultValueComponent'

class Select extends React.Component {

  static defaultProps = {
    valueComponent: ValueComponent,
    items: [],
    onChange: () => {},
    multimple: true,
  }

  state = {
    itemContainerBox: {},
    opened: false,
    selected: []
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setItemsContainerBox )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setItemsContainerBox )
  }

  getItemsContainerBox = () => {
    if (!this.rootElement || !this.itemContainerElement) {
      return;
    }
    const rootElementBoundery = this.rootElement.getBoundingClientRect();
    const itemsContainerElementBoundery = this.itemContainerElement.getBoundingClientRect();
    const left = rootElementBoundery.left;
    const bottom = rootElementBoundery.top + this.itemContainerElement.offsetHeight;

    const top = bottom >= window.innerHeight
      ? rootElementBoundery.bottom - this.itemContainerElement.offsetHeight
      : rootElementBoundery.top;
    return {
      width: `${this.rootElement.offsetWidth}px`,
      left: `${left}px`,
      top: `${top}px`,
    }
  }

  setItemsContainerBox = () => {
    const itemContainerBox = this.getItemsContainerBox();
    this.setState({itemContainerBox})
  }

  select = item => {
    const hasSelected = this.state.selected.includes(item)
    this.setState(state => ({
      selected:hasSelected ? state.selected.filter(i=> i !== item) : [...state.selected, item]
    }))
  }

  onItemChose = item => event => {
    if (this.props.multimple){
      event.preventDefault();
      event.stopPropagation();
      this.select(item);
    } else {
      this.props.onChange(item)
    }
  }

  isActive = item => {
    if (this.props.multimple){
      return this.state.selected.includes(item)
    }
    return item === this.props.value;
  }

  renderItemsContainer = () => (
    <div className="mui-select-items-container-wrapper" onClick={this.closeItemContainer}>
      <div className="mui-select-items-container" ref={itemContainer => {
        this.itemContainerElement = itemContainer
      }}
           style={this.state.itemContainerBox}
      >
        <ul className="mui-select-items-list">
          {
            this.props.items.map((item, idx )=> (
            <li key={idx}
                className={`mui-select-list-items ${this.isActive(item) ? 'active' : ''}`}
                onClick={this.onItemChose(item)}
            >{item}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )

  closeItemContainer = () => {
    this.setState({
      opened: false
    })
    if(this.props.multimple){
      this.props.onChange(this.state.selected);
    }
  }

  openItemContainer = () => {
    console.log(this.getItemsContainerBox());
    this.setState((state) => ({
      opened: true
    }), this.setItemsContainerBox)
  }

  onClickHandler = () => {
    this.setState({
      opened: !this.state.opened
    })
    console.log(this.state.opened);
  }

  render() {
    const {style, value, valueComponent} = this.props;
    const {opened} = this.state;
    return (
      <React.Fragment>
        <div className="mui-select-root" style={style} ref={root => {
          this.rootElement = root
        }}
             onClick={this.openItemContainer}
        >
          <div className="mui-select-value">
            <ValueComponent value={value}/>
          </div>
          <button className="mui-select-button">
            <ArrowIcon/>
          </button>
        </div>
        {opened && this.renderItemsContainer()}
      </React.Fragment>
    );
  }
}

export default Select;
