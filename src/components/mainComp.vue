<template>
  <v-card color="basil" style="height:100%">
    <v-card-title class="text-center justify-center py-6">
      <div style="width:100%"><h1 class="font-weight-bold display-3 basil--text">
        Calender
      </h1></div>
      <div><p style="color: #33333370;margin:0px">Interview Assignment By SivaRamaKrishnan M.. </p></div>
    </v-card-title>
        <v-tabs
        class="tabBorder"
        v-model="tab"
        background-color="transparent"
        show-arrows
        grow
        >
        <v-tab
            v-for="item in items"
            :key="item.title"
        >
            {{ item.title }}
        </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">

        <v-tab-item
            v-for="item in items"
            :key="item.title"
            >
            <div v-show="item.title=='Home'">
                <calendarComp :eventsfromdomain="dd"/>
            </div>
            <div v-if="item.title=='Create Event'">
                <createEvent @backToHome="tohome" />
            </div>
            <div v-if="item.title=='List Events'">
                <listEvent :eventsfromdomain="dd" @delete="deletebyId" @updatedeve="updatebyObj"/>
            </div>
        </v-tab-item>
        </v-tabs-items>
  </v-card>
</template>
<script>
import calendarComp from './calendarComp.vue';
import createEvent from './createEvent.vue';
import listEvent from './listEvent.vue';
import dataAccess from '../service/dataAccess';
    export default {
        name: "mainComp",
        components: {calendarComp,createEvent,listEvent},
        mounted(){
            // dataAccess.setEvents(
            // {
            //     name: "event type2",
            //     start: new Date("03-12-2021  01:00:00"),
            //     end: new Date("03-13-2021  05:00:00"),
            //     color: "blue",
            //     timed: true,
            //     id: new Date().getTime()
            // });
            // this.dd = dataAccess.getEvents();
            this.dd = dataAccess.retrivelocal();
        },
        data () {
            return {
                dd: [],
                tab: null,
                items: [
                {title:"Home",comp:""},
                {title:"Create Event",comp:""},
                {title:"List Events",comp:""},
                ],
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
            },
        methods:{
            tohome:function(){
                this.tab=0;
            },
            deletebyId:function(e){
               this.dd = dataAccess.delete(e);
            },
            updatebyObj:function(e){
                this.dd = dataAccess.update(e);
                console.log("Updated dd",this.dd);
            }
        }
     
    }
</script>
<style>
.basil--text {
  color: #525252 !important;
}
.tabBorder{
    border-bottom: 1px solid #33333344;
}
</style>