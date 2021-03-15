<template>
<div>
    <v-row class="fill-height">
        <v-col class="col-sm-12 col-md-3">    
           <v-card elevation="2" class="sideBox">
            <div style="text-align:center">
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                >
                    <v-icon small>
                    mdi-chevron-left
                    </v-icon>
                </v-btn>
                <span style="font-weight:600; color:#33333360" v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </span>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                >
                    <v-icon small>
                    mdi-chevron-right
                    </v-icon>
                </v-btn>
            </div>
            <v-btn
                outlined
                class="fullBtn mr-4"
                color="grey darken-2"
                @click="setToday"
            >
                <v-icon style="padding-right:10px; font-size: 20px;">mdi-calendar-cursor</v-icon> 
                Focus today
            </v-btn>
            <br><br>
            <v-divider></v-divider>
            <br>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list shaped>
      <v-subheader>View By</v-subheader>
      <v-list-item-group
        v-model="viewBySelect"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in viewBy"
          :key="i"
          @click="type = item.value">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</v-card>
</v-col>
        <v-col  class="col-sm-12 col-md-9">
        <v-sheet height="28">
        </v-sheet>
        <v-sheet height="600">
            <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            ></v-calendar>
            <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            >
            <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
            >
                <v-toolbar
                :color="selectedEvent.color"
                dark
                >
                <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                </v-toolbar>
                <v-card-text>
                <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                >
                    Cancel
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-menu>
        </v-sheet>
        </v-col>
    </v-row>
</div>
</template>

<script>
  export default {
    name:"calendarComp",
    data: () => ({
      viewBy: [
        { text: 'Month', icon: 'mdi-calendar-multiselect', value:'month' },
        { text: 'Week', icon: 'mdi-calendar-range', value:'week' },
        { text: 'Day', icon: 'mdi-calendar-today',value:'day' },
        ],
      viewBySelect: 0,
      focus: '',
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange();
    },
    props:['eventsfromdomain'],
    watch:{
        eventsfromdomain: {
            immediate: true,
            handler(n,o){
            console.log("watch",this.eventsfromdomain,n,o);
            let events=[];
            this.eventsfromdomain.forEach(val=>{
                events.push(val);
            });
            this.setEvetsUpdated(events);
            }
        }
    },
    methods: {
      setEvetsUpdated(events){
            this.events=events;
            this.viewBySelect=1;
            this.type='week';
            this.setToday();
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
        this.viewBySelect=2;
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = '';
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
    },
  }
</script>

<style>
.sideBox{
    margin:10px;
    padding: 10px;
    height:100%;
}
.fullBtn{
    width:100%;
    border-color: #33333330;
}
</style>