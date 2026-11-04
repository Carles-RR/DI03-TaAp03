import { Component, input, effect, viewChild, ElementRef, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { Seleccion } from '../../interface/seleccion';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnDestroy {

  selecciones = input<Seleccion[]>([]);

  // TODO - Inicializar el canvas de la gráfica de donuts
  private canvasDona = null;

  private charts = new Map<string, Chart>();

  // TODO - Añadir el effect para definir la lógica de renderizado de la gráfica de donuts
  constructor() {
    effect(() => {

    });
  }

  private destroyChart(key: string) {
    this.charts.get(key)?.destroy();
    this.charts.delete(key);
  }

  // Gráfico de donuts: goles totales anotados por cada grupo
  private renderDona(data: Seleccion[], canvas: HTMLCanvasElement) {
    // TODO - Destruir la gráfica de donuts si ya existe

    //TODO - Crea un nuevo Array con los grupos existentes

    //TODO - Crea un nuevo Array con los goles totales por grupo

    const colores = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948'];

    // TODO - Crea la gráfica de donuts con los datos de grupos y goles totales
    this.charts.set('dona', new Chart(canvas, {
      type: '',
      data: {
        //TODO - Añadir los labels y datasets de la gráfica de donuts
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: colores,
          borderColor: '#fff',
          borderWidth: 3,
          //TODO - hoverOffset: Cuanto sobresale el "quesito" 

        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //TODO - cutout: Cuanto hueco queda dentro del doughnout. Si se pone 0, sería como pie chart
        cutout: '',
        plugins: {
          legend: {
            //TODO - position: Posición de la leyenda. Puede ser 'top', 'left', 'bottom', 'right' o 'center'
            position: '',
            //TODO - labels: Color, padding y tamaño de fuente de la leyenda
            labels: { }
          },
          title: {
            //TODO - display: Si se muestra o no el título de la gráfica

            //TODO - text: Texto del título de la gráfica
            text: '4',
            font: { size: 15, weight: 'bold' },
            color: '#333',
            padding: { bottom: 14 }
          },
          //TODO - tooltip: Personalización del tooltip que aparece al pasar el ratón por encima de un "quesito"
          tooltip: {
            callbacks: {
              
            }
          }
        }
      }
    }));
  }

  ngOnDestroy() {
    this.charts.forEach(c => c.destroy());
    this.charts.clear();
  }
}
