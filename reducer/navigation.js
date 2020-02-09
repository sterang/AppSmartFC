import {createNavigationReducer} from 'react-navigation-redux-helpers';
import AppNavigator from '../app/app-navigator';
/**
* A module that export all information about navigation in the app
* @module navigationReducer
*/

const navigationReducer = createNavigationReducer(AppNavigator)
    
export default navigationReducer;
