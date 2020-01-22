export function createDashboardLayer(font) {
  return function drawDashboard(context) {
    font.print('MARIO', context, 16, 8);


    font.draw('M', context, 0, 0);
    font.draw('A', context, 8, 0);
    font.draw('R', context, 16, 0);
    font.draw('I', context, 24, 0);
    font.draw('O', context, 32, 0);

  }
}