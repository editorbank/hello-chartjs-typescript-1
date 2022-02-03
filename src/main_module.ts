console.log("Hello from main_module.ts!");
import {
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';

import {
  BarController,
  BarElement,
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// What you register will depend on what chart you are using and features used.
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
Chart.register(LineController, LineElement,PointElement);

type InData = {
  color :string;
  Xs :string[];
  labelY ?:string;
  Ys :number[];
  maxY :number;
  maxColor :string;
  maxLabelLen ?:number|0;
}

var in_data :InData = {
  color: 'rgba(0, 255, 0, 0.6)',
  Xs: [ "США", "Индонезия (Очень длинное название)", "Китай", "Индия", "Бразилия", "Пакистан", "Нигерия", "Бангладеш", "Россия", "Япония"],
  labelY: 'Население',
  Ys: [326625791, 260580739, 1379302771, 1281935911, 207353391, 204924861, 190632261, 157826578, 142257519, 126451398],
  maxY: 400000000,
  maxColor: 'rgba(255, 0, 0, 0.6)',
  maxLabelLen: 15,
}

export function crop_string(s :string, maxLen :number = 0) :string {
  if(s.length > maxLen && maxLen !== 0)
    return s.substring(0,maxLen) + '...'
  else
    return s;
}
export function chart_draw(canvas :HTMLCanvasElement, in_data :InData){
  if(canvas) new Chart(canvas, {
    type: 'bar',
    options: {
      plugins: {
        legend: {display: false}
      }
    },
    data: {
      labels: in_data.Xs.map(x=>crop_string(x,in_data.maxLabelLen)),
      datasets: [{
        label: in_data.labelY||'',
        data: in_data.Ys,
        borderColor: 'red',
        backgroundColor: in_data.Ys.map(x => x>=in_data.maxY?in_data.maxColor:in_data.color),
      }]
    }
  });
}
export function chart_draw2(canvas :HTMLCanvasElement, in_data :InData){
  if(canvas) new Chart(canvas, {
    type: 'line',
    options: {
      plugins: {
        legend: {display: false}
      }
    },
    data: {
      labels: in_data.Xs.map(x=>crop_string(x,in_data.maxLabelLen)),
      datasets: [{
        label: in_data.labelY||'',
        data: in_data.Ys,
        borderColor: 'red',
        //backgroundColor: in_data.Ys.map(x => x>=in_data.maxY?in_data.maxColor:in_data.color),
        indexAxis: 'x'
      }]
    }
  });
}

export function on_load() {
  console.log("on_load() start...");
  var messageTop = document.getElementById('messageTop') as HTMLParagraphElement;
  if(messageTop) messageTop.innerText = "Start Charting...";
  console.log("on_load() messageTop:" + messageTop);

  console.log("on_load() found canvas element and draw it...");
  var canvas1 = (document.getElementById('myChart') as HTMLCanvasElement);
  if(canvas1){
    console.log("on_load() canvas1:" + canvas1);
    chart_draw(canvas1, in_data);
  }

  var messageBottom = document.getElementById('messageBottom') as HTMLParagraphElement;
  if(messageBottom) messageBottom.innerText = "Done Charting.";

  console.log("on_load() create canvas element into bottom body and draw it...");
  var div2 = document.createElement('div') as HTMLDivElement;
  div2.style.width = '600px';
  div2.style.height = '300px';
  div2.style.border = '1px solid gray';
  var h2 = document.createElement('h2') as HTMLHeadingElement;
  h2.textContent = in_data.labelY;
  document.body.appendChild(h2);
  var canvas2 = document.createElement('canvas') as HTMLCanvasElement;
  div2.appendChild(canvas2);
  document.body.appendChild(div2);
  chart_draw2(canvas2, in_data);

  console.log("on_load() done.");
}
console.log("Done main_module.ts.");
