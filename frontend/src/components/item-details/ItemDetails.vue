<template>
    <div class="w-100 p-2">
        <template v-if="loading">
            <div class="w-100 d-flex align-items-center justify-content-center py-4">
                <font-awesome-icon icon="circle-notch" spin size="lg"></font-awesome-icon>
            </div>
        </template>
        <template v-else>
            <div class="w-100 d-flex flex-column align-items-center justify-content-center py-3" v-if="error || !savedItemInfo">
                <p class="text-center" v-if="!savedItemInfo">
                    We can't show the information
                </p>
                <p class="text-center text-danger" v-else>
                    There was a problem loading the information: {{error}}
                </p>
                <button @click="deleteItem()" :disabled="loadingChanges" class="btn btn-sm btn-danger">
                    <small>
                        Delete
                    </small>
                </button>
            </div>
            <div class="w-100 d-flex flex-column align-items-start justify-content-around pt-4 pb-2 px-2" v-else>
                <div class="d-flex w-100 align-items-center justify-content-end">
                    <font-awesome-icon class="pointer" @click="close()" icon="times" size="2x"></font-awesome-icon>
                </div>
                <template v-if="type === 'JOB'">
                    <div class="d-flex w-100">
                        <div class="col-6">
                            <h6 class="torre-color">
                                {{savedItemInfo.objective}}
                            </h6>
                        </div>
                        <div class="d-flex col-6 align-items-center justify-content-around">
                            <font-awesome-icon @click="starItem()" :class="{'gold': isStarred}" class="pointer" icon="star" size="lg"></font-awesome-icon>
                            <button @click="deleteOrSaveItem()" :class="{'torre-button': !savedItem, 'btn-danger': savedItem}" :disabled="loadingChanges" class="btn btn-sm">
                                <small>
                                    {{!!savedItem ? 'Delete' : 'Save'}}
                                </small>
                            </button>
                        </div>
                    </div>
                    <template>
                        <div v-for="detail of jobDetails" class="mt-5" :key="detail.code">
                            <h6 class="torre-color">{{capitalizeFirstLetter(detail.code)}}</h6>
                            <small style="line-height: 25px" class="d-flex flex-column align-items-center justify-content-center" v-html="processContent(detail.content)"></small>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div class="d-flex w-100">
                        <div class="col-6">
                            <h3 class="torre-color">
                                <b>
                                    {{savedItemInfo.name ? savedItemInfo.name : 'No name found'}}
                                </b>
                            </h3>
                        </div>
                        <div class="d-flex col-6 align-items-center justify-content-around">
                            <font-awesome-icon :class="{'gold': isStarred}" @click="starItem()" class="pointer" icon="star" size="lg"></font-awesome-icon>
                            <button @click="deleteOrSaveItem()" :class="{'torre-button': !savedItem, 'btn-danger': savedItem}" :disabled="loadingChanges" class="btn btn-sm">
                                <small>
                                    {{!!savedItem ? 'Delete' : 'Save'}}
                                </small>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-around w-100">
                        <div class="col-6 d-flex align-items-center justify-content-center">
                            <img v-if="savedItemInfo.picture || savedItemInfo.pictureThumbnail" :src="savedItemInfo.picture ? savedItemInfo.picture : savedItemInfo.pictureThumbnail" width="200px" class="border torre-border rounded-pill" alt="...">
                            <font-awesome-icon v-else icon="user" class="my-5" size="5x"></font-awesome-icon>

                        </div>
                        <div class="col-6 d-flex flex-column align-items-start justify-content-center">
                            <b>{{savedItemInfo.name ? savedItemInfo.name : 'No name found'}}</b>
                            <p>{{savedItemInfo.professionalHeadline ? savedItemInfo.professionalHeadline : 'No headline found'}}</p>
                        </div>
                    </div>
                    <div class="w-100 d-flex mt-3">
                        <div class="col-6 px-5">
                            <p >
                                <small>
                                    {{savedItemInfo.summaryOfBio ? savedItemInfo.summaryOfBio : 'No biography found'}}
                                </small>
                            </p>
                        </div>
                        <div class="col-6">
                            <b>
                                <p>Location</p>
                            </b>
                            <small>{{savedItemInfo.location.shortName ? savedItemInfo.location.shortName : 'No location found'}}</small>
                        </div>
                    </div>
                </template>
            </div>
        </template>

    </div>
</template>
<style scoped lang="scss" src="./item-details.scss">
</style>
<script lang="ts" src="./item-details.ts">
</script>
