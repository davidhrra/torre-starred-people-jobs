<template>
  <div class="w-100 h-100 d-flex flex-grow-1">
    <div class="col-lg-6">
    </div>
    <div class="col-12 col-lg-6 bg-dark">
        <div class="w-100 shadow-lg h-100 d-flex justify-content-center flex-column px-5">
            <h1 class="torre-color mb-2 font-weight-lighter">Torre saved people and jobs</h1>
            <p class="text-light">
                <small>
                    The perfect place where you can save all the information about your favourite jobs or the people you want to follow from torre.co
                </small>
            </p>
            <div class="d-flex align-items-center justify-content-center">
                <div class="bg-light w-50 rounded">
                    <div class="btn-group w-100">
                        <div :class="{'active': loginIsActive }" class="btn pt-1 login-btn" aria-current="page" @click="setLoginView(true)">
                            <small>
                                Login
                            </small>
                        </div>
                        <div :class="{'active': !loginIsActive }" class="btn pt-1 login-btn" @click="setLoginView(false)">
                            <small>
                                Register
                            </small>
                        </div>
                    </div>
                    <div class="py-3 px-5">
                        <form @submit.prevent="login()" v-if="loginIsActive">
                            <div class="row my-2">
                                <label class="p-0"><small>Username</small></label>
                                <input type="text" maxlength="30"  v-model="loginUsername" class="form-control form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row my-2">
                                <label class="p-0"><small>Password</small></label>
                                <input type="password" v-model="loginPassword" maxlength="50" class="form-control w-100 form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row" v-if="loginErrorMessage">
                                <p class="text-danger p-0">
                                    <small>
                                        {{loginErrorMessage}}
                                    </small>
                                </p>
                            </div>
                            <div class="row mb-1 mt-3">
                                <button type="submit" :disabled="loading" class="btn btn-sm btn-dark">{{loading ? 'Loading...' : 'Login'}}</button>
                            </div>
                        </form>
                        <form @submit.prevent="register()" v-else>
                            <div class="row my-2">
                                <label class="p-0"><small>Username</small></label>
                                <input type="text" maxlength="30"  v-model="registerUsername" class="form-control form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row" v-if="usernameError">
                                <p class="text-danger p-0">
                                    <small>
                                        {{usernameError}}
                                    </small>
                                </p>
                            </div>
                            <div class="row my-2">
                                <label class="p-0"><small>Torre username</small></label>
                                <input type="text" v-model="registerTorreUsername" maxlength="50" class="form-control w-100 form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row" v-if="torreUsernameError">
                                <p class="text-danger p-0">
                                    <small>
                                        {{torreUsernameError}}
                                    </small>
                                </p>
                            </div>
                            <div class="row my-2">
                                <label class="p-0"><small>Password</small></label>
                                <input type="password" v-model="registerPassword" maxlength="50" class="form-control w-100 form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row" v-if="passwordError">
                                <p class="text-danger p-0">
                                    <small>
                                        {{passwordError}}
                                    </small>
                                </p>
                            </div>
                            <div class="row my-2">
                                <label class="p-0"><small>Confirm password</small></label>
                                <input type="password" v-model="registerPasswordConfirm" maxlength="50" class="form-control w-100 form-control-sm" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="row" v-if="passwordConfirmError">
                                <p class="text-danger p-0">
                                    <small>
                                        {{passwordConfirmError}}
                                    </small>
                                </p>
                            </div>
                            <div class="row" v-if="registerFormError">
                                <p class="text-danger p-0">
                                    <small>
                                        {{registerFormError}}
                                    </small>
                                </p>
                            </div>
                            <div class="row" v-if="registerFormSucceed">
                                <p class="text-success p-0">
                                    <small>
                                        {{registerFormSucceed}}
                                    </small>
                                </p>
                            </div>
                            <div class="row mb-1 mt-3">
                                <button :disabled="!registerFormIsValid || loading" type="submit" class="btn btn-sm btn-dark">{{loading ? 'Loading...' : 'Register'}}</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" src="./login.ts">
</script>
<style scoped lang="scss" src="./login.scss">
</style>
