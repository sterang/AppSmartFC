import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppNavigator from './app-navigator';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { BackHandler} from 'react-native';

const ReduxifyApp = createReduxContainer(AppNavigator);

/**
 * Contains all about the application states
 * @class
 */
class AppNavigatorWithState extends ReduxifyApp {
    /** Load Did Mount moment in app */
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    /** Load Will UnMount moment in app */
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
    /** When press Back in android return to Home */
    onBackPress = () => {
      // cuando le piques al back de android
      this.props.dispatch(
        NavigationActions.back({
          key: 'Home'
        })
      )
      return true
    }
  }
/** @function mapStateToProps */
// Return the value state in a navigation state. 

  function mapStateToProps(state) {
    return {
      state: state.navigation
    }
  }
/**
* A module that manage the state in app 
* @module AppNavigatorWithState
*/
  export default connect(mapStateToProps)(AppNavigatorWithState)