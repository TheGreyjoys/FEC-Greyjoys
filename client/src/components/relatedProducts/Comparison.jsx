import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Comparison(props) {
  const [showComp, setShowComp] = useState(false);

  function toggleShowComp(e) {
    e.preventDefault();
    setShowComp(!showComp);
  }

  if (!showComp) {
    return <button type="button" onClick={toggleShowComp}>Compare</button>;
  }
  return (
    <div>
      <div className="modal">
        <table>
          <tr>
            <th>{comparedName}</th>
            <th>Characteristic</th>
            <th>{currentName}</th>
          </tr>
          <tr>
            <td></td>
          </tr>
        </table>
      </div>
      <button type="button" onClick={toggleShowComp}>Close</button>
    </div>
  );
}

export default Comparison;
