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

    async getProjectNumber(){
        return await Service.get('/');
    },

    async getProjects(search){
        let options = {};

        if(search){options.params = {_any: search,};}

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
    
    async getOneProject(id){
        let result = await Service.get(`/projects/${id}`)
        let data = [result.data]
        
        return data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                company: doc.ime_poslodavca,
                project_description: doc.opis_projekta,
                project_contact: doc.email_kontakt_osobe,
                project_technologies: doc.tehnologije,
                project_prefrences: doc.preference,
                project_required: doc.potrebe_za_obavljanje,
                project_duration: doc.trajanje,
                project_location: doc.lokacija,
                project_note: doc.napomena
            }   
        })  
    },
    
    async getPartnerProjects(id){
        let result = await Service.get(`/partnerProjects/${id}`)
        let data = [result.data]

        return data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                company: doc.ime_poslodavca,
                project_description: doc.opis_projekta
            }   
        })       
    },
    async UpdateProject(project_info,id,updateDoc){
        return await Service.patch(`/projects/${id}/${updateDoc}`, project_info)
    },
    async AddProject(project_info){
        return await Service.post('/projects', project_info)
    },
    async DeleteProject(project_id, updateDoc){
        return await Service.delete(`/projects/${project_id}/${updateDoc}`)
    }
}
    



let Partners = {
    async getPartnersNumber(){
        return await Service.get('/');
    },
    async getPartners(search){
        let options = {};

        if (search) {
            options.params = { _any: search};
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
    },
    async getOnePartner(id){
        let result = await Service.get(`/partners/${id}`)
        let data = [result.data]

        return data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                name: doc.ime_poslodavca,
                description: doc.opis
            }    
        })      
    },
    async get_partner_ammount(items){
        console.log(items);
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

