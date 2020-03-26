export function scrollToTop () {
   window.scroll({
       top: 0,
   });
 }


export function scrollToTopSmooth() {
   window.scroll({
      top: 0,
      behavior: "smooth",
   })
}

export function convertTimeToString(dateString) {
   let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

   //date string can also be unixmiliseconds.
   let date = new Date(dateString);

   let year = date.getFullYear();
   let month = months_arr[date.getMonth()];
   let day = date.getDate();

   let militaryHours = date.getHours();
   let AMPM = (militaryHours >= 12) ? 'PM' : 'AM';
   let hours = militaryHours;
   if (hours > 12) {
      hours = hours - 12;
   } else if (hours === 0) {
      hours = 12;
   }

   let minutes = ("0" + date.getMinutes()).substr(-2);
   let seconds = ("0" + date.getSeconds()).substr(-2);



   if (isToday(date)) {
      return `Today at ${hours}:${minutes} ${AMPM}`
   } else if (isYesterday(date)) {
      return `Yesterday at ${hours}:${minutes} ${AMPM}`
   } else {
      return `${month} ${day}, ${year} at ${hours}:${minutes} ${AMPM}`
   }

}

function isToday(dateParameter) {
   let today = new Date();
   return dateParameter.getDate() === today.getDate() && dateParameter.getMonth() === today.getMonth() && dateParameter.getFullYear() === today.getFullYear();
}

function isYesterday(dateParameter) {
   let yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);

   return dateParameter.getDate() === yesterday.getDate() && dateParameter.getMonth() === yesterday.getMonth() && dateParameter.getFullYear() === yesterday.getFullYear()
}