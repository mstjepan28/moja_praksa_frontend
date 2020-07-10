// servis za komunikaciju s backendom
import axios from 'axios'


//instanciranje varijable za kom. s backendom
//vezan uz konkretni backend
let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000 
})

let Auth = {
    async register(username, password, confirmPassword){
        let success = null
        if (password == confirmPassword){
            success= await Service.post('/register')
        }
        return success
    },

    async login(username, password){
        let success = await Service.post('/login')
        return success
    }
        
}


//vezani uz pojedine rute
//Service zove instancu nad baznim i u nastavku dodaje donju rutu i vraca promise
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

export { Service, Users, Auth}