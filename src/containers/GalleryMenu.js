import Gallery from '../components/gallery';
import { gallery } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const GalleryMenu = () => {
    const token = useSelector(state => state.loginStore);
    const photos = useSelector(state => state.galleryStore);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(gallery({ data: { token: token.data } })); // Correct
            // dispatch(gallery({ data: { token: token.data } })); // Incorrect for testing
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const handleClick = (id, url, event) => {
        event.preventDefault();
        console.log("Display and mark as viewed:", id, url);
        console.log(photos);
    }
    if(photos.data){
        return (
            <Gallery table={photos.data.photos} handleClick={handleClick} />
        )    
    } else {
        return (
            <b>Log in first!!</b>
        )
    }
}