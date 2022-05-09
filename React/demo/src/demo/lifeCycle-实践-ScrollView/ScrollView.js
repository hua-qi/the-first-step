import React, { Component, useState, useEffect } from "react";

class ScrollView extends Component {
  // 节点 ref
  refNode = null;

  // ---- 自定义事件 ----

  // 控制滚动条滚动
  handleScroll = event => {
    const { srcoll } = this.props;
    srcoll && srcoll(event);
    this.handleSrcollToBottom();
  };

  // 判断滚动条是否到底部
  handleSrcollToBottom() {
    const { srcollToBottom } = this.props;
    const { srollHeight, scrollTop, offsetHeight } = this.refNode;
    // 达到容器底部
    if (srollHeight === scrollTop + offsetHeight) {
      srcollToBottom && srcollToBottom();
    }
  }

  // ---- 生命周期 ----

  constructor(props) {
    super(props);
    // 初始化 Data
    this.state = {
      list: [],
    };
    // 防抖处理
    this.handleSrcollToBottom = debounce(this.handleSrcollToBottom, 200);
  }

  // 接受 props 与旧 state 合并
  static getDerivedStateFromProps(newProps) {
    const { datd } = newProps;
    return {
      list: datd.list || [],
    };
  }

  // 获取更新前容器高度
  getSnapshotBeforeUpdate() {
    return this.refNode.scrollHeight;
  }

  // 获取更新后容器高度
  componentDidUpdate(prevProps, prevState, snapshot) {
    const oldNodeScrollHeight = snapshot;
    console.log(
      "scrollView 容器高度变化：",
      this.refNode.scrollHeight - oldNodeScrollHeight
    );
  }

  // 绑定事件监听器 - 监听 scroll 事件
  componentDidMount() {
    this.refNode.addEventListener("srcoll", this.handleScroll);
  }

  // 清除事件监听器
  componentWillUnmount() {
    this.refNode.removeEventListener("srcoll", this.handleScroll);
  }

  render() {
    const { list } = this.state;
    const { component } = this.props;

    return (
      <div className="list_box" ref={node => (this.refNode = node)}>
        {list.map(item => {
          return React.createElement(component, { item, key: item.id });
        })}
      </div>
    );
  }
}

// ===================================

// 使用

// item 是单元项的 渲染 ui
function Item({ item }) {
  return (
    <div className="goods_item">
      <img src={item.giftImage} className="item_image" alt="礼物图片 " />
      <div className="item_content">
        <div className="goods_name">{item.giftName}</div>
        <div className="old_price"></div>
        <div className="new_price">
          <div className="one view">￥{item.price}</div>
        </div>
        <img className="go_share go_text" alt="链接图片" />
      </div>
    </div>
  );
}

function Index() {
  const [data, setData] = useState({
    list: [],
    page: 0,
    pageCount: 1,
  });

  // 请求数据
  const getData = async () => {
    if (data.page === data.pageCount) return console.log("没有数据了~");

    const res = await fetchData(data.page + 1);
    if (res.code === 0) {
      setData({
        ...res,
        list: res.page === 1 ? res.list : data.list.concat(res.list),
      });
    }
  };

  // 滚动到底触发
  const handleScrollToBottom = () => {
    console.log("scroll 已经到底了");
    getData();
  };

  // 初始化请求数据
  useEffect(() => {
    getData();

    return function componentWillUnmount() {};
  }, []);

  return (
    <ScrollView
      data={data}
      component={Item}
      srcollToBottom={handleScrollToBottom}
      srcoll={() => {}}
    />
  );
}

export default Index;
