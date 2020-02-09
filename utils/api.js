/**
 * Contains all apis for application..
 * @class
 */
class Api {
    /** Get all contents REA. */
    async getContent(BASE_IP){
        var BASE_API ='http://'+BASE_IP+':3000'+'/loadAllcontents';
        const query = await fetch(`${BASE_API}`);
        const data = await query.json();
        return data;
    }
    /** Get all courses about grade and school. */
    async getCourses(BASE_IP, id_grado, id_colegio){
        var BASE_API_COURSES ='http://'+BASE_IP+':3000'+'/loadAllSubjectActivesMovil';
        var datajson = {id_colegio: id_colegio, id_grado: id_grado};
        console.log("Aqui mando datos");
        console.log(datajson);
        const query2 = await fetch(`${BASE_API_COURSES}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Get all activities. */
    async getActivities(BASE_IP){
        var BASE_API_ACTIVITIES ='http://'+BASE_IP+':3000'+'/loadAllactivities';
        const query = await fetch(`${BASE_API_ACTIVITIES}`);
        const data = await query.json();
        return data;
    }
    /** Get all activities about grade and school. */
    async getActivitiesMovil(BASE_IP, id_colegio, id_grado, id_materia){
        var BASE_API_ACTIVITIES_MOVIL ='http://'+BASE_IP+':3000'+'/loadAllActivitiesMovil';
        var datajson = {id_colegio: id_colegio, id_grado: id_grado, id_materia: id_materia};
        console.log("Aqui mando datos");
        console.log(datajson);
        const query2 = await fetch(`${BASE_API_ACTIVITIES_MOVIL}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Get all contents REA about a word or title. */
    async SearchContent(BASE_IP,title){
        var BASE_API_SEARCH ='http://'+BASE_IP+':3000'+'/searchContentREA';
        var datajson = {nombre_CREA: title};
        console.log("JSON BUSQUEDA_________________");
        const query2 = await fetch(`${BASE_API_SEARCH}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datajson),
        });
        const data2 = await query2.json();
        const predata2 = await data2.content;
        return predata2;
    }
    /** Create events about one activity. */
    async createEvents(BASE_IP,eventsStudents){
        var BASE_API_EVENTS ='http://'+BASE_IP+':3000'+'/createEventos';
        console.log("JSON EVENTOS");
        const query2 = await fetch(`${BASE_API_EVENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsStudents),
        });
        const data2 = await query2.json();
    }
    /** Load the last event in database for sinchronization. */
    async loadEventsLast(BASE_IP){
        var BASE_API_LOAD_EVENTS ='http://'+BASE_IP+':3000'+'/loadAllEvento';
        const query = await fetch(`${BASE_API_LOAD_EVENTS}`);
        const data = await query.json();
        console.log('Cargando Todos los Eventos');
        const datalast = data[data.length-1];
        return data.length;
    }
    /** Login for students in app. */
    async loginStudent(BASE_IP,eventsStudents){
        console.log("JSON LOGIN");
        var BASE_API_LOGIN ='http://'+BASE_IP+':3000'+'/loginEstudiante';
        const query2 = await fetch(`${BASE_API_LOGIN}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsStudents),
        });
        const data2 = await query2.json();
    }
    /** Load all schools with association about server. */
    async loadSchool(BASE_IP){
        var BASE_API_SCHOOL ='http://'+BASE_IP+':3000'+'/loadAllSchools';
        console.log("JSON SCHOOL");
        const query = await fetch(`${BASE_API_SCHOOL}`);
        const data2 = await query.json();
        return data2;
    }
    /** Create students in server. */
    async createStudents(BASE_IP,Student){
        console.log("JSON EVENTOS");
        var BASE_API_STUDENTS ='http://'+BASE_IP+':3000'+'/createEstudiante';
        const query2 = await fetch(`${BASE_API_STUDENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Modify students in server. */
    async updateStudents(BASE_IP, Student){
        console.log("JSON EVENTOS");
        var BASE_UPDATE_API_STUDENTS ='http://'+BASE_IP+':3000'+'/uploadEstudiante';
        const query2 = await fetch(`${BASE_UPDATE_API_STUDENTS}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Get all students in server. */
    async allStudent(BASE_IP){
        var BASE_API_ALL_STUDENTS = 'http://'+BASE_IP+':3000'+'/loadAllStudent';
        const query = await fetch(`${BASE_API_ALL_STUDENTS}`);
        const data = await query.json();
        return data;
    }
    /** Get all doubts in server. */
    async allDoubts(BASE_IP){
        var BASE_API_ALL_STUDENTS = 'http://'+BASE_IP+':3000'+'/loadAllDudas';
        const query = await fetch(`${BASE_API_ALL_STUDENTS}`);
        const data = await query.json();
        return data;
    }
    /** Get all doubts in server about a specifict student. */
    async allDoubtsStudents(BASE_IP, student){
        console.log("JSON DUDAS");
        var BASE_API_LOAD_DOUBTS_STUDENT = 'http://'+BASE_IP+':3000'+'/loadDudaStudents';
        const query2 = await fetch(`${BASE_API_LOAD_DOUBTS_STUDENT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Generate metrics for a specifict student with all information. */
    async generateMetrics(BASE_IP, Student){
        console.log("JSON EVENTOS");
        var BASE_API_LOAD_EVENT_STUDENT = 'http://'+BASE_IP+':3000'+'/generateMetrica';
        const query2 = await fetch(`${BASE_API_LOAD_EVENT_STUDENT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Student),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Generate doubt for a specifict student with all information. */
    async generateDoubt (BASE_IP, dataDoubt){
        var BASE_API_CREATE_DOUBT = 'http://'+BASE_IP+':3000'+'/createDuda';
        const query2 = await fetch(`${BASE_API_CREATE_DOUBT}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataDoubt),
        });
        const data2 = await query2.json();
        return data2;
    }
    /** Load doubt for a specifict student with all information. */
    async loadDoubt (BASE_IP){
        var BASE_API_LOAD_DOUBT = 'http://'+BASE_IP+':3000'+'/createDuda';
        const query = await fetch(`${BASE_API_LOAD_DOUBT}`);
        const data2 = await query.json();
        return data2;
    }
    /** Login for admin in app. */
    async loginAdmin (BASE_IP, dataLogin){
        var BASE_API_LOGIN_ADMIN = 'http://'+BASE_IP+':3000'+'/loginAdminMovil';
        const query2 = await fetch(`${BASE_API_LOGIN_ADMIN}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin),
        });
        const data2 = await query2.json();
        return data2;
    }
}
export default new Api();