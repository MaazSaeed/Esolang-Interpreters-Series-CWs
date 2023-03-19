function myFirstInterpreter(code)
{
  let asciiCode = 0;
  let str = "";
  for(let c of code)
  {
    if(c == '.')
      str += String.fromCharCode(asciiCode % 256);
    if(c == '+')
      asciiCode++;
  }
  return str;
}
