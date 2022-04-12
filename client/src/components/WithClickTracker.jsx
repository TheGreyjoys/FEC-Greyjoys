import React from 'react';

function WithClickTracker(Component) {
  return class extends React.Component {
    clickTracker(e) {
      const clickData = {};
      clickData.time = new Date();
      clickData.pageElement = e.target;
      console.log('click', clickData);
      console.log(e);
    }

    render() {
      return (
        <div role="menuitem" tabIndex={0} onKeyPress={this.clickTracker.bind(this)} onClick={this.clickTracker.bind(this)}>
          <Component />
        </div>
      );
    }
  };
}

export default WithClickTracker;
