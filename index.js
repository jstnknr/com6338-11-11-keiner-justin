const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = poem => {
  const titleTag = makeTag('h2');
  const lineTag = makeTag('p');

  const title = titleTag(poem.title);
  const lines = poem.lines.map(line => lineTag(line)).join('');

  return `${title}${lines}`;
}

getPoemBtn.onclick = async function() {
  try {
    const response = await getJSON(poemURL);
    const poem = response[0]; // Assuming the response is an array of poems, we take the first one.
    poemEl.innerHTML = makePoemHTML(poem);
  } catch (error) {
    console.error('Error fetching poem:', error);
    poemEl.innerHTML = 'Error fetching poem. Please try again later.';
  }
}