let colorIndex = 0;

export const colors = ['#E55137','#00BB2D', '#DE4C8A', '#0ba3bb', '#afb21e', '#2aa57e' , '#1421be', '#ff7905']

export const getRandomColor = function(){
    const color = colorIndex++;
    colorIndex = colorIndex % colors.length;
    return colors[color];
}