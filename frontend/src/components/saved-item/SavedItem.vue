<template>
    <div class="w-100 p-2 border-bottom pointer saved-item" :class="{'active': itemIsSelected}" @click="selectItem">
        <template v-if="loading">
            <div class="w-100 d-flex align-items-center justify-content-center py-4">
                <font-awesome-icon icon="circle-notch" spin size="lg"></font-awesome-icon>
            </div>
        </template>
        <template v-else>
            <div class="w-100 d-flex align-items-center justify-content-center py-3" v-if="error || !savedItemInfo">
                <p class="text-center" v-if="!savedItemInfo">
                    We can't show the information
                </p>
                <p class="text-center text-danger" v-else>
                    There was a problem loading the information: {{error}}
                </p>
            </div>
            <div class="w-100 d-flex align-items-start justify-content-around pt-4 pb-2 px-2" v-else>
                <template v-if="type === 'JOB'">
                    <p class="torre-color">{{savedItemInfo.objective}}</p>
                </template>
                <template v-else>
                    <img :src="savedItemInfo.pictureThumbnail" width="50px" class="border torre-border rounded-pill" alt="...">
                    <div>
                        <b>{{savedItemInfo.name}}</b>
                        <p>{{savedItemInfo.professionalHeadline}}</p>
                    </div>
                </template>

            </div>
        </template>
    </div>
</template>
<style scoped lang="scss" src="./saved-item.scss">
</style>
<script lang="ts" src="./saved-item.ts">
</script>
