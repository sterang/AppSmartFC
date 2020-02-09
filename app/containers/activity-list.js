import React,{Component} from 'react';
import{FlatList} from 'react-native';
import Layout from '../components/suggestion-list-layout';
import Empty from '../components/empty';
import Separator from '../components/separator';
import Suggestion from '../components/activity';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
/** @function mapStateToProps */
// Return the value state in a subject and list state. 
function mapStateToProps(state){
    return {
        subject:state.videos.selectedSubjects,
        list: state.videos.activity
    }
}

/**
 * Contains all about information the activities list screen
 * @class
 */
class SuggestionList extends Component {
    
    renderEmpty=()=><Empty text="No hay actividades asociadas a la materia"></Empty>
    itemSeparatos=()=><Separator text="No hay actividades asociadas a la materia"></Separator>
    viewContenido=(item)=>{
        this.props.dispatch({
            type:'SET_SELECT_ACTIVITIES_SUBJECT_LIST',
            payload:{
                activity: item,
            }
        })
        console.log(this.props.dispatch)
        this.props.dispatch(NavigationActions.navigate({
            routeName: 'SelectMoment'
        }))
    }
    renderItem=({item})=>{
        return(
            <Suggestion {...item}
            onPress={()=>{this.viewContenido(item)}}
            />
        )
    }
    keyExtractor = item=>item.id_actividad.toString()
    /** Render objects in a Screen of movil. */
    render(){
        var data = [];
        var id_materia= this.props.subject.id_materia;
        data = this.props.list;
        return(
            <Layout title="Tus Actividades">
            <FlatList
                keyExtractor={this.keyExtractor}
                data={data}
                ListEmptyComponent= {this.renderEmpty}
                ItemSeparatorComponent={this.itemSeparatos}
                renderItem={this.renderItem}
            />
            </Layout>
        );
    }
}
export default connect(mapStateToProps) (SuggestionList);