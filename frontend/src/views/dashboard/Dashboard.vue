<template>
    <div class="dashboard-holder w-100 h-100 bg-dark text-light">
        <template v-if="loadingMainContent">
            <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                <font-awesome-icon icon="circle-notch" spin size="3x"></font-awesome-icon>
                <h3 class="mt-3">Loading...</h3>
            </div>
        </template>
        <template v-else>
            <div class="d-flex flex-column w-100 h-100 flex-grow-1">
                <div class="dashboard-header d-flex justify-content-end px-3 pt-3">
                    <div class="header-user-info col-12 col-lg-4 d-flex align-items-center justify-content-around">
                        <img :src="torreUserInfo.pictureThumbnail" width="40px" class="border torre-border rounded-pill" alt="...">
                        <h6> Welcome {{torreUserInfo.name}}</h6>
                        <font-awesome-icon icon="power-off" class="text-danger pointer" @click="logout()" size="lg"></font-awesome-icon>
                    </div>
                </div>
                <div class="dashboard-body d-flex flex-grow-1">
                    <div class="tabs-view col-2 col-lg-1 p-3">
                        <div :class="{'active': !showSaved}" @click="setShowSaved(false)" class="pointer d-flex my-3 nav-tab flex-column align-items-center justify-content-center">
                            <font-awesome-icon icon="search" class="" size="lg"></font-awesome-icon>
                            <small>Search</small>
                        </div>
                        <div :class="{'active': showSaved}" @click="setShowSaved(true)" class="pointer d-flex my-3 nav-tab flex-column align-items-center justify-content-center">
                            <font-awesome-icon icon="save" class="" size="lg"></font-awesome-icon>
                            <small>Saved</small>
                        </div>
                    </div>
                    <div class="list-view col-3 col-lg-4 custom-scrollbar">
                        <div class="d-flex align-items-center type-selector">
                            <div :class="{'active': showJobs}" @click="setShowJobs(true)" class="col-6 pointer text-center type-selector-item">Jobs</div>
                            <div :class="{'active': !showJobs}" @click="setShowJobs(false)" class="col-6 pointer text-center type-selector-item">People</div>
                        </div>
                        <template v-if="showSaved">
                                <div v-if="Array.isArray(userSavedItems) && userSavedItems.length > 0">
                                    <saved-item v-for="savedItem of userSavedItems" :key="savedItem._id" :savedItem="savedItem"/>
                                </div>
                                <div class="d-flex w-100 align-items-center justify-content-center text-center mt-5" v-else>
                                    You have no saved elements. Why don't you try to add some saved elements?
                                </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script lang="ts" src="./dashboard.ts">
</script>
<style scoped lang="scss" src="./dashboard.scss">
</style>
