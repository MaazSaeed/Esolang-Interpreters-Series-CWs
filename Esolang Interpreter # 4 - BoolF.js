function boolfuck(code, input = "") 
{
  let flip = {'0' : '1', '1' : '0'};
  let tape = {};
  let ptr = 0;
  
  let istream = [];
  let ostream = [];
  
  for(let i = 0; i < input.length; i++)
  {
    let c = input[i].charCodeAt(0).toString(2);
    if(c.length < 8)
      c = "0".repeat(8 - c.length) + c;
    istream.unshift(c);
  }
  istream = istream.join('');
  let iptr = istream.length - 1;
  
  let loopStack = [];
  let byte = 0;
  for(let c = 0; c < code.length; c++)
  {
    let cmd = code[c];
    
    switch(cmd)
    {
        case '+': if(!tape[ptr]) tape[ptr] = '1'; else tape[ptr] = flip[tape[ptr]]; break;
        case ',': if(iptr < 0) tape[ptr] = '0'; else tape[ptr] = istream[iptr--]; break;
        case ';': if(!tape[ptr]) ostream.unshift("0"); else ostream.unshift(tape[ptr]); break;
        case '>': ptr++; break;
        case '<': ptr--; break;
        
       case '[': 
          
        if(tape[ptr] == "0" || !tape[ptr])
        {
          let unmatched = -1;
          c++;
          while(unmatched)
          {
            if(code[c] == '[')
              unmatched--;
            else if(code[c] == ']')
              unmatched++;
            c++;
          }
            c--;
          } 
          else
            loopStack.push(c + 1);
          break;
          
          case ']':
            if(tape[ptr] && tape[ptr] == "1")
            {
              c = loopStack.pop();
              loopStack.push(c);
              c--;
            }
            else
              loopStack.pop();
          break;
    }
  }
  
  if(ostream.length % 8)
  {
    while(ostream.length % 8)
    {
      ostream.unshift("0");
    }
  }
  
  let final = "";
  for(let k = 0; k < ostream.length / 8; k++)
  {
    let sub = ostream.slice(ostream.length - ((k + 1) * 8), ostream.length - (k * 8));
    final += toAscii(sub.join('')) ;
  }
  return final;
}

function toAscii(str)
{
  let p = 0;
  let txt = 0;
  for(let i = str.length - 1; i >= 0; i--, p++)
    txt += str[i] == "1" ? 2**p : 0;
  return String.fromCharCode(txt);
}
