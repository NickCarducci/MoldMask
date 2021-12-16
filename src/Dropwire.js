import React from "react";
class Cable extends React.Component {
  state = {};
  componentDidUpdate = (prevProps) => {
    if (this.props.scrolling !== prevProps.scrolling) {
      const { scrollTopAndHeight, scrollTop } = this.props;
      var continuee = this.props.fwd.current;
      if (!continuee) return;
      var between =
        scrollTopAndHeight - continuee.scrollTop > -100 &&
        continuee.scrollTop - scrollTop > -100;
      clearTimeout(this.setset);
      this.setset = setTimeout(
        () =>
          this.setState({
            between
          }),
        1000
      );
    }
  };
  render() {
    const { between, continuee } = this.state;
    const { src, float, title, img } = this.props;
    return !continuee || between ? (
      src === "" ? (
        <span ref={this.props.fwd} style={{ border: "1px gray solid" }}>
          {title}
        </span>
      ) : img ? (
        <img
          onError={this.props.onError}
          alt={title}
          style={{
            shapeOutside: "rect()",
            float,
            width: "200px",
            border: 0,
            ...this.props.style,
            display: src === "" ? "none" : ""
          }}
          ref={this.props.fwd}
          src={src}
        />
      ) : (
        <iframe
          onError={this.props.onError}
          title={title}
          style={{
            shapeOutside: "rect()",
            float,
            width: "200px",
            border: 0,
            ...this.props.style,
            display: src === "" ? "none" : ""
          }}
          ref={this.props.fwd}
          src={src}
        />
      )
    ) : null;
  }
}
export default React.forwardRef((props, ref) => <Cable fwd={ref} {...props} />);
