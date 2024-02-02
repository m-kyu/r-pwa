// sw.js
self.addEventListener('install',(event)=>{
    console.log('설치완료')
    event.waitUntil(self.skipWaiting());
})

self.addEventListener('activate',(event)=>{
    event.waitUntil(self.clients.claim());
    // console.log('서비스워커 동작 시작되고 있음...')
})

self.addEventListener('fetch',(a)=>{
    console.log('데이터 요청시 처리....')
})

self.addEventListener('push',(event)=>{
   console.log('메세지가?....', event);

   const option = {
    body: 'sdfsdfsdfsdf',
    icon:'1.jpg',    /* 제목옆에 작은 원형이미지 */
    image:'2.jpg',  /* 내용썸네일 */
    badge:'3.jpg',
    vibrate:[200,100,300],
    actions:[
        {action:'open', title:'자세히보기'},
        {action:'close', title:'닫기'}
    ]
   }
   
   self.registration.showNotification('title', option);
})


self.addEventListener('notificationclick',(event)=>{
    // console.log(event)
    // console.log(clients)
    event.waitUntil(
        self.clients.matchAll().then(function(clientList) {
            console.log(clientList)
            if(event.action == 'open'){
                //자세히보기 
                return self.clients.openWindow('https://naver.com');
            }else{
                //닫기
                return event.notification.close();
            }
        })
    );
});
