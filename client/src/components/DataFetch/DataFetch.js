import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DataFetch(props) {
  const { path, render } = props;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(path)
      .then((response) => setData(response.data))
      .catch((error) => setError(true));
  }, [path]);

  if (error)
    return (
      <div>
        <h2>An Error has occured.</h2>
      </div>
    );

  return render(data);
}

DataFetch.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default DataFetch;
