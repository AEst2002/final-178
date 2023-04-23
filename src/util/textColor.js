const textColor = (hexCode) => {
    if (hexCode[0] !== "#") {
        hexCode = "#" + hexCode
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);
    const rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

    if ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) < 150){
        return '#FFFFFF'
    }
    return '#000000'
}





export default textColor