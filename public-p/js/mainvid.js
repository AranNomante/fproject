let tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";let player1,player2,player3,player4,player5,firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);let synchronization=!1,load_mode="i",room_video={player1:{play:"UNSTARTED",current_time:0,video_id:""},player2:{play:"UNSTARTED",current_time:0,video_id:""},player3:{play:"UNSTARTED",current_time:0,video_id:""},player4:{play:"UNSTARTED",current_time:0,video_id:""},player5:{play:"UNSTARTED",current_time:0,video_id:""}};const titles={player1:"pt_1",player2:"pt_2",player3:"pt_3",player4:"pt_4",player5:"pt_5"},states={player1:{isMuted:!1,display:1,play:"UNSTARTED",firstTime:!0},player2:{isMuted:!1,display:0,play:"UNSTARTED",firstTime:!0},player3:{isMuted:!1,display:0,play:"UNSTARTED",firstTime:!0},player4:{isMuted:!1,display:0,play:"UNSTARTED",firstTime:!0},player5:{isMuted:!1,display:0,play:"UNSTARTED",firstTime:!0}},reversePmap={player1:null,player2:null,player3:null,player4:null,player5:null};function onYouTubeIframeAPIReady(){player1=initPlayer("player1"),player2=initPlayer("player2"),player3=initPlayer("player3"),player4=initPlayer("player4"),player5=initPlayer("player5"),reversePmap.player1=player1,reversePmap.player2=player2,reversePmap.player3=player3,reversePmap.player4=player4,reversePmap.player5=player5}function initPlayer(e){return new YT.Player(e,{videoId:"5qap5aO4i9A",events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange,onError:onPlayerError},playerVars:{autoplay:1,controls:2,disablekb:1,iv_load_policy:3,modestbranding:1,showinfo:0,enablejsapi:1,origin:window.location.origin,rel:0,ecver:2,playsinline:1}})}function onPlayerReady(e){const t=e.target.h.id;setPlayerTitle(e),e.target.mute(),setState(t,e)}function onPlayerStateChange(e){const t=e.target.h.id;e.data==YT.PlayerState.PLAYING&&states[t].firstTime&&(setPlayerTitle(e),e.target.pauseVideo(),e.target.seekTo(0),states[t].firstTime=!1),setState(t,e)}function onPlayerError(e){150===e.data&&setSnack("This video does not allow embeds"),setState(e.target.h.id,e)}function extractYTid(e){if("string"==typeof e&&e.length>0&&e.includes("v=")){let t=e.split("v=")[1];return t.includes("&")&&(t=t.split("&")[0]),t}return""}function setState(e,t){states[e].play=getPlayState(t.data,e),t.target&&(states[e].isMuted=t.target.isMuted()),setAllstates()}function setAllstates(){const e=$(".playall");let t="PAUSED";Object.keys(states).forEach(e=>{let a=states[e].play;"PLAYING"===a&&"PAUSED"===t?t=a:"ENDED"===a&&(t=a)}),"PLAYING"===t?e.text("Pause⏸️"):"ENDED"===t?e.text("Restart🔄"):e.text("Play▶️")}function getPlayState(e,t){const a=$(`.play.p_${t.substring(6,7)}`);switch(e){case-1:return"UNSTARTED";case 0:return a.text("Restart🔄"),"ENDED";case 1:return a.text("Pause⏸️"),"PLAYING";case 2:return a.text("Play▶️"),"PAUSED";case 3:return"BUFFERING";case 5:return a.text("Play▶️"),"CUED";default:return null}}$(".play").on("click",function(){const e="player"+$(this).attr("class").split(" ")[1].split("_")[1],t=reversePmap[e];if(t)switch(states[e].play){case"CUED":t.playVideo();break;case"ENDED":t.seekTo(0);break;case"PLAYING":t.pauseVideo();break;case"PAUSED":t.playVideo()}}),$(".playall").on("click",function(){let e=!0,t="PAUSED",a=["CUED","ENDED","PLAYING","PAUSED"];Object.keys(states).forEach(r=>{let s=states[r].play;a.includes(s)?"PLAYING"===s&&"PAUSED"===t?t=s:"ENDED"===s&&(t=s):e=!1}),e&&("ENDED"===t?Object.keys(reversePmap).forEach(e=>{reversePmap[e].pauseVideo(),reversePmap[e].seekTo(0),reversePmap[e].playVideo()}):"PLAYING"===t?Object.keys(reversePmap).forEach(e=>{reversePmap[e].pauseVideo()}):Object.keys(reversePmap).forEach(e=>{reversePmap[e].playVideo()}))}),$(".unmute").on("click",function(){const e="player"+$(this).attr("class").split(" ")[1].split("_")[1];reversePmap[e].unMute(),states[e].isMuted=!1}),$(".mute").on("click",function(){const e="player"+$(this).attr("class").split(" ")[1].split("_")[1];reversePmap[e].mute(),states[e].isMuted=!0}),$(".display").on("click",function(){const e="player"+$(this).attr("class").split(" ")[1].split("_")[1],t=$(`#${e}`);let a=0;Object.keys(states).forEach(e=>{a+=states[e].display}),organizeVidDisplay(t,states[e].display,a)}),$(".unmuteall").on("click",function(){Object.keys(reversePmap).forEach(e=>{reversePmap[e].unMute()})}),$(".muteall").on("click",function(){Object.keys(reversePmap).forEach(e=>{reversePmap[e].mute()})});const nmMap={0:"no",1:"solo",2:"two",3:"three",4:"four",5:"five"};function organizeVidDisplay(e,t,a){let r=nmMap[a],s=1===t?nmMap[a-1]:nmMap[a+1];1===t?e.removeClass(r):e.addClass(s),a>0&&$(".vid."+r).removeClass(r).addClass(s),states[e.attr("id")].display=1===t?0:1}function loadAll(){let e=$("#load_all").val();(e=extractYTid(e)).length>0?(Object.keys(reversePmap).forEach(t=>{reversePmap[t].pauseVideo(),reversePmap[t].loadVideoById(e,0),states[t].firstTime=!0}),resetVideoInputs()):setSnack("Couldn't load, URL corrupt.")}function loadIndividual(){const e={player1:$("#load_1").val(),player2:$("#load_2").val(),player3:$("#load_3").val(),player4:$("#load_4").val(),player5:$("#load_5").val()};Object.keys(e).forEach(t=>{if(e[t].length>0){let a=extractYTid(e[t]);a.length>0?(reversePmap[t].pauseVideo(),reversePmap[t].loadVideoById(a,0),states[t].firstTime=!0):setSnack("Couldn't load, URL corrupt.")}}),resetVideoInputs()}function resetVideoInputs(){$("#load_1").val(""),$("#load_2").val(""),$("#load_3").val(""),$("#load_4").val(""),$("#load_5").val(""),$("#load_all").val("")}function setPlayerTitle(e){const t=e.target.h.id,a=e.target.getVideoData().title;let r=a.substring(0,40);r+=a.length>40?"...":"",$(`#${titles[t]}`).text(r)}function synchronizePlayers(){if(synchronization&&validRoom()){resetVideoInputs();let e=!1;if(Object.keys(room_video).forEach(t=>{extractYTid(reversePmap[t].getVideoUrl())!=room_video[t].video_id&&($(`#load_${t.substring(6,7)}`).val(`https://www.youtube.com/watch?v=${room_video[t].video_id}`),e=!0)}),e)return void loadIndividual();let t=["PLAYING","PAUSED","ENDED"];Object.keys(room_video).forEach(e=>{let a=room_video[e].play,r=states[e].play,s=reversePmap[e],l=coolRound(room_video[e].current_time),o=coolRound(s.getCurrentTime());t.includes(a)&&t.includes(r)&&(a!==r&&("PLAYING"===a?s.playVideo():s.pauseVideo()),l-.5<=o&&l+.5>=o||s.seekTo(getDesiredTime(o,l)))})}}function coolRound(e){return Math.round(100*(e+Number.EPSILON))/100}function getDesiredTime(e,t){return t}function syncInfo(){let e=subscriptions[socket.id];validRoom()?socket.emit("getSyncInfo",e):e&&(Object.keys(room_video).forEach(e=>{room_video[e].current_time=reversePmap[e].getCurrentTime(),room_video[e].video_id=extractYTid(reversePmap[e].getVideoUrl()),room_video[e].play=states[e].play}),socket.emit("setSyncInfo",{room_name:e,player_states:room_video}))}function validRoom(){let e=subscriptions[socket.id];if(e){let t=rooms.findIndex(function(t,a){if(t.room_name===e)return!0});return!(rooms[t].owner===socket.id)}return!1}$(".displayall").on("click",function(){let e=0;Object.keys(states).forEach(t=>{e+=states[t].display});for(let e=0;e<6;e++)Object.keys(reversePmap).forEach(t=>{$("#"+t).removeClass(nmMap[e])});e>0?Object.keys(reversePmap).forEach(e=>{$("#"+e).addClass(nmMap[0])}):Object.keys(reversePmap).forEach(e=>{$("#"+e).addClass(nmMap[5])}),Object.keys(states).forEach(t=>{states[t].display=e>0?0:1})}),$("#toggle_load").on("click",function(){"none"===$("#load_all").parent().css("display")?($(".load_i").parent().css("display","none"),$("#load_all").parent().css("display","block"),load_mode="a"):($(".load_i").parent().css("display","block"),$("#load_all").parent().css("display","none"),load_mode="i")}),$("#load_init").on("click",function(){"i"===load_mode?loadIndividual():loadAll()}),$(".setsynchronized").on("click",function(){let e=(synchronization=!synchronization)?"Sync: On ✅":"Sync: Off ❎";$(this).text(e)}),socket.on("synchronizePlayers",e=>{e&&(room_video=e,synchronizePlayers())}),$(".restart,.restartall").on("click",function(){let e=$(this).attr("class");if(e.includes("restartall"))Object.keys(reversePmap).forEach(e=>{reversePmap[e].seekTo(0)});else if(e.includes("restart")){const t="player"+e.split(" ")[1].split("_")[1];reversePmap[t].seekTo(0)}}),setInterval(syncInfo,100);
