<template>
    <transition name="fade">
        <div v-if="isForgotPassModalVisible" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 class="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <input v-model="email" type="email" placeholder="Enter your email" class="mb-4 w-full text-black p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-Yellow border-Light_grey" />
                <div class="flex justify-end">
                    <button @click="submitEmail" class="bg-Yellow text-white py-2 px-4 rounded hover:bg-darkYellow">Submit</button>
                </div>
                <div class="mt-4 text-sm text-center">
                    <button @click="closeForgotPassModal" class="text-Red underline">Cancel</button>
                </div>
            </div>
        </div>
    </transition>
    
</template>

<script>
export default {
    props: {
        isForgotPassModalVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            email: ''
        };
    },
    methods: {
        closeForgotPassModal() {
            this.$emit('close');
        },
        submitEmail() {
            // You can add API logic here to submit the email for password reset
            console.log(`Password reset link sent to ${this.email}`);
            this.closeForgotPassModal();
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
