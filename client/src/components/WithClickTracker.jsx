import React from 'react';
import { logClick } from '../requests';

function WithClickTracker(Component) {
  return class extends React.Component {
    moduleParser(path) {
      let module;
      const elements = path.filter((el) => Object.values(el).length === 2)
        .map((el) => Object.values(el)[1]);
      elements.forEach((obj) => {
        if (obj.id && ['Related Products and Outfit', 'Reviews', 'Product Detail'].includes(obj.id)) {
          module = obj.id;
        }
      });
      return module;
    }

    clickTracker(e) {
      const clickData = {};
      clickData.time = String(new Date());
      clickData.element = (Object.values(e.target)[0].elementType);
      clickData.widget = this.moduleParser(e.nativeEvent.path);
      if (clickData.element) {
        logClick(clickData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
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
