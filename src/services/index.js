// servis za komunikaciju s backendom
import axios from 'axios'


//instanciranje varijable za kom. s backendom
//vezan uz konkretni backend
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000 
})

let Auth = {
    async register(new_user){
        //pass ide preko SSL-a pa ga nije nužno heshirati
        return await Service.post('/register', new_user)
    },

    async login(login_info){
        return await Service.post('/login', login_info)
    }   
}


let Projects = {
    async getProjects(search){

        let options = {};

        if (search) {
            options.params = {
                _any: search,
            };
        }

        let result = await Service.get('/projects', options)
        return result.data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                company: doc.ime_poslodavca,
                project_description: doc.opis_projekta
            }   
        })
    },

    
}

let Partners = {
    async getPartners(search){

        let options = {};

        if (search) {
            options.params = {
                _any: search,
            };
        }

        let result = await Service.get('/partners', options)
        return result.data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                name: doc.ime_poslodavca,
                description: doc.opis
            }   
        })
    }
}



//vezani uz pojedine rute
//Service zove instancu nad baznim i u nastavku dodaje donju rutu i vraca promise
// samo za probu
let Users = {
    async getUsers(){
        let result = await Service.get('/test')
        return result.data.map(doc=> {
            return{
                id: doc._id,
                username: doc.username,
                password: doc.password
            }   
        })
    }

}

export { Service, Users, Auth, Projects, Partners}

