<template>
    <v-card
    elevation="2"
    class="formcont">
        <v-container>
                    <v-row>
                        <v-col>
                            <h3>Enter the following details to create an event...</h3>
                        </v-col>
                    </v-row>
                    <v-row class="intended">
                        <v-col class="col-md-5">
                            <v-text-field
                                label="Event Name"
                                outlined
                                v-model="name"
                            ></v-text-field>
                        </v-col>
                        <v-col class="col-md-1">
                        </v-col>
                        <v-col class="col-md-5">
                            <v-select
                            :items="types"
                            label="Type of Event"
                            outlined
                            v-model="typeSelected"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row class="intended">
                        <v-col class="cent col-md-4 dtc"><h4>Start date</h4>
                            <v-date-picker
                                v-model="sdates"
                            ></v-date-picker>
                        </v-col>
                        <v-col class="cent col-md-4 dtc">
                        <h4>Start time</h4>
                            <v-time-picker
                                v-model="stime"
                                format="24hr"
                            ></v-time-picker>
                        </v-col>
                        <v-col class="cent col-md-4 dtc">
                        <h4>End time</h4>
                            <v-time-picker
                                v-model="etime"
                                format="24hr"
                            ></v-time-picker>
                        </v-col>
                    </v-row>
                    <v-row class="intended">
                        <v-col class="cent col-md-4 dtc">
                        <span v-if="diffEndDate">
                            <h4>End date</h4>
                            <v-date-picker
                                v-model="edates"
                            ></v-date-picker>
                            </span>
                        </v-col>
                        <span class="col-md-6"></span>
                        <v-col class="cent col-md-2 dtc swtBox">
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
                            Create Event
                            </v-btn>
                        </v-col>
                    </v-row>

        </v-container>
    </v-card>
</template>

<script>
    import dataAccess from '../service/dataAccess'; 
    export default {
        name: 'CreateEventComp',
        data: () => ({
            name:"",
            typeSelected: "",
            sdates:"", 
            edates:"", 
            stime:"", 
            etime:"",
            types:["To Start", "In Progress", "Completed"],
            diffEndDate: false
            }),
        methods:{
            "add":function(){
                        let tempData={};
                        if(this.typeSelected && this.typeSelected!="" && this.name && this.name!="" && this.sdates && this.sdates!="" && this.stime && this.stime!=""
                        && this.etime && this.etime!=""){
                            tempData = {
                            name: this.name,
                            start: new Date(this.sdates+" "+this.stime),
                            color: "red",
                            timed: true,
                            id: new Date().getTime()
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

                        dataAccess.setEvents(tempData);
                        alert("Creation succeded");
                        setTimeout(()=>{
                            this.$emit('backToHome');
                        },500);

                }
        }
  }
</script>


<style>
.formcont{
    margin: 10px 20px;
    padding: 4px 10px;
}
.intended{
    padding-left: 10%;
}
.cent{
    text-align: center;
}
h4{
        text-align: left;
}
.dtc{
    padding:0px;
}
.swtBox{
    text-align:right;
}
</style>