import React,{Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, Button ,Image, TouchableOpacity, FlatList} from 'react-native';
import { Ionicons , MaterialIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import Header from '../../components/header';
import * as SQLite from 'expo-sqlite';
import API from '../../../utils/api';
import ActivityEvents from '../../components/profileActivity';
const db = SQLite.openDatabase("db5.db");
const actividades = [1];

var resultado=[{
  id_actividad: 0,
  nombre_actividad: "",
  nota: 0,
  count_videos: 0,
  progresso: 0
}];
var storageActividad = [{
  id_actividad: 0,
  nombre_actividad: "",
  nota: 0,
  count_videos: 0,
  progresso: 0
}];
var active = "";
/**
 * Contains all about Profile Screen.
 * @class
 */

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <Header onPress={() => navigation.openDrawer()}>PERFIL</Header>,
    }
  }
  state = {
    storage: []
  }
  /**Load all about activities for student */
  async loadActivities() {
    active = "ESTOS SON SU PROGRESO EN LA ACTIVIDAD";
    console.log("ID Estudiante");
    console.log(this.props.student.id_estudiante);
    db.transaction(tx => {
      tx.executeSql(`select * from events where id_estudiante = ?;`, [this.props.student.id_estudiante], (_, { rows: { _array } }) =>
        this.setState({ storage: _array }),
        //console.log(this.state.storage)
      );
    });
    storagesEvents = this.state.storage;
    console.log("Cargando Datos Eventos")
    console.log(storagesEvents);
    for (var i = 0; i < this.state.storage.length; i++) {
      for (var j = 0; j < actividades.length; j++) {
        if (storagesEvents[i].id_actividad == actividades[j]) {
          break;
        }
        else if (storagesEvents[i].id_actividad != actividades[j]) {
          console.log("Cargando Actividades")
          //console.log(storagesEvents[i].id_actividad);
          actividades.push(storagesEvents[i].id_actividad);
        }
      }
    }
    console.log("Imprimiendo Actividades");
    console.log(actividades);
    var activity = await API.getActivities(this.props.ipconfig);
    this.props.dispatch({
      type: 'SET_ACTIVITY_STUDENT',
      payload: {
        studentActivity: activity
      }
    })
    console.log("Capturando Eventos Por Actividad");
    var notaF = 0;
    var notaFEvaluation = 0;
    var progressoActivity=0;
    for (var i = this.state.storage.length - 1; i >= 0; i--) {
      for (var j = 0; j < activity.length; j++) {
        if (this.state.storage[i].id_actividad == activity[j].id_actividad) {
          //Comparation with scores for test
          if (this.state.storage[i].check_a1 == activity[j].CA1 && this.state.storage[i].check_a2 == activity[j].CA2 && this.state.storage[i].check_a3 == activity[j].CA3) {
            notaF = 5;
          } else if (this.state.storage[i].check_a1 != activity[j].CA1 && this.state.storage[i].check_a2 == activity[j].CA2 && this.state.storage[i].check_a3 == activity[j].CA3) {
            notaF = 4;
          } else if (this.state.storage[i].check_a1 == activity[j].CA1 && this.state.storage[i].check_a2 != activity[j].CA2 && this.state.storage[i].check_a3 == activity[j].CA3) {
            notaF = 4
          } else if (this.state.storage[i].check_a1 == activity[j].CA1 && this.state.storage[i].check_a2 == activity[j].CA2 && this.state.storage[i].check_a3 != activity[j].CA3) {
            notaF = 4;
          } else if (this.state.storage[i].check_a1 != activity[j].CA1 && this.state.storage[i].check_a2 != activity[j].CA2 && this.state.storage[i].check_a3 == activity[j].CA3) {
            notaF = 3;
          } else if (this.state.storage[i].check_a1 != activity[j].CA1 && this.state.storage[i].check_a2 == activity[j].CA2 && this.state.storage[i].check_a3 != activity[j].CA3) {
            notaF = 3;
          } else if (this.state.storage[i].check_a1 == activity[j].CA1 && this.state.storage[i].check_a2 != activity[j].CA2 && this.state.storage[i].check_a3 != activity[j].CA3) {
            notaF = 3;
          } else if (this.state.storage[i].check_a1 != activity[j].CA1 && this.state.storage[i].check_a2 != activity[j].CA2 && this.state.storage[i].check_a3 != activity[j].CA3) {
            notaF = 2;
          } else {
            notaF = 0;
          }
          //Comparation with scores for Evaluation
          if (this.state.storage[i].check_Ea1 == activity[j].ECA1 && this.state.storage[i].check_Ea2 == activity[j].ECA2 && this.state.storage[i].check_Ea3 == activity[j].ECA3) {
            notaFEvaluation = 5;
          } else if (this.state.storage[i].check_Ea1 != activity[j].ECA1 && this.state.storage[i].check_Ea2 == activity[j].ECA2 && this.state.storage[i].check_Ea3 == activity[j].ECA3) {
            notaFEvaluation = 4;
          } else if (this.state.storage[i].check_Ea1 == activity[j].ECA1 && this.state.storage[i].check_Ea2 != activity[j].ECA2 && this.state.storage[i].check_Ea3 == activity[j].ECA3) {
            notaFEvaluation = 4
          } else if (this.state.storage[i].check_Ea1 == activity[j].ECA1 && this.state.storage[i].check_Ea2 == activity[j].ECA2 && this.state.storage[i].check_Ea3 != activity[j].ECA3) {
            notaFEvaluation = 4;
          } else if (this.state.storage[i].check_Ea1 != activity[j].ECA1 && this.state.storage[i].check_Ea2 != activity[j].ECA2 && this.state.storage[i].check_Ea3 == activity[j].ECA3) {
            notaFEvaluation = 3;
          } else if (this.state.storage[i].check_Ea1 != activity[j].ECA1 && this.state.storage[i].check_Ea2 == activity[j].ECA2 && this.state.storage[i].check_Ea3 != activity[j].ECA3) {
            notaFEvaluation = 3;
          } else if (this.state.storage[i].check_Ea1 == activity[j].ECA1 && this.state.storage[i].check_Ea2 != activity[j].ECA2 && this.state.storage[i].check_Ea3 != activity[j].ECA3) {
            notaFEvaluation = 3;
          } else if (this.state.storage[i].check_Ea1 != activity[j].ECA1 && this.state.storage[i].check_Ea2 != activity[j].ECA2 && this.state.storage[i].check_Ea3 != activity[j].ECA3) {
            notaFEvaluation = 2;
          } else {
            notaFEvaluation = 0;
          }
          if(this.state.storage[i].check_inicio=='1'){
            progressoActivity=0.2;
          }
          if (this.state.storage[i].check_video=='1'){
            progressoActivity=0.4;
          }
          if(this.state.storage[i].check_answer=='1'){
            progressoActivity=0.6;
          }
          if(this.state.storage[i].check_download=='1'){
            progressoActivity=0.8;
          }
          if(this.state.storage[i].check_Ea1!='0'){
            progressoActivity=1;
          }
          var totalActivity = (notaF + notaFEvaluation)/2;
          dataActividadEvent = {
            id_evento: this.state.storage[i].id_evento,
            id_actividad: activity[j].id_actividad,
            nombre_actividad: activity[j].titulo_actividad,
            nota: notaF,
            notaEvaluation: notaFEvaluation,
            totalNota: totalActivity,
            count_videos: this.state.storage[i].count_video,
            progresso: progressoActivity
          };
          storageActividad.push(dataActividadEvent);
          resultado = Array.from(new Set(storageActividad.map(s => s.id_actividad)))
            .map(id_actividad => {
              return {
                id_actividad: id_actividad,
                nombre_actividad: storageActividad.find(s => s.id_actividad === id_actividad).nombre_actividad,
                nota: storageActividad.find(s => s.id_actividad === id_actividad).nota,
                notaEvaluation: storageActividad.find(s => s.id_actividad === id_actividad).notaEvaluation,
                totalNota: storageActividad.find(s=> s.id_actividad=== id_actividad).totalNota,
                count_videos: storageActividad.find(s => s.id_actividad === id_actividad).count_videos,
                progresso: storageActividad.find(s => s.id_actividad === id_actividad).progresso,
                id_evento: storageActividad.find(s => s.id_actividad === id_actividad).id_evento,
              };
            });
        }
      }
    }
    var elementoEliminado = resultado.splice(0, 1);
    console.log(elementoEliminado)
  }
  /**Load all information about a specific student */
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(`select * from events where id_estudiante = ?;`, [this.props.student.id_estudiante], (_, { rows: { _array } }) =>
        this.setState({ storage: _array }),
        console.log(this.state.storage)
      );
    });
    this.loadActivities();
  }
  keyExtractor = item => item.id_actividad.toString();
  renderItem = ({ item }) => {
    return (
      <ActivityEvents {...item} />
    )
  }
  /** Render objects in a Screen of movil. */
  render() {
    console.log(this.props.student.id_estudiante);
    return (
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.nombre}>{this.props.student.nombre_estudiante} {this.props.student.apellido_estudiante}</Text>
          <Text style={styles.correo}> Correo: {this.props.student.correo_electronico}</Text>
          <Text style={styles.grado}>  Grado: {this.props.student.grado_estudiante}</Text>
          <Text style={styles.TextoDatos}>{active}</Text>
        </View>
        <FlatList
          data={resultado}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  TextoDatos:{
    marginBottom:15,
    fontSize: 14,
    color: '#4F4F4F',
    fontWeight:'bold',
  },
  nombre:{
    marginTop: 10,
    fontSize: 22,
    color: '#44546b',
    fontWeight:'bold',
  },
  containerText:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  correo:{
    fontSize: 14,
    color: '#6b6b6b',
    fontWeight:'bold'
  },
  colegio:{
    fontSize: 16,
    color: '#6b6b6b',
    fontWeight:'bold'
  },
  grado:{
    fontSize: 16,
    color: '#6b6b6b',
    fontWeight:'bold',
    marginBottom: 10
  }
});
function mapStateToProps(state) {
  return {
    student: state.videos.selectedStudent,
    ipconfig: state.videos.selectedIPConfig
  }
}

export default connect(mapStateToProps)(Profile);