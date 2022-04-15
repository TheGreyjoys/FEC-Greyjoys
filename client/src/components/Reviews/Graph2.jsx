/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import meaning from './meaning';

function Graph2(props) {
  const { chara, value } = props;
  return (
    <div className="charChartContainer">
      <div className="charChartKeys">{chara}</div>
      <div className="charBarContainer">
        <div className="charBarBars">
          <div className="charBar" />
          <div className="charBar" />
          <div className="charBar" />
        </div>
        <div className="charBarPointer" style={{ position: 'relative', left: `${(Number(value) - 1) / 4 * 78}%`, top: '-12px' }}>▼</div>
        <div className="charBarkeys">
          <div>{meaning[chara][1]}</div>
          <div>{meaning[chara][5]}</div>
        </div>
      </div>
    </div>
  );
}

Graph2.propTypes = {
  chara: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Graph2;
