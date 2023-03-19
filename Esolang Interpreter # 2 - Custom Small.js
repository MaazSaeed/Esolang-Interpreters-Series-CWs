function interpreter(code, tape)
{
  console.log(tape, code);
  let k = 0;
  tape = tape.split('');
  for(let c = 0; c < code.length; ++c)
  {
    if(out(0, tape.length, k)) break;
    if(code[c] == '*')
      tape[k] = tape[k] == '0' ? '1' : '0';
    if(code[c] == '>')
      k++;
    if(code[c] == '<')
      k--;    
    if(code[c] == '[' && !out(0, tape.length, k) && tape[k] == '1')
    {
      let s = [];
      s.push(c);
      c++;
      while((code[c] == '[' && tape[k] == '1') || (s.length && c < code.length && !out(0, tape.length, k)) )
      {
        //console.log(code[c]);
        if(code[c] == '[' && tape[k] == '1')
          s.push(c);
        else if(code[c] == '[' && !out(0, tape.length, k) && tape[k] == '0')
        {
          while(code[c] != ']')
          c++;
          
        }
        
        else if(c >= code.length)
          break;
        
        else if(code[c] == ']')
          c = s.pop(), s.push(c);
        else if(code[c] == '>' )
          k++;
        else if(code[c] == '<')
          k--;
        else if(code[c] == '*')
        {
          tape[k] = tape[k] == '0' ? '1' : '0';
        }
        c++;
      }
    }
    else if(code[c] == '[' && !out(0, tape.length, k) && tape[k] == '0')
    {
      let s = [];
      s.push(c);
      c++;
      while(s.length)
      {
        if(code[c] == '[')
          s.push(c);
        if(code[c] == ']')
          s.pop();
        c++;
      }
      --c;
    }
    else ;//console.log(tape.join(''));
  }
  return tape.join('');
}

function out(start, end, pos)
{
  return pos < start || pos >= end;
}
