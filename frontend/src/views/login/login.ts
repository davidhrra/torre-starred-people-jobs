import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'login' })
export default class Login extends Vue {
    private loginIsActive: boolean;
    private loginUsername: string;
    private loginPassword: string;
    private loginErrorMessage: string;
    private registerUsername: string;
    private registerPassword: string;
    private registerPasswordConfirm: string;
    private registerTorreUsername: string;
    private spacesRegex: RegExp;
    private registerFormError: string;
    private registerFormSucceed: string;
    private loading: boolean;

    constructor () {
      super()
      this.loginIsActive = true
      this.loginUsername = ''
      this.loginPassword = ''
      this.loginErrorMessage = ''
      this.registerUsername = ''
      this.registerPassword = ''
      this.registerPasswordConfirm = ''
      this.registerTorreUsername = ''
      this.registerFormError = ''
      this.spacesRegex = /\s/
      this.registerFormSucceed = ''
      this.loading = false
    }

    setLoginView (value: boolean): void {
      if (this.loginIsActive) {
        this.cleanRegisterForm()
      } else {
        this.cleanLoginForm()
      }
      this.loginIsActive = value
    }

    cleanLoginForm (): void {
      this.loginPassword = ''
      this.loginUsername = ''
    }

    cleanRegisterForm (cleanRegisterFormSucceed = true): void {
      this.registerPassword = ''
      this.registerPasswordConfirm = ''
      this.registerTorreUsername = ''
      this.registerUsername = ''
      if (cleanRegisterFormSucceed) this.registerFormSucceed = ''
    }

    async login (): Promise<void> {
      this.loading = true
      try {
        this.loginErrorMessage = ''
        await this.$store.dispatch('login', { username: this.loginUsername, password: this.loginPassword })
        this.loginErrorMessage = 'Se inició sesión correctamente'
      } catch (err) {
        this.loginErrorMessage = err.response.data.message.toString()
      }
      this.loading = false
    }

    async register (): Promise<void> {
      this.loading = true
      try {
        if (this.registerFormIsValid) {
          this.registerFormError = ''
          await this.$store.dispatch('registerUser', { username: this.registerUsername, password: this.registerPassword, torreUsername: this.registerTorreUsername })
          this.registerFormSucceed = 'User created successfully, you can now login'
          this.cleanRegisterForm(false)
        }
      } catch (err) {
        this.registerFormError = err.response.data.message.toString()
      }
      this.loading = false
    }

    get passwordError (): string {
      if (this.registerPassword) {
        if (this.spacesRegex.test(this.registerPassword)) {
          return "The password can't have spaces"
        }

        if (this.registerPassword.trim().length < 8) {
          return 'Password must have at least 8 characters'
        }
      }
      return ''
    }

    get passwordConfirmError (): string {
      if (this.registerPasswordConfirm && this.registerPassword !== this.registerPasswordConfirm) {
        return "The passwords doesn't match"
      }
      return ''
    }

    get passwordIsValid (): boolean {
      return !!this.registerPassword.trim() && !this.spacesRegex.test(this.registerPassword) && this.registerPassword === this.registerPasswordConfirm
    }

    get usernameError (): string {
      if (this.registerUsername) {
        if (this.spacesRegex.test(this.registerUsername)) {
          return "The username can't have spaces"
        }
      }
      return ''
    }

    get usernameIsValid (): boolean {
      return !!this.registerUsername.trim() && !this.spacesRegex.test(this.registerUsername)
    }

    get torreUsernameError (): string {
      if (this.registerTorreUsername) {
        if (this.spacesRegex.test(this.registerTorreUsername)) {
          return "The torre username can't have spaces"
        }
      }
      return ''
    }

    get torreUsernameIsValid (): boolean {
      return !!this.registerUsername.trim() && !this.spacesRegex.test(this.registerTorreUsername)
    }

    get registerFormIsValid (): boolean {
      return this.usernameIsValid && this.passwordIsValid && this.torreUsernameIsValid
    }
}
