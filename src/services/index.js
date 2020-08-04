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
    isStudent(){
        const user_data = this.getUser();
        if(user_data.account_type == "Student") return true;
        else return false;
    },
    isCompany(){
        const user_data = this.getUser();
        if(user_data.account_type == "Poslodavac") return true;
        else return false;
    },
    isAdmin(){
        const user_data = this.getUser();
        if(user_data.account_type == "Admin") return true;
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
    state: {
        get authenticated() {
            return Auth.isAuthenticated();
        },
        get account_type(){
            const user_data = Auth.getUser();
            return user_data.account_type;
        }
    },
}

let Projects = {
    async submit_projects(projects){
        let user_data = Auth.getUser();
        delete user_data.token;

        const result = await Service.post(`/chosen_projects`, {'user': user_data._id, 'selection': projects});
        
        return result.data;
    },
    async getDocAmount(){
        const result = await Service.get('/');
        return result.data
    },
    async getProjects(search){
        let options = {};
        if(search){options.params = {_any: search,};}

        const result = await Service.get('/projects', options)
        return result.data;
    },
    async getOneProject(id){
        const result = await Service.get(`/projects/${id}`);
        return [result.data]; 
    },
    async getPartnerProjects(id){
        const result = await Service.get(`/partner_projects/${id}`);
        return result.data;       
    },
    async UpdateProject(project_info, id, updateDoc){
        return await Service.patch(`/projects/${id}/${updateDoc}`, project_info)
    },
    async AddProject(project_info, userID){
        project_info.userID = userID
        
        return await Service.post('/projects', project_info)
    },
    async DeleteProject(project_id, updateDoc){
        return await Service.delete(`/projects/${project_id}/${updateDoc}`)
    }
}

let Partners = {

    async UpdatePartner(partnerInfo, partner_id, updateDoc){
        const result = await Service.patch(`/partners/${partner_id}/${updateDoc}`, partnerInfo)
        return result.data;
    },
    // Brisanje od strane admina iz kolekcije partnera, ne brise se user
    async DeletePartner(partner_id, updateDoc){
        const result = await Service.get(`/projects/${partner_id}/${updateDoc}`);
        return result.data;
    },
    async CreatePartner(new_partner){
        const result = await Service.get('/partners', new_partner);
        return result.data;
    },
    async getPartners(search){
        let options = {};
        if (search) {options.params = { _any: search}}

        const result = await Service.get('/partners', options);
        return result.data;
    },
    async getOnePartner(id){
        const result = await Service.get(`/partners/${id}`);
        return [result.data];     
    },
}

let Content = {
    async get_instructions(){
        const result = await Service.get('/')
        return result.data;
    },
    async set_instructions(instructions){
        const result = await Service.put('/', {'instructions': instructions})
        return result.data;
    },
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

export { Service, Users, Auth, Projects, Partners, Content}

