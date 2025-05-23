import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Gallery = ({ table, handleClick }) => {
    return (
        <ul>
            {
                table.map(
                    item => (
                        <li key={item.key}>
                            <Link to={`/`} onClick={(event) => handleClick(item.key, item.image_url, event)}>View</Link> {item.title}, Source: {item.source}, Created: {item.created_at}
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