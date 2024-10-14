
export const genRandomInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min

//*OYY!3@U6.y
export const generateRandomString = () => {
  
   let input = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",0,1,2,3,4,5,6,7,8,9]

   let stringNumber =  genRandomInRange(8,12) ,inputLength = input.length
   let randomString = '';
     for(let i=0;i<stringNumber;i++){
          
          randomString += input[genRandomInRange(0,inputLength)]
     }

     return randomString

}