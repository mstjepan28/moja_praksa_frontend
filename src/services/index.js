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
        const response = await Service.post('/login', login_info)
        
        if(response.data){
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('selected_projects', JSON.stringify([]));	
            
            return true
        }
        console.log("Failed to login!")
        return false
              
    },
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('selected_projects');
    },
    isAuthenticated(){
        if(Auth.getToken()) return true;
        else return false;
    },
    getToken() {
        const user = Auth.getUser();

        if (user && user.token) return user.token;
        else return null
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    },
}

let Projects = {
    async submit_projects(projects){
        let user_data = Auth.getUser();
        delete user_data.token;

        const result = await Service.get(`/`, {'user': user_data, 'selection': projects});
        return result.data;
    },
    async getDocAmmount(){
        const result = await Service.get('/');
        return result.data
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
    async get_project_ammount(items_range){
        let result = await Service.get('/', items_range);

        return result.data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                company: doc.ime_poslodavca,
                project_description: doc.opis_projekta
            }   
        })   
    },
    async getPartnerProjects(id){
        let result = await Service.get(`/partnerProjects/${id}`)

        return result.data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                company: doc.ime_poslodavca,
                project_description: doc.opis_projekta,
                adress: doc.adress,
                telephone_number: doc.contactNumber,
                email: doc.contactEmail,
                technology: doc.technology,
                about_us: doc.aboutUs
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
        const result = await Service.get('/');
        return result.data;
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
                name: doc.name,
                description: doc.aboutUs
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
                adress: doc.adress,
                project_description: doc.opis_projekta,
                telephone_number: doc.contactNumber,
                contact_email: doc.contactEmail,
                technology: doc.technology,
                about_us: doc.aboutUs
            }    
        })      
    },
    async get_partner_ammount(item_range){
        let result = await Service.get('/', item_range);

        return result.data.map(doc=> {
            return{
                id: doc._id,
                img: doc.url_slike,
                name: doc.name,
                description: doc.aboutUs
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

