import { Component, Vue } from "vue-property-decorator";

@Component({ name: 'login' })
export default class Login extends Vue {
    private loginIsActive: boolean;

    constructor(){
        super();
        this.loginIsActive = false;
    }


}