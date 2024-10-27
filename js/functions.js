function checkLength(string, maxLength){
  return string.length <= maxLength;
}
checkLength('dowl,dwp', 10);

const isPalindrome = function(str) {

  const cleanedStr = str.replaceAll(' ', '').toLowerCase();
  for(let i = 0; i < cleanedStr.length / 2; i ++){
    if(cleanedStr.at(i) !== cleanedStr.at(-i - 1)){
      return false;
    }
    return true;
  }
}

isPalindrome('шалаш');
