// servis za komunikaciju s backendom
import axios from 'axios'
import $router from '@/router'

//instanciranje varijable za kom. s backendom
//vezan uz konkretni backend
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000 
})


Service.interceptors.request.use((request) => {
    try {
    request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    return request;
});

Service.interceptors.response.use( 
    (response) => {return response},
    (error) => {
        if (error.response.status == 401) {
            Auth.logout();
            $router.go();
        }
    }
);


let Auth = {
    async register(new_user){
        //pass ide preko SSL-a pa ga nije nužno heshirati
        const response = await Service.post('/register', new_user);
        
        if(response.data) return this.login({'email': new_user.email, 'password': new_user.password});
        return false
    },
    async login(login_info){
        const response = await Service.post('/login', login_info)

        if(response.data){
            const user = response.data
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('selected_projects', JSON.stringify([]));

            return true
        }
        console.log("Failed to login!")
        return false
              
    },

    async changePassword(userData){
        const result = await Service.patch('/register', userData);
        console.log(result)
        return result
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
    state: {
        get authenticated() {
            return Auth.isAuthenticated();
        },
        get account_type(){
            const user_data = Auth.getUser();
            if(user_data) return user_data.account_type;
            return false;
        },
        get user_data(){
            const user_data = Auth.getUser();
            if(user_data) return user_data;
            return false;
        }
    },

  
}

let Students = {
    async getStudents(search){
        let options = {};
        if(search){options.params = {_any: search,};}

        const result = await Service.get('/', options)
        return result.data;
    },
    async getOneStudent(id){
        const result = await Service.get('/', id)
        return result.data;
    },
    async getJournal(id){
        const result = await Service.get('/', id)
        return result.data;        
    }
}

let Projects = {
    async submit_projects(projects){
        const user_data = Auth.getUser();
        const result = await Service.post(`/chosen_projects`, {'user': user_data._id, 'selection': projects});
        
        return result.data.result;
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
    async UpdateProject(project_info, id, update){
        project_info.updateDoc = update
        return await Service.patch(`/projects/${id}`, project_info)
    },
    async AddProject(project_info, userID){
        project_info.userID = userID
        
        return await Service.post('/projects', project_info)
    },
    async DeleteProject(project_id, update){
        let partnerInfo = {
            updateDoc : update
        }
        return await Service.delete(`/projects/${project_id}`, partnerInfo)
    },
    async getApprovedProject(){    
        const result = await Service.get(`/approved_project`);
        
        return result.data;
    },
    async addProjectView(info){
        await Service.patch('/', info);
    },
}

let Partners = {

    async UpdatePartner(partnerInfo, partner_id, update){
        partnerInfo.updateDoc = update
        const result = await Service.patch(`/partners/${partner_id}`, partnerInfo)
        return result.data;
    },
    // Brisanje od strane admina iz kolekcije partnera, ne brise se user
    async DeletePartner(partner_id, update){
        let partnerInfo = {
            updateDoc : update
        }
        const result = await Service.delete(`/partners/${partner_id}/`, partnerInfo);
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
    async addPartnerView(info){
        await Service.patch('/', info);
    },
}

let App = {

    async upload_application_form(form, userID){
        const result = await Service.post(`/application_form`, {'form': form, 'userID': userID});
        return result.data;
    },

    async upload_template(template){
        const result = await Service.patch(`/template`, template);
        return result.data;
    },

    async get_journal_template(){
        const result = await Service.get('/template')
        return result.data;
    },

    async upload_journal(journal){
        const user_data = Auth.getUser();

        const result = await Service.patch(`/journal`, {'user_id': user_data._id, 'journal': journal});
        return result.data;
    },

    async getDocAmount(){
        const result = await Service.get('/');
        return result.data
    },
    
    async updateUser(user_data, update){
        user_data.updateDoc = update
        const result = await Service.patch('/user', user_data)
        return result.data;
    },

    async deleteUser(user_data, update){
        user_data.updateDoc = update
        const result = await Service.patch('/user', user_data)
        return result.data;
    },

    async isPartner(user_data, update){
        user_data.updateDoc = update
        const result = await Service.get('/user', user_data.id)
        return result.data;
    },
}

let Content = {
    async get_instructions(){
        const result = await Service.get('/instructions')
        return result.data.instructions;
    },
    async set_instructions(instructions){
        const result = await Service.patch('/instructions', {'instructions': instructions})
        return result.data;
    },

   
};

export { Service, Auth, Students, Projects, Partners, Content, App}