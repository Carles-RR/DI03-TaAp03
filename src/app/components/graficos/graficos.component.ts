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
  private canvasDona = viewChild<ElementRef<HTMLCanvasElement>>('canvasDona');

  private charts = new Map<string, Chart>();

  // TODO - Añadir el effect para definir la lógica de renderizado de la gráfica de donuts
  constructor() {
  effect(() => {
    const data = this.selecciones();
    const canvas = this.canvasDona()?.nativeElement;

    if (!canvas || data.length === 0) {
      this.destroyChart('dona');
      return;
    }

    this.renderDona(data, canvas);
  });
}

  private destroyChart(key: string) {
    this.charts.get(key)?.destroy();
    this.charts.delete(key);
  }

  // Gráfico de donuts: goles totales anotados por cada grupo
  private renderDona(data: Seleccion[], canvas: HTMLCanvasElement) {
    // TODO - Destruir la gráfica de donuts si ya existe
    this.destroyChart('dona');

    //TODO - Crea un nuevo Array con los grupos existentes
    const grupos = [...new Set(data.map(s => s.grupo))].sort();

    //TODO - Crea un nuevo Array con los goles totales por grupo
    const totales = grupos.map(g =>
      data.filter(s => s.grupo === g).reduce((acc, s) => acc + s.goles, 0)
    );
    const colores = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948'];

    // TODO - Crea la gráfica de donuts con los datos de grupos y goles totales
    this.charts.set('dona', new Chart(canvas, {
      type: 'doughnut',
      data: {
        //TODO - Añadir los labels y datasets de la gráfica de donuts
        labels: grupos.map(g => 'Grupo ' + g),
        datasets: [{
          data: totales,
          backgroundColor: colores,
          borderColor: '#fff',
          borderWidth: 3,
          //TODO - hoverOffset: Cuanto sobresale el "quesito" 
          hoverOffset: 12
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        //TODO - cutout: Cuanto hueco queda dentro del doughnout. Si se pone 0, sería como pie chart
        cutout: '60%',
        plugins: {
          legend: {
            //TODO - position: Posición de la leyenda. Puede ser 'top', 'left', 'bottom', 'right' o 'center'
            position: 'bottom',
            //TODO - labels: Color, padding y tamaño de fuente de la leyenda
            labels: { 
              color: '#ddd',
              padding: 16,
              font: { size: 13 }
            }
          },
          title: {
            //TODO - display: Si se muestra o no el título de la gráfica
            display: true,
            //TODO - text: Texto del título de la gráfica
            text: 'Goles totales por grupo',
            font: { size: 15, weight: 'bold' },
            color: '#ddd',
            padding: { bottom: 14 }
          },
          //TODO - tooltip: Personalización del tooltip que aparece al pasar el ratón por encima de un "quesito"
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
                const valor = ctx.parsed;
                const porcentaje = ((valor / total) * 100).toFixed(1);
                return ` ${valor} goles (${porcentaje}%)`;
              }
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
