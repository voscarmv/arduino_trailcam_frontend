import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Gallery = ({ table, handleClick }) => {
    return (
        <ul>
            {
                table.map(
                    item => (
                        <li>
                            <Link to={`/`} onClick={(event) => handleClick(item.id, item.url, event)}>View</Link> {item.title}, Source: {item.source}, Created: {item.created_at}
                        </li>
                    )
                )
            }
        </ul>
    )
};

Gallery.propTypes = {
    table: propTypes.array.isRequired,
    handleClick: propTypes.func.isRequired,
};

export default Gallery;