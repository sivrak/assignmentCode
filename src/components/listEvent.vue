<template>
        <v-container>
                    <v-row >
                        <v-col class="col-md-8">
                            <v-card
                            elevation="2"
                            full-height
                            class="formcont" >
                            <v-row>
                                <v-col class="col-md-6 pb-0">
                                    <h4 style="padding:15px; display:inline-block;">List of Events</h4>
                                </v-col>
                                <v-col class="col-md-2 pb-0"></v-col>
                                <v-col class="col-md-4 pb-0">
                                    <v-select
                                    :items="eventItems"
                                    v-model="selectedType"
                                    style="display:inline-block; right:0px; padding:15px;"
                                    label="Events"
                                    @change="findAndDisp"
                                    dense
                                    solo
                                    ></v-select>
                                </v-col>   
                                <v-col class="col-md-4" >                           
                                    <!--<v-card
                                    elevation="2"
                                    full-height
                                    class="formcont">
                                    <h4>Select Date</h4>
                                    <v-date-picker v-model="picker" @change="dateChange"></v-date-picker>
                                    </v-card>-->
                                </v-col> 
                            </v-row>
                                <v-card
                                    max-width="600"
                                    class="mx-auto"
                                    style="margin-bottom:20px;"
                                >

                                    <v-list
                                    subheader
                                    two-line
                                    >
                                    <v-list-item v-if="dispList && dispList.length==0">
                                        No events available in selectedType status.
                                    </v-list-item>
                                    <v-list-item
                                        v-for="(l,index) in dispList"
                                        :key="l.id"
                                    >
                                        <v-list-item-avatar>
                                        <v-icon
                                            :class="l.color+' lighten-1'"
                                            dark
                                        >
                                            mdi-calendar
                                        </v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                        <v-list-item-title v-text="l.name"></v-list-item-title>

                                        <v-list-item-subtitle v-text="l.type"></v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="'Start date - '+l.start"></v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="'End date - '+l.end"></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                        <v-btn elevation="2" icon @click="editEvent(l)">
                                            <v-icon color="blue lighten-1">mdi-lead-pencil</v-icon>
                                        </v-btn>
                                        </v-list-item-action>
                                        <v-list-item-action>
                                        <v-btn elevation="2" icon @click="deleteEvent(index)">
                                            <v-icon color="gray dark-5">mdi-delete</v-icon>
                                        </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>

                                    </v-list>
                                </v-card>
                            </v-card>
                        </v-col>
                        <v-col style="min-height:100vh">
                            <v-card style="min-height:100vh">
                                    <h4 style="padding:15px; display:inline-block;">Select event to enable editing</h4>
                                     <v-container v-if="!selectedEvent.id || selectedEvent.id==''">
                                        <v-row class="intended">
                                        <v-col class="col-md-12">
                                            <p>No event is selected for editing..</p>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    <v-container v-if="selectedEvent.id && selectedEvent.id!=''">
                                        <v-row class="intended">
                                        <v-col class="col-md-12">
                                            <v-text-field
                                                label="Event Name"
                                                outlined
                                                v-model="name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col class="col-md-12">
                                            <v-select
                                            :items="types"
                                            label="Type of Event"
                                            outlined
                                            v-model="typeSelected"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row class="intended">
                                        <v-col class="cent col-md-12 dtc"><h4>Start date</h4>
                                            <v-date-picker
                                                v-model="sdates"
                                            ></v-date-picker>
                                        </v-col>
                                        <v-col class="cent col-md-12 dtc">
                                        <h4>Start time</h4>
                                            <v-time-picker
                                                v-model="stime"
                                                format="24hr"
                                            ></v-time-picker>
                                        </v-col>
                                        <v-col class="cent col-md-12 dtc">
                                        <h4>End time</h4>
                                            <v-time-picker
                                                v-model="etime"
                                                format="24hr"
                                            ></v-time-picker>
                                        </v-col>
                                    </v-row>
                                    <v-row class="intended">
                                        <v-col class="cent col-md-12 dtc">
                                        <span v-if="diffEndDate">
                                            <h4>End date</h4>
                                            <v-date-picker
                                                v-model="edates"
                                            ></v-date-picker>
                                            </span>
                                        </v-col>
                                        <v-col class="cent col-md-12 dtc swtBox">
                                            <v-switch
                                                v-model="diffEndDate"
                                                inset
                                                label="Different EndDate"
                                                ></v-switch>
                                        </v-col>
                                    </v-row>
                                    <v-row class="cent">
                                        <v-col>
                                            <v-btn
                                            class="ma-2"
                                            color="success"
                                            large
                                            elevation='3'
                                            @click="add">
                                            <v-icon
                                            large
                                            color="white darken-2"
                                            class="pr-5"
                                            style="font-size:26px"
                                            >
                                            mdi-table-large-plus
                                            </v-icon>
                                            Update Event
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
        </v-container>
