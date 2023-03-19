function interpreter(code, iterations, width, height) 
{
  let grid = [];
  for(let i = 0, sub = []; i < height; i++, grid.push(sub), sub = [])
    for(let j = 0; j < width; j++)
      sub.push(0);
  
  if(code == "" || !iterations)
    return grid = grid.map(g => g.join('')), grid.join('\r\n');
  
  let row =  0, col = 0;
  let codeLen = code.length;
  let flip = {0: 1, 1: 0};
  let itrs = 0;

  for(let c = 0; c < codeLen && itrs < iterations;)
  {
    let command = code[c];
    
    if(command == '[')
    {
      let under = row + 1 < 0 ? height - 1 : row + 1 >= height ? 0 : row + 1;
      if(grid[row][col])
      {
        let loopStack = [];
        loopStack.push(c + 1);
        c++;
        itrs++;
        while(loopStack.length && itrs < iterations && c < codeLen)
        {
          let cmd = code[c];
          let next = false;
          let skip;
          let skipl = false;
          switch(cmd)
          {
              case 'n': row--; itrs++; break;
              case 'e': col++; itrs++; break;
              case 's': row++; itrs++; break;
              case 'w': col--; itrs++; break;
              case '*': grid[row][col] = flip[grid[row][col]]; itrs++; break;
              case ']': skip = c; c = loopStack.pop(); next = true; itrs++; break;
              case '[' : if(grid[row][col]) loopStack.push(c), itrs++; else
              {
                skipl = true;
              }break;
          }
          col = col < 0 ? width - 1 : col >= width ? 0 : col;
          row = row < 0 ? height - 1 : row >= height ? 0 : row;  
          
          if(next && grid[row][col])
          {
              loopStack.push(c);
          }
          else if(next)
          {
            c = skip + 1;
            //itrs++;
          }
          else
            c++;
          
          if(skipl)
          {
            c--;
            let st = [];
            st.push(c)
            c++;
            while(st.length && itrs < iterations)
            {
              if(code[c] == '[')
                st.push(c)
              if(code[c] == ']')
                st.pop(), itrs++;
              c++;
            }
          }
        }
        
      }
      else
      {
        let st = [];
        st.push(c)
        c++;
        while(st.length && itrs < iterations)
        {
          if(code[c] == '[')
            st.push(c)
          if(code[c] == ']')
            st.pop(), itrs++;
          c++;
        }
      }
      
      
          col = col < 0 ? width - 1 : col >= width ? 0 : col;
          row = row < 0 ? height - 1 : row >= height ? 0 : row; 
    }
  
    else
    {
        switch(command)
        {  
          case 'n': row--; itrs++; break;
          case 'e': col++; itrs++; break;
          case 's': row++; itrs++; break;
          case 'w': col--; itrs++; break;
          case '*': grid[row][col] = flip[grid[row][col]]; itrs++; break;
        }
      col = col < 0 ? width - 1 : col >= width ? 0 : col;
      row = row < 0 ? height - 1 : row >= height ? 0 : row;   
      c++;
    }
  }
  
  return grid = grid.map(g => g.join('')), grid.join('\r\n');
}
