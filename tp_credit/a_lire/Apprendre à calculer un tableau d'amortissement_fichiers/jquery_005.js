(function($){$.fn.jclock=function(options){var version='2.3.2';var opts=$.extend({},$.fn.jclock.defaults,options);return this.each(function(){$this=$(this);$this.timerID=null;$this.running=false;$this.increment=0;$this.lastCalled=new Date().getTime();var o=$.meta?$.extend({},opts,$this.data()):opts;$this.format=o.format;$this.utc=o.utc;$this.utcOffset=(o.utc_offset!=null)?o.utc_offset:o.utcOffset;$this.seedTime=o.seedTime;$this.timeout=o.timeout;$this.css({fontFamily:o.fontFamily,fontSize:o.fontSize,backgroundColor:o.background,color:o.foreground});$this.daysAbbrvNames=new Array(7);$this.daysAbbrvNames[0]="Dim";$this.daysAbbrvNames[1]="Lun";$this.daysAbbrvNames[2]="Mar";$this.daysAbbrvNames[3]="Mer";$this.daysAbbrvNames[4]="Jeu";$this.daysAbbrvNames[5]="Ven";$this.daysAbbrvNames[6]="Sam";$this.daysFullNames=new Array(7);$this.daysFullNames[0]="Dimanche";$this.daysFullNames[1]="Lundi";$this.daysFullNames[2]="Mardi";$this.daysFullNames[3]="Mercredi";$this.daysFullNames[4]="Jeudi";$this.daysFullNames[5]="Vendredi";$this.daysFullNames[6]="Samedi";$this.monthsAbbrvNames=new Array(12);$this.monthsAbbrvNames[0]="Jan";$this.monthsAbbrvNames[1]="F�v";$this.monthsAbbrvNames[2]="Mar";$this.monthsAbbrvNames[3]="Avr";$this.monthsAbbrvNames[4]="Mai";$this.monthsAbbrvNames[5]="Juin";$this.monthsAbbrvNames[6]="Jui";$this.monthsAbbrvNames[7]="Ao�t";$this.monthsAbbrvNames[8]="Sept";$this.monthsAbbrvNames[9]="Oct";$this.monthsAbbrvNames[10]="Nov";$this.monthsAbbrvNames[11]="D�c";$this.monthsFullNames=new Array(12);$this.monthsFullNames[0]="Janvier";$this.monthsFullNames[1]="F�vrier";$this.monthsFullNames[2]="Mars";$this.monthsFullNames[3]="Avril";$this.monthsFullNames[4]="Mai";$this.monthsFullNames[5]="Juin";$this.monthsFullNames[6]="Juillet";$this.monthsFullNames[7]="Ao�t";$this.monthsFullNames[8]="Septembre";$this.monthsFullNames[9]="Octobre";$this.monthsFullNames[10]="Novembre";$this.monthsFullNames[11]="D�cembre";$.fn.jclock.startClock($this);});};$.fn.jclock.startClock=function(el){$.fn.jclock.stopClock(el);$.fn.jclock.displayTime(el);}
$.fn.jclock.stopClock=function(el){if(el.running){clearTimeout(el.timerID);}el.running=false;}
function getDelay(timeout){if(timeout==60000){var now=new Date();timeout=60000-now.getSeconds()*1000;}return timeout;}$.fn.jclock.displayTime=function(el){var time=$.fn.jclock.currentTime(el);var formatted_time=$.fn.jclock.formatTime(time,el);el.attr('currentTime',time.getTime())
el.html(formatted_time);el.timerID=setTimeout(function(){$.fn.jclock.displayTime(el)},getDelay(el.timeout));}
$.fn.jclock.currentTime=function(el){if(typeof(el.seedTime)=='undefined'){var now=new Date();}else{el.increment+=new Date().getTime()-el.lastCalled;var now=new Date(el.seedTime+el.increment);el.lastCalled=new Date().getTime();}if(el.utc==true){var localTime=now.getTime();var localOffset=now.getTimezoneOffset()*60000;var utc=localTime+localOffset;var utcTime=utc+(3600000*el.utcOffset);var now=new Date(utcTime);}return now}
$.fn.jclock.formatTime=function(time,el){var timeNow="";var i=0;var index=0;while((index=el.format.indexOf("%",i))!=-1){timeNow+=el.format.substring(i,index);index++;var property=$.fn.jclock.getProperty(time,el,el.format.charAt(index));index++;timeNow+=property;i=index}timeNow+=el.format.substring(i);return timeNow;};$.fn.jclock.getProperty=function(dateObject,el,property){switch(property){case"a":return(el.daysAbbrvNames[dateObject.getDay()]);case"A":return(el.daysFullNames[dateObject.getDay()]);case"b":return(el.monthsAbbrvNames[dateObject.getMonth()]);case"B":return(el.monthsFullNames[dateObject.getMonth()]);case"d":return((dateObject.getDate()<10)?"0":"")+dateObject.getDate();case"H":return((dateObject.getHours()<10)?"0":"")+dateObject.getHours();case"I":var hours=(dateObject.getHours()%12||12);return((hours<10)?"0":"")+hours;case"l":var hours=(dateObject.getHours()%12||12);return hours;case"m":return(((dateObject.getMonth()+1)<10)?"0":"")+(dateObject.getMonth()+1);case"M":return((dateObject.getMinutes()<10)?"0":"")+dateObject.getMinutes();case"p":return(dateObject.getHours()<12?"am":"pm");case"P":return(dateObject.getHours()<12?"AM":"PM");case"S":return((dateObject.getSeconds()<10)?"0":"")+dateObject.getSeconds();case"y":return dateObject.getFullYear().toString().substring(2);case"Y":return(dateObject.getFullYear());case"%":return"%";}}
$.fn.jclock.defaults={format:'%H:%M:%S',utcOffset:0,utc:false,fontFamily:'',fontSize:'',foreground:'',background:'',seedTime:undefined,timeout:1000};})(jQuery);