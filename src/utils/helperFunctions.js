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