</template>

<script>
  export default {
    name: 'listEvent',
    data: () => ({
      picker:"",
      allList: [],
      completedList: [],
      IncompList: [],
      progList:[],
      dispList:[],
      eventItems:[
          "All", "In progress", "Completed"
      ],
      selectedType:"All",
      selectedEvent:{},
      
            name:"",
            typeSelected: "",
            sdates:"", 
            edates:"", 
            stime:"", 
            etime:"",
            types:["To Start", "In Progress", "Completed"],
            diffEndDate: true,
            id:''
    }),
    props:['eventsfromdomain'],
    watch:{
        eventsfromdomain: {
            immediate: true,
            handler(n){
                this.initData(n);
            }
        }
    },
    methods:{
        dateChange:function(){console.log('date')},
        initData: function(tempdata){
            this.completedList=[];
            this.progList=[];
            this.IncompList=[];
            console.log(tempdata);
            tempdata.forEach(data=>{
                if(data.color=="green"){this.completedList.push(data); data.type="Completed";}
                else if(data.color=="blue"){this.progList.push(data); data.type="In Progress";}
                else if(data.color=="red"){this.IncompList.push(data); data.type="To Start";}
            });
            this.allList=tempdata;
            this.findAndDisp();
        },
        findAndDisp: function(){
            if(this.selectedType=="All"){this.dispList=this.allList;}
            else if(this.selectedType=="In progress"){this.dispList=this.progList;}
            else if(this.selectedType=="Completed"){this.dispList=this.completedList;}
            console.log(this.selectedType,this.dispList);
        },
        deleteEvent: function(e){
            try{
                this.$emit('delete',this.dispList[e].id);
            }catch(e){console.log("ERROR",e);}
        },
        editEvent: function(e){
            this.selectedEvent=e;
            this.name=e.name;
            this.sdates=new Date(e.start).getFullYear()+'-'+(new Date(e.end).getMonth()+1)+'-'+new Date(e.start).getDate();
            this.stime=new Date(e.start).toTimeString().split(' ')[0];
            this.edates=new Date(e.end).getFullYear()+'-'+(new Date(e.end).getMonth()+1)+'-'+new Date(e.end).getDate();
            this.etime=new Date(e.end).toTimeString().split(' ')[0];
            this.typeSelected=e.type;
            this.timed= true;
            this.id= e.id;
        },
        
            "add":function(){
                        let tempData={};
                        if(this.typeSelected && this.typeSelected!="" && this.name && this.name!="" && this.sdates && this.sdates!="" && this.stime && this.stime!=""
                        && this.etime && this.etime!=""){
                            tempData = {
                            name: this.name,
                            start: new Date(this.sdates+" "+this.stime),
                            color: "red",
                            timed: this.selectedEvent.timed,
                            id: this.selectedEvent.id
                            };
                        }else{
                            alert("Required data is missing");
                            return {};
                        }
                        if(this.diffEndDate && this.edates && this.edates!="" ){
                            tempData.end=new Date(this.edates+" "+this.etime);
                        }else{
                            tempData.end=new Date(this.sdates+" "+this.etime);
                        }

                        if(this.typeSelected && this.typeSelected!=""){
                            if(this.typeSelected=="To Start"){tempData.color="red";}
                            else if(this.typeSelected=="In Progress"){tempData.color="blue";}
                            else if(this.typeSelected=="Completed"){tempData.color="green";}
                        }

                        alert("Updating...");
                        setTimeout(()=>{
                        this.$emit('updatedeve',tempData);
                        },1000);

                }
    }
  }
</script>
<style>
.sidebox{
    padding: 20px;
}
</style>