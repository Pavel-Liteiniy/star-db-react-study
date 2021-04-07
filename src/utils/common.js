export const getNumberFormat = ( value ) => {
  if (value === undefined || value === null) {
    return
  }
  
  return value.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ` ` );
};

export const getRandomInteger = ( max, min = 0 ) => {
  let rand = min + Math.random() * ( max + 1 - min )
  return Math.floor( rand )
}
