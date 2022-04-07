import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.directive('tooltip',  (el) =>{
      let tooltip = document.getElementById('tooltip_message')
      el.classList.add('tooltip')
      el.addEventListener('mouseout',()=>{
        if(tooltip){
          tooltip.style.display='none';
        }
      })
      el.addEventListener('mouseover', (evt)=>{
        let targetEl = evt.target;

        var posX = evt.clientX;
        var posY = evt.target.getBoundingClientRect().top ;

        let doc_width = window.innerWidth;
 

        if (targetEl.offsetWidth < targetEl.scrollWidth) {
          
          if(!tooltip){
            let app = document.getElementById('app')
            tooltip = document.createElement("div");
            tooltip.setAttribute('id','tooltip_message');
            app.appendChild(tooltip);
          }
          tooltip.innerHTML = evt.target.innerHTML;

          tooltip.style.width='340px';
          tooltip.style.display="block";
          tooltip.style.top = posY + 40 +'px';
          if(doc_width-340 <= posX){
            tooltip.style.right = '20px';
          }else{
            tooltip.style.left = posX +'px';
          }
        } else {
          targetEl.hasAttribute('title') && targetEl.removeAttribute('title');
        }
      });
    }
)