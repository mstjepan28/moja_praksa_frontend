// servis za komunikaciju s backendom
import axios from 'axios'
import $router from '@/router'

//instanciranje varijable za kom. s backendom
//vezan uz konkretni backend
let Service = axios.create({
    //baseURL: 'http://localhost:3000/',
    baseURL:' https://moja-praksa.herokuapp.com/',
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
            if($router.app.$route.name != "Login") $router.push({ path: '/Login'})
            Auth.logout();
        }
    }
);

let Auth = {
    async register(new_user, registrationCode){
        //pass ide preko SSL-a pa ga nije nužno heshirati
        const response = await Service.post('/register', {new_user, registrationCode});

        if(!response)
            return false
        
        if(response.data) 
            return this.login({'email': new_user.email, 'password': new_user.password});
    },
    async login(login_info){
        const response = await Service.post('/login', login_info)

        if(!response) return false

        if(response.data){
            let user = response.data
            //prvi put put spremamo radi tokenayy
            localStorage.setItem('user', JSON.stringify(user));

            if(user.account_type == 'Poslodavac') user = await App.isPartner(user);
            //pustiti ili ne?
            if(user.account_type == 'Student') user.chosenProjects = await App.getChosenProjects(user._id);
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('selected_projects', JSON.stringify([]));

            return true
        }
    },

    async changePassword(userData){
        return await Service.patch('/change_password', userData);
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

        const result = await Service.get('/students', options)
        return result.data;
    },
    async getOneStudent(id){
        const result = await Service.get('/students/:id', id)
        return result.data;
    },
    async getJournal(id){
        const result = await Service.get(`/journal/${id}`)
        console.log(result)
        return result.data.journal;
    },
}

let Projects = {
    async submit_projects(projects){
        const user_data = Auth.getUser();
        const result = await Service.patch(`/chosen_projects`, {'user': user_data._id, 'selection': projects});
        
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
        return result.data; 
    },
    async getPartnerProjects(id){
        const result = await Service.get(`/partner_projects/${id}`);
        return result.data;       
    },
    async UpdateProject(project_info, id, update){
        project_info.updateDoc = update
        return await Service.put(`/projects/${id}`, project_info)
    },
    async AddProject(project_info){
        return await Service.post('/projects', project_info)
    },
    async DeleteProject(project_id){
        return await Service.delete(`/projects/${project_id}`)
    },
    async getApprovedProject(id){    
        const result = await Service.get(`/approved_project/${id}`);
        
        return result.data;
    },
    async addProjectView(info){
        await Service.patch('/', info);
    },
}

let Partners = {
    async UpdatePartner(partnerInfo, partner_id, update){
        partnerInfo.updateDoc = update
        try{
            const result = await Service.put(`/partners/${partner_id}`, partnerInfo)
            return result.data;
        }catch{
            return false;
        }
    },
    
    async CreatePartner(partnerData){
        const result = await Service.post('/partners', partnerData);
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
        return result.data;     
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
        if(user_data.token) delete user_data.token;

        user_data.updateDoc = update
        const result = await Service.patch('/user', user_data)
        return result.data;
    },

    async deleteUser(user_data, update){
        user_data.updateDoc = update
        const result = await Service.patch('/user', user_data)
        return result.data;
    },

    async isPartner(user_data){
        const result = await Service.get(`/check_partner/${user_data._id}`)
        return {...user_data, ...result.data};
    },

    async getChosenProjects(id){
        const result = await Service.get(`/chosen_projects/${id}`);
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