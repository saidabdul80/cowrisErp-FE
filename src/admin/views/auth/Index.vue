<template>
    <div class="tw-flex tw-min-h-full tw-flex-1">
        <v-row align="start" no-gutters>
            <v-col cols="12" md="6">
                <div class="tw-relative tw-hidden tw-flex-1 lg:tw-block mx-4 my-4 mt-2">
                    <!-- <img class="tw-absolute tw-w-full tw-rounded-3xl"
                        src="@/assets/login-image.png" style="height: 98vh;" alt="" /> -->
                </div>  
            </v-col>
            <v-col md="6" sm="12">
                <div
                    class="tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-px-4 tw-py-12 sm:tw-px-6 lg:tw-flex-none lg:tw-px-20 xl:tw-px-24">
                    <div class="tw-mx-auto tw-w-full tw-max-w-sm lg:tw-w-96">
                        <div>
                            <div class="tw-flex tw-justify-center tw-mb-10">
                                <img class="tw-h-20 tw-w-auto tw-mt-10 " src="@/assets/logo-full-color.png"
                                    alt="Your Company" />
                            </div>
                            <p
                                class="tw-mt-10 tw-text-sm tw-leading-6 tw-text-green-900 tw-text-center tw-text tw-font-semibold">
                                Enter your details to access your COWRIS ERP account.
                            </p>
                        </div>
                        <div class="tw-mt-10">
                            <div>

                                <v-form ref="form">
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">                                    
                                            <TextField v-model="authStore.loginData.email" label="Username"
                                                :error_messages="globalStore.nameRules?.username"
                                                placeholder="Email " />      
                                                <br>                          
                                            <TextField label="Password" 
                                                :type="showPassword ? 'text' : 'password'"
                                                v-model="authStore.loginData.password"
                                                @click:append-inner="showPassword = !showPassword"
                                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                placeholder="**********"
                                                :error_messages="globalStore.nameRules?.password" />
                                        </v-col>
                                    </v-row>
                                    <div
                                        class="tw-grid tw-gap-4 md:tw-grid-cols-2 tw-grid-cols-2   tw-items-center tw-justify-between">
                                        <v-checkbox label="Remember me"></v-checkbox>
                                        <div class=" tw-text-right  mb-3 ">
                                            <a href="forgot-password"
                                                class="tw-font-semibold tw-text-green-900 hover:tw-text-green-500">Forgot
                                                password?</a>
                                        </div>
                                    </div>
                                    <div>
                                        <v-btn @click.prevent="login()" type="submit" block :color="$constants.primary" size="large"
                                            :class="`tw-bg-${$constants.primary}-900 tw-w-full`">
                                            <span v-if="isLoading" class="loader tw-h-5 tw-w-5"></span>
                                            Login
                                        </v-btn>
                                    </div>
                                    <p class="tw-mt-2 tw-text-sm tw-leading-6 tw-text-gray-500">
                                        Don't have a COWRIS ERP account? Click here to
                                        {{ ' ' }}
                                        <a href="#" class="tw-font-semibold tw-text-green-900 hover:tw-text-green-700">
                                            enrol yourself.
                                        </a>
                                    </p>
                                </v-form>
                            </div>

                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import { useAuthStore } from '@/admin/stores/auth';
import { useGlobalsStore } from '@/stores/globals';
import { useNotificationStore } from '@/stores/notification';
import TextField from '@/components/TextField.vue';

export default {
    name: "Login",
    components: {
        TextField
    },
    data() {
        return {
            isLoading: false,
            showPassword: false,
            notificationStore: useNotificationStore(),
            authStore: useAuthStore(),
            globalStore: useGlobalsStore(),
        }
    },
    watch: {

    },
    methods: {
        async login() {
            this.isLoading = true
           const res = await this.authStore.login(this.authStore.loginData)         
            this.$refs.form.validate(true)
            this.isLoading = false
        }
    }
};
</script>

<style scoped></style>