
    export default {
        allEvents:[],
        setEvents: function(data){
                // if(this.allEvents.length==0)
                this.allEvents.push(data);
                // else this.allEvents.pop();
                console.log("set",data,this.allEvents);
                this.updatelocal();
            },
        getEvents: function(){
                console.log("allEvents",this.allEvents);
                this.updatelocal();
                return(this.allEvents);
            },
        delete: function(e){
            console.log("DELETE",e);
            let selectedInd='';
            this.allEvents.forEach((val,i)=>{
                if(val.id==e){
                    selectedInd=i;
                }
            });
            this.allEvents.splice(selectedInd,1);
            this.updatelocal();
            return(this.allEvents);
        },
        update: function(e){
            console.log("update",e);
            let flag=true;
            this.allEvents=this.allEvents.map((val)=>{
                console.log(val.id==e.id);
                if(val.id==e.id){
                    val=e;
                    flag=false;
                }
                return(val);
            });
            if(flag){alert('Update failed');}
            this.updatelocal();
            return(this.allEvents);
        },
        updatelocal:function(){
            if (localStorage) {
                localStorage.setItem('eventsdata', JSON.stringify({data:this.allEvents}))
              }else{
                  alert("Browser Not supported for local storage...");
              }
        },
        retrivelocal:function(){
            if (localStorage) {
                if(localStorage.getItem('eventsdata') && localStorage.getItem('eventsdata')!=null)
                    this.allEvents = JSON.parse(localStorage.getItem('eventsdata')).data;
                    console.log(this.allEvents)
                    this.allEvents.forEach(val=>{
                        val.start=new Date(val.start);
                        val.end=new Date(val.end);
                    });
              }else{
                  alert("Browser Not supported for local storage...");
              }
              return(this.allEvents);
        }
    }