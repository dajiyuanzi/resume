
import React, { Component } from 'react';
import { render } from 'react-dom';
//引入组件
import { Carousel } from 'antd-mobile';
import './carousels.less';

class Carousels extends Component {
  constructor(props) {
    super(props);
    //data是轮播图的数据
    this.state = {
      data: [],
      initialHeight: 350,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['banner1', 'banner2', 'banner3', 'banner4', 'banner5', 'banner6'],
      });
    }, 100);
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <Carousel
        className="my-carousel"
        autoplay={true}
        infinite={true}
        selectedIndex={0}
        swipeSpeed={500}
      >
        {this.state.data.map(ii => (
          <a href="#" key={ii} style={hProp}>
            {/*public是所有静态文件目录，所以获取静态文件时 可以省略public，直接从目录下开始*/}
            <img
              src={`/imgs/${ii || 'banner1'}.jpg`} 
              alt="icon"
              onLoad={() => {
                window.dispatchEvent(new Event('resize')); {/* fire window resize event to change height */}
                this.setState({
                  initialHeight: null,
                });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  }
}

export default Carousels;
