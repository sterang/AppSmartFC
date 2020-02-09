import {combineReducers} from 'redux';
import navigation from './navigation';
import videos from './videos';

/**
* A module that exports all the information about the module of videos and the module of navigation.
* @module reducer
*/

const reducer = combineReducers({
    videos,
    navigation,
});

export default reducer;
