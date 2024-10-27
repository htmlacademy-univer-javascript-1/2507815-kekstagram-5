
const checkLength = function(lengthStr, maxLength){
  if(lengthStr <= maxLength){
    return true;
  }
  return false;
}

const isPalindrome = function(str) {
  // Убираем все не буквенно-цифровые символы и приводим к нижнему регистру
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  // Сравниваем очищенную строку с её перевернутой версией
  return cleanedStr === cleanedStr.split('').reverse().join('');
}